import { createStore, applyMiddleware } from 'redux'

import websocket from 'websocket-stream';
import PouchDB from 'PouchDB';
import PouchSync from 'pouch-websocket-sync';
import PouchMiddleware from 'pouch-redux-middleware'

import reducers from './reducers'
export default function configureStore() {
  window.PouchDB = PouchDB;
  const db = new PouchDB('aft1');
  window.db = db
  const client = PouchSync.createClient();
  const sync = client.sync(db, {
    remoteName: 'todos-server', // name remote db is known for
    credentials: { token: 'some token'} // arbitrary
  });
  client.connect('ws://localhost:3001');

  const pouchMiddleware = PouchMiddleware({
    path: '/todos',
    db,
    actions: {
      remove: doc => store.dispatch({type: "DELETE_TODO", _id: doc._id}),
      insert: doc => store.dispatch({type: "INSERT_TODO", todo: doc}),
      update: doc => store.dispatch({type: "UPDATE_TODO", todo: doc}),
    }
  })

  const createStoreWithMiddleware = applyMiddleware(pouchMiddleware)(createStore)

  const store = createStoreWithMiddleware(reducers, {todos: []}, 
    window.devToolsExtension ? window.devToolsExtension() : undefined
  )
  return store
}
