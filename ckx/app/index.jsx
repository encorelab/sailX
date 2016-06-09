import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import configStore from './store'
import { CurrentRoute, initialize, changeRoute } from './router.jsx'
import horizonSync from 'horizon-redux-sync'

const observationlist = []
// horizon server, on same domain as HTML/JS, different port. 'insecure' should be changed before production.
export const horizon = Horizon({ host: window.location.hostname + ':8181', insecure: true, authType: 'unauthenticated' })

// hack until this works without problems in horizon
localStorage.removeItem('horizon-jwt');

const store = configStore({
  observations: observationlist,
  ui: {
    tabletsLocked: false,
    infoOpen: false,
    addOpen: false,
    route: 'login'
  }
})

window.store = store
window.changeRoute = changeRoute

window.store.dispatch({
  type: 'CHANGEROUTE_UI',
  route: 'login',
  dispatch: 'initial'
})

initialize()

render(
  <Provider store = {store} >
    <CurrentRoute />
  </Provider>,
  document.getElementById('root')
)