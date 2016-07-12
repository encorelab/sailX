import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// route components
import State from 'app/components/State'
import EncoreLogin from 'encore_login'
import * as uiActions from 'app/ui/actions'

import { horizon, store } from 'app/index'
import horizonSync from 'horizon-redux-sync'

import StudentView from 'app/components/Student/Router'
import BoardView from 'app/components/Board/BoardView'

const selectFn = (callback, props) => {
  props.setName(callback.student.name)
  props.setClass(callback.student.class)
  props.setRole(callback.student.role)
  props.setLoggedIn()

  const h = (...vars) => horizonSync(horizon, store, ...vars)
  h('observations', callback.CO.collection)
  h('classstate', 'class_state', {class: callback.student.class}, {keyValue: true})
  h('studentstate', 'student_state', 
    {group: callback.CO.collection, owner: callback.student.name}, {keyValue: true}) 

  props.setBoard(callback.CO.name)
  props.setObservationFields(JSON.parse(callback.CO.prompt).prompt)

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

export default connect(e => (
  {
    route: e.ui.route, 
    loggedIn: e.ui.loggedIn, 
    role: e.ui.role,
  }),
  uiActions
  )(Route)
