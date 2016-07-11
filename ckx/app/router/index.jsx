import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// route components
import State from '../components/State'
import EncoreLogin from 'encore_login'
import * as uiActions from '../ui/actions'

import { horizon, store } from '../index'
import horizonSync from 'horizon-redux-sync'

import StudentView from '../components/Student/StudentView'
import StudentReadView from '../components/Student/StudentReadView'
import BoardView from '../components/Board/BoardView'

const selectFn = (callback, props) => {
  props.setName(callback.student.name)
  props.setClass(callback.student.class)
  props.setRole(callback.student.role)
  props.logIn()

  horizonSync(horizon, store, 'observations', callback.CO.collection, 'observations')
  horizonSync(horizon, store, 'classstate', 'class_state', 'classstate', {class: callback.student.class}, {keyValue: true})
  // //horizonSync(horizon, store, '/studentState', 'student_state', 'STUDENT_STATE', {group: callback.CO.collection, owner: callback.student.name})

  props.setBoard(callback.CO.name)
  props.setObservationFields(callback.CO.prompt)
  if (callback.student.role === "board") {
    props.changeRoute('board')
  } else {
    props.changeRoute('student')
  }
}

// --------------------------------------
const Route = (props) => {
  let { route, loggedIn, dispatch, role } = props 
  // force login if not yet logged in
  if (!loggedIn) {
    route = 'login';
  }
  switch (route) {
    case 'state':
      return <State />
    case 'student':
      return <StudentView />
    case 'board':
      return <BoardView />
    default:
      if (loggedIn) {
        if (role === "board") {
          return <BoardView />
        } else {
          return <StudentView />
        }
      } else {
        return <EncoreLogin onSelect={(e) => selectFn(e, props)} />
      }
  }
}

export default connect(
  e => ({route: e.ui.route, loggedIn: e.ui.loggedIn, role: e.ui.role}),
  uiActions, undefined, {pure: false}
)(Route)

