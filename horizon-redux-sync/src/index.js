import equal from 'deep-equal'
import { omit, sortBy, difference, intersection } from 'lodash'
import stringify from 'fast-stable-stringify'

// begins listening to specific db, returns path object.
// path object should be passed to all functions
// store: redux store object
// pathStr: key, like "users" to sync
// dbname: pouchDb name to sync with (local and external)
// filter: object to use when filtering subscriptions, for example {studentid: 1}
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
  var docs = proc_redux_state(path)
  if (equal(idsort(path.docs), docs) || docs.length == 0) { // nothing to do
    return 
  }

  const diffs = differences(path.docs, docs);
  if(!(diffs.updated.length == 0 && diffs.new.length == 0 && diffs.deletedIds.length == 0)) {

    const updated = diffs.new.concat(diffs.updated)
    console.log('diffs', updated, diffs.deletedIds)
    const filter = path.filter
    if (updated.length > 0) {
      const updatedFilter = filter ? 
        updated.map(e => ({...e, ...filter})) : // add metadata for filtered collection
        updated
      path.db.upsert(updatedFilter)
    }

    diffs.deletedIds.forEach(id => path.db.remove({id: id}))
    path.docs = docs
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
  console.log('redux, redux_orig, horizon, diff', redux_docs, path.store.getState(), horizon_docs, diffs)
  if(!(diffs.updated.length == 0 && diffs.new.length == 0 && diffs.deletedIds.length == 0)) {

    const updated = diffs.new.concat(diffs.updated)

    updated.forEach(doc => {
      path.docs = path.docs.filter(e => e.id != doc.id)
      path.docs = [...path.docs, doc]
      propagateInsert(path, doc)
    })

    diffs.deletedIds.forEach(doc => {
      path.docs = path.docs.filter(e => e.id != doc.id)
      propagateDelete(path, doc);
    })
  }
}

function propagateDelete(path, id) {
  const toDel = path.keyValue ? 
    {key: JSON.parse(id).key} :
    {id: id}
  const delAction = {type: "DBDELETE/" + path.actionPrefix}
  console.log('dbdel', toDel, path)
  path.store.dispatch({...delAction, ...toDel})
}

function propagateInsert(path, doc) {
  console.log('propagate', doc)
  let obj
  if (path.keyValue) {
    obj = {}
    obj[doc.key] = doc.value
  } else {
    obj = doc
  }
  console.log('dbinsert', obj, path)
  const type = "DBINSERT/" + path.actionPrefix
  const action = {type: type, doc: obj}
  console.log('dbinsert action', action)
  window.setTimeout((e) => path.store.dispatch(action))
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

