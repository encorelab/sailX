import React from 'react';
import { connect } from 'react-redux'

// route components
import { BoxWrapper } from './components/Boxes'
import State from './components/State'
import Groups from './components/GroupList'

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
  navigated()
}

export const changeRoute = (route) => {
  window.setTimeout( () => window.location.hash = '/' + route, 0)
}

// --------------------------------------
const Route = ({ route }) => {
  switch (route) {
    case 'login': 
      return <Groups />
    case 'boxes':
      return <BoxWrapper />
    case 'state':
      return <State />
    default:
      return <Groups />
  }
}

export const CurrentRoute = connect(
  e => ({route: e.ui.route}))(Route)

