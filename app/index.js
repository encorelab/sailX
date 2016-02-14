import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import configStore from './store';
import PouchSync from './lib/pouch-middleware'
import { connect } from 'react-redux'
import { CurrentRoute, initialize, changeRoute } from './router'

const boxlist = []
const groups = []

const store = configStore({ boxes: boxlist, groups: groups, ui: {infoOpen: false, addOpen: false, route: 'login' }})
window.store = store
window.pouchsync = PouchSync
PouchSync(store, "/groups", "groups", "GROUP")
window.changeRoute = changeRoute

initialize()
render(
  <Provider store={store}>
  <CurrentRoute />
  </Provider>,
  document.getElementById('root')
)
