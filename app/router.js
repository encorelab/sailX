import React from 'react';
import { connect } from 'react-redux'

// route components
import { BoxWrapper } from './components/Boxes'
import State from './components/State'
import GroupsWrapper from './components/GroupList'
import { Groups } from './components/GroupList'
import EncoreLogin from 'encore_login'

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

const selectFn = (user) => {
  window.store.dispatch({
    type: 'SETNAME_UI',
    name: user })
  window.store.dispatch({
    type: 'LOGGEDIN_UI'})

  window.store.dispatch({
    type: 'CHANGEROUTE_UI', 
    route: 'boxes',
    dispatch: "after_login"})
}


// --------------------------------------
const Route = ({ route }) => {
  switch (route) {
    case 'boxes':
      return <BoxWrapper />
    case 'state':
      return <State />
    case 'example':
      return <Groups groups={[{title: 'aa'}, {title: 'bb'}]} />
    case 'login':
      return <EncoreLogin onSelect={selectFn} />
    default:
      return <GroupsWrapper />
  }
}

export const CurrentRoute = connect(
  e => ({route: e.ui.route}))(Route)

