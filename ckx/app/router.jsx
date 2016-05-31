import React from 'react';
import { connect } from 'react-redux'

// route components
import { BoxWrapper } from './components/Boxes.jsx'
import State from './components/State.jsx'
// import GroupsWrapper from './components/GroupList.jsx'
// import { Groups } from './components/GroupList.jsx'
import EncoreLogin from 'encore_login'
import { BoxList } from './components/BoxList.jsx'
import { horizon } from './index'
import horizonSync from 'horizon-redux-sync'

const navigated = () => {
  const newroute = window.location.hash.slice(2)
  //  dispatch: is not used anywhere just for debug
  window.store.dispatch({
    type: 'CHANGEROUTE_UI',
    route: newroute,
    dispatch: "hashchange"})
}

export const initialize = () => {
  window.addEventListener('hashchange', navigated, false)
  window.location.hash = '/'
  navigated()
}

export const changeRoute = (route) => {
  window.setTimeout( () => window.location.hash = '/' + route, 0)
}

const selectFn = (callback) => {
  console.log("User selected, info passed from callback function: ", callback)
  window.store.dispatch({
    type: 'SETNAME_UI',
    name: callback.name })
  window.store.dispatch({
    type: 'LOGGEDIN_UI'})

  horizonSync(horizon, store, '/boxes', callback.CO.collection, 'BOXES')
  store.dispatch({
    type: "SETGROUP_UI",
    group: callback.CO.collection,
    fields: JSON.parse(callback.CO.prompt).prompt
  })
  changeRoute('boxes')
}

// --------------------------------------
const Route = ({ route }) => {
  // force login if not yet logged in
  if (!window.store.getState().ui.loggedIn) {
    route = 'login'
  }
  switch (route) {
    case 'boxes':
      return <BoxWrapper />
    case 'boxlist':
      return <BoxList />
    case 'state':
      return <State />
    case 'example':
      return <Groups groups={[{title: 'aa'}, {title: 'bb'}]} />
    default:
      if (window.store.getState().ui.loggedIn) {
        return <BoxWrapper />
      } else {
        return <EncoreLogin onSelect={selectFn} />
      }
  }
}

export const CurrentRoute = connect(
  e => ({route: e.ui.route}))(Route)

