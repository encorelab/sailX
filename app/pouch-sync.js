import PouchDB from 'PouchDB';
import PouchSync from 'pouch-websocket-sync';
import PouchMiddleware from './lib/pouch-middleware'

const middleware = (dbName, action = 'ENTRY') => {
  const db = new PouchDB(db);
  return (
  PouchMiddleware({
    path: '/' + dbName,
    db,
    actions: {
      remove: doc => store.dispatch({type: "DELETE_" + action, _id: doc._id}),
      insert: doc => store.dispatch({type: "INSERT_" + action, doc: doc}),
      update: doc => store.dispatch({type: "UPDATE_" + action, doc: doc}),
    }
  }))
}


  // const client = PouchSync.createClient();
  // const sync = client.sync(db, { remoteName: 'todos-server' });
  // client.connect('ws://localhost:3001');
