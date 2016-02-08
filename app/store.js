import { createStore, applyMiddleware } from 'redux'

import websocket from 'websocket-stream';
import PouchDB from 'PouchDB';
import PouchSync from 'pouch-websocket-sync';
import PouchMiddleware from 'pouch-redux-middleware'

import reducers from './reducers'
export default function configureStore(init) {
  window.PouchDB = PouchDB;
  const db = new PouchDB('A');
  window.db = db
  const client = PouchSync.createClient();
  const sync = client.sync(db, {
    remoteName: 'todos-server', // name remote db is known for
    credentials: { token: 'some token'} // arbitrary
  });
  client.connect('ws://localhost:3001');

  const pouchMiddleware = PouchMiddleware({
    path: '/boxes',
    db,
    actions: {
      remove: doc => store.dispatch({type: "DELETE_BOX", _id: doc._id}),
      insert: doc => store.dispatch({type: "INSERT_BOX", box: doc}),
      update: doc => store.dispatch({type: "UPDATE_BOX", box: doc}),
    }
  })

  const createStoreWithMiddleware = applyMiddleware(pouchMiddleware)(createStore)

  const store = createStoreWithMiddleware(reducers, init,
    window.devToolsExtension ? window.devToolsExtension() : undefined
  )
  return store
}
