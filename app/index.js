import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

import configStore from './store';
import { CurrentRoute, initialize, changeRoute } from './router'
import horizonSync from 'horizon-redux-sync'

const boxlist = []
const groups = []
// horizon server, on same domain as HTML/JS, different port. insecure should be changed before production.
let horizon_port
if(process.env.NODE_ENV == 'production') { horizon_port = '80' } else { horizon_port = '8181' }
export const horizon = Horizon({host: window.location.hostname + ':' + horizon_port, insecure: true})

const store = configStore({ boxes: boxlist, groups: groups, ui: {infoOpen: false, addOpen: false, route: 'login' }})
window.store = store
horizonSync(horizon, store, '/groups', 'groups', 'GROUP')
window.changeRoute = changeRoute
window.store.dispatch({
  type: 'CHANGEROUTE_UI', 
  route: 'login',
  dispatch: "initial"})


initialize()
render(
  <Provider store={store}>
  <CurrentRoute />
  </Provider>,
  document.getElementById('root')
)
