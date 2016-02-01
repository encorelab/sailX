import React, {Component} from 'react';
import websocket from 'websocket-stream';
import PouchDB from 'PouchDB';
import PouchSync from 'pouch-websocket-sync';

var db = new PouchDB('todos');
var client = PouchSync.createClient();
var sync = client.sync(db, {
  remoteName: 'todos-server', // name remote db is known for
  credentials: { token: 'some token'} // arbitrary
});

client.connect('ws://localhost:3001');
export default class App extends Component {
  render() {
    return (
      // Add your component markup and other subcomponent references here.
      <h1>Hello, Peter!</h1>
    );
  }
}

