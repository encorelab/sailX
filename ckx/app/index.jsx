import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import configStore from './store'
import CurrentRoute  from './router'
import horizonSync from 'horizon-redux-sync'

const observationlist = []
// horizon server, on same domain as HTML/JS, different port. 'insecure' should be changed before production.
export const horizon = Horizon({ host: window.location.hostname + ':8181', insecure: true, authType: 'unauthenticated' })

// hack until this works without problems in horizon
localStorage.removeItem('horizon-jwt');

export const store = configStore()

window.store = store

store.dispatch({
  type: 'CHANGEROUTE/UI',
  route: 'login',
  dispatch: 'initial'
})

render(
  <Provider store = {store} >
    <CurrentRoute />
  </Provider>,
  document.getElementById('root')
)
