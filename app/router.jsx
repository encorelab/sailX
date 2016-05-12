import React from 'react';
import { connect } from 'react-redux'

// route components
import { BoxWrapper } from './components/Boxes.jsx'
import State from './components/State.jsx'
import GroupsWrapper from './components/GroupList.jsx'
import { Groups } from './components/GroupList.jsx'

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

// --------------------------------------
const Route = ({ route }) => {
  switch (route) {
    case 'login':
      return <GroupsWrapper />
    case 'boxes':
      return <BoxWrapper />
    case 'state':
      return <State />
    case 'example':
      return <Groups groups={[{title: 'aa'}, {title: 'bb'}]} />
    default:
      return <GroupsWrapper />
  }
}

export const CurrentRoute = connect(
  e => ({route: e.ui.route}))(Route)

