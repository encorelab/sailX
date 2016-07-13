import equal from 'deep-equal'
import { omit, sortBy, difference, intersection } from 'lodash'
import stringify from 'fast-stable-stringify'

// re-exporting
export { hrsReducer, hrsReducerHOF } from './reducer'

// begins listening to specific db, returns path object.
// path object should be passed to all functions
//
// arguments:
// horizon: horizon object
// store: redux store object
// pathStr: store selector, like "users" to sync
// dbname: horizon collection to sync with
// filter: object to use when filtering subscriptions, for example {studentid: 1}, optional, also merged with all new
//    objects, set as undefined if you need to add option without filter
// options: object,
//    {readOnly: true} means that it only subscribes to Horizon, and not to Redux
//    {keyValue: true} connects to an object (dict) instead of an array. For example, state.name instead of state[0]
export default (horizon, store, pathStr, dbname, filter, options = {}) => {
  const pathObj = {
    path: pathStr,
    dbname: dbname,
    actionPrefix: pathStr,
    docs: [],
    db: horizon(dbname),
    store: store,
    filter: filter,
    keyValue: options.keyValue,
    readOnly: options.readOnly
  }

  // setup subscriptions
  if (!options.readOnly) { listenRedux(pathObj) }
  listenHorizon(pathObj) 
  return pathObj
}

// ---------------------------

// begins listening to Redux
const listenRedux = (path) => {
  store.subscribe(() => reduxChange(path))
}

// begins listening to a specific database, returns object with cancel function
const listenHorizon = (path) => {
  const watchFn = path.filter ? path.db.findAll(path.filter) : path.db
  watchFn.watch().subscribe( (e) => { dbChange(path, e) } )
}

// ----------------------------
// utilities

// take a full state, extract subtree and sort
const proc_redux_state = (path) => {
  const subtree = path.store.getState()[path.path]
  const processed = path.keyValue ? 
    proc_redux_state_kv(subtree, path.filter) :
    subtree
  return idsort(processed)
}

// take a full state, extract subtree, transform into array
const proc_redux_state_kv = (subtree, filter) => {
  return Object.keys(subtree).map(k => proc_kv(filter, k, subtree[k]))
}

// turn single key-value into object for array
const proc_kv = (filter, k, v) => {
  const id = stringify({ key: k, ...filter})
  return {id: id, key: k, value: v, ...filter}
}

// take horizon store object, remove version keys and sort
const proc_horizon_docs = (docs) => {
  const sorted = docs.map(e => omit(e, '$hz_v$'))
  return idsort(sorted)
}

// sort array of objects by id key
const idsort = (ary) => sortBy(ary, 'id')


// ---------------------------

// processes updates from Redux store (array)
function reduxChange(path) {
  const docs = proc_redux_state(path)
  if (equal(idsort(path.docs), docs)) { // nothing to do
    return 
  }

  const diffs = differences(path.docs, docs);
  if(!(diffs.updated.length == 0 && diffs.new.length == 0 && diffs.deletedIds.length == 0)) {

    const updated = diffs.new.concat(diffs.updated)
    const filter = path.filter
    if (updated.length > 0) {
      const updatedFilter = filter ? 
        updated.map(e => ({...e, ...filter})) : // add metadata for filtered collection
        updated
      path.db.upsert(updatedFilter)
    }

    path.db.removeAll(diffs.deletedIds)
  }
}

// processes updates from Horizon 
function dbChange(path, rawdocs) {
  const horizon_docs = proc_horizon_docs(rawdocs)
  const redux_docs = proc_redux_state(path)

  if (equal(redux_docs, horizon_docs)) {  // nothing to do
    return
  }

  var diffs = differences(redux_docs, horizon_docs)
  if(!(diffs.updated.length == 0 && diffs.new.length == 0 && diffs.deletedIds.length == 0)) {
    const diffType = path.keyValue ? 'dbDiffKV' : 'dbDiff'
    path.store.dispatch({
      type: diffType + '/' + path.actionPrefix,
      diffs: diffs
    })
    path.docs = horizon_docs
  }
}

function differences(oldDocs, newDocs) {
  const oldDocsidx = oldDocs.reduce((acc, doc) => ({ ...acc, [doc.id]: doc }), {});
  const newDocsidx = newDocs.reduce((acc, doc) => ({ ...acc, [doc.id]: doc }), {});
  const deletedIds = difference(Object.keys(oldDocsidx), Object.keys(newDocsidx))

  const newIds = difference(Object.keys(newDocsidx), Object.keys(oldDocsidx)) 
  const newD = newIds.map(e => newDocsidx[e])

  const existingIds = intersection(Object.keys(newDocsidx), Object.keys(oldDocsidx))
  const common = existingIds.map(e => newDocsidx[e])
  const updated = common.filter(e => !equal(e, oldDocsidx[e.id]))

  const result = {
    new: newD,
    updated: updated,
    deletedIds: deletedIds
  }

  return result;
}

