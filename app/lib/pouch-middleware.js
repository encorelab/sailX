import jPath from 'json-path'
import Queue from 'async-function-queue'
import equal from 'deep-equal'
import PouchDB from 'pouchdb'
import websocket from 'websocket-stream';		
import PouchSync from 'pouch-websocket-sync';		
  
// const PouchClient = PouchSync.createClient();		
// PouchClient.connect('ws://localhost:3001');		
// async queue, shared among path objects

// begins listening to specific db, returns path object.
// path object should be passed to all functions
// store: redux store object
// pathStr: string, like "/users" to sync (JPath)
// dbname: pouchDb name to sync with (local and external)
// actionPrefix: will emit redux actions INSERT_ENTRY, UPDATE_ENTRY, DELETE_ENTRY and INITIALIZE_ENTRY
export default (store, pathStr, dbname, actionPrefix = 'ENTRY') => {
  const pathObj = {
    path: pathStr,
    dbname: dbname,
    queue: Queue(1),
    actionPrefix: actionPrefix,
    docs: {},
    db: PouchDB(dbname),
    store: store
  }

  // listen to pouchdb, and Redux store, and store references to how to cancel
  const cancel = [
    listenPouch(pathObj), 
    store.subscribe(e => processNewState(pathObj, store.getState()))
  ]
  console.log(cancel)

  pathObj.cancelSync = () => {
    cancel.forEach(e => e())
    console.log("Subscription to " + path + " cancelled")
  }

  console.log("Subscription to " + pathStr + " started")
  // initialState(pathObj) -- currently broken, duplicates
  return pathObj
}

// begins listening to a specific database, returns object with cancel function
const listenPouch = (path) => {
  console.log(path)
  const changes = path.db.changes({live: true, include_docs: true})
  const listening = changes.on('change', change => onDbChange(path, change))
  // const remotedb = new PouchDB('http://localhost:5984/' + path.dbname)
  // path.db.sync(remotedb, {
  // live: true,
  // retry: true
  // })
  return listening.cancel
}

// const initialState = (path) => {
//   path.db.allDocs({include_docs: true}).then( e => {
//     path.store.dispatch({type: 'INITSTATE_' + path.actionPrefix, docs: e.rows.map(f => f.doc)}))
// }

function processNewState(path, state) {
  console.log("New state!", state)
    var docs = jPath.resolve(state, path.path);

    if (docs && docs.length) {
      docs.forEach(function(docs) {
        var diffs = differences(path.docs, docs);
        diffs.new.concat(diffs.updated).forEach(doc => scheduleInsert(path, doc))
        diffs.deleted.forEach(doc => scheduleRemove(path, doc));
      });
    }
  }

  function scheduleInsert(path, doc) {
    console.log('Schedule insert', path, doc)
    path.docs[doc._id] = doc;
    path.queue.push(function(cb) {
      console.log("put que", doc)
      path.db.put(doc, cb);
    });
  }

  function scheduleRemove(path, doc) {
    delete path.docs[doc._id];
    var db = path.db;
    path.queue.push(function(cb) {
      path.db.remove(doc, cb);
    });
  }

  function propagateDelete(path, doc) {
    console.log("removing", doc)
    path.store.dispatch({type: "DBDELETE_" + path.actionPrefix, _id: doc._id})
  }

  function propagateInsert(path, doc) {
    console.log("inserting", doc)
    path.store.dispatch({type: "DBINSERT_" + path.actionPrefix, doc: doc})
  }

  function propagateUpdate(path, doc) {
    console.log("updating", doc)
    path.store.dispatch({type: "DBUPDATE_" + path.actionPrefix, doc: doc})
  }

function differences(oldDocs, newDocs) {
  var result = {
    new: [],
    updated: [],
    deleted: Object.keys(oldDocs).map(oldDocId => oldDocs[oldDocId]),
  };

  newDocs.forEach(function(newDoc) {
    var id = newDoc._id;

    if (! id) {
      warn('doc with no id');
    }
    result.deleted = result.deleted.filter(doc => doc._id !== id);
    var oldDoc = oldDocs[id];
    if (! oldDoc) {
      result.new.push(newDoc);
    } else if (!equal(oldDoc, newDoc)) {
      result.updated.push(newDoc);
    }
  });

  return result;
}

function onDbChange(path, change) {
  var changeDoc = change.doc;
  if (changeDoc._deleted) {
    if (path.docs[changeDoc._id]) {
      delete path.docs[changeDoc._id];
      propagateDelete(path, changeDoc);
    }
  } else {
    var oldDoc = path.docs[changeDoc._id];
    path.docs[changeDoc._id] = changeDoc;
    if (oldDoc) {
      propagateUpdate(path, changeDoc);
    } else {
      propagateInsert(path, changeDoc);
    }
  }
}

