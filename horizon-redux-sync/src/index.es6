import jPath from 'json-path'
import equal from 'deep-equal'
import { omit, sortBy, difference, intersection } from 'lodash'

// begins listening to specific db, returns path object.
// path object should be passed to all functions
// store: redux store object
// pathStr: string, like "/users" to sync (JPath)
// dbname: pouchDb name to sync with (local and external)
// actionPrefix: will emit redux actions INSERT_ENTRY, UPDATE_ENTRY, DELETE_ENTRY and INITIALIZE_ENTRY
// filter: object to use when filtering subscriptions, for example {studentid: 1}
export default (horizon, store, pathStr, dbname, actionPrefix = 'ENTRY', filter) => {
  const pathObj = {
    path: pathStr,
    dbname: dbname,
    actionPrefix: actionPrefix,
    docs: [],
    db: horizon(dbname),
    store: store,
    filter: filter
  }

  listenHorizon(pathObj)
  store.subscribe(e => reduxChange(pathObj, store.getState()))
  return pathObj
}

// ---------------------------

// begins listening to a specific database, returns object with cancel function
const listenHorizon = (path) => {
  const watchFn = path.filter ? path.db.findAll(path.filter) : path.db
  watchFn.watch().subscribe( (e) => { dbChange(path, e) } )
}

// take a full state, extract subtree and sort
const proc_redux_state = (path, state) => {
  const x0 = jPath.resolve(state, path.path)[0]
  return idsort(x0)
}

// take horizon store object, remove version keys and sort
const proc_horizon_docs = (docs) => {
  const sorted = docs.map(e => omit(e, '$hz_v$'))
  return idsort(sorted)
}

// sort array of objects by id key
const idsort = (ary) => sortBy(ary, 'id')


// ---------------------------

// processes updates from Redux store
function reduxChange(path, state) {
  var docs = proc_redux_state(path, state)
  if (equal(idsort(path.docs), docs) || state.length == 0) { // nothing to do
    return 
  }

  const diffs = differences(path.docs, docs);
  if(!(diffs.updated.length == 0 && diffs.new.length == 0 && diffs.deletedIds.length == 0)) {

    const updated = diffs.new.concat(diffs.updated)
    if (updated.length > 0) {
      path.db.upsert(updated)
    }

    diffs.deletedIds.forEach(id => path.db.remove({id: id}))
  }
}

// processes updates from Horizon
function dbChange(path, rawdocs) {
  const horizon_docs = proc_horizon_docs(rawdocs)
  const redux_docs = proc_redux_state(path, path.store.getState())

  if (equal(redux_docs, horizon_docs)) {  // nothing to do
    return
  }

  var diffs = differences(redux_docs, horizon_docs)
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
  path.store.dispatch({type: "DBDELETE_" + path.actionPrefix, id: id})
}

function propagateInsert(path, doc) {
  path.store.dispatch({type: "DBINSERT_" + path.actionPrefix, doc: doc})
}

function propagateUpdate(path, doc) {
  path.store.dispatch({type: "DBUPDATE_" + path.actionPrefix, doc: doc})
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

