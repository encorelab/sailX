import React from 'react';
import { connect } from 'react-redux'

// route components
import State from './components/State.jsx'
import EncoreLogin from 'encore_login'

import { horizon } from './index'
import horizonSync from 'horizon-redux-sync'

import StudentView from './components/Student/StudentView.jsx'
import BoardView from './components/Board/BoardView.jsx'

const navigated = () => {
  const newroute = window.location.hash.slice(2);
  //  dispatch: is not used anywhere just for debug
  window.store.dispatch({
    type: 'CHANGEROUTE_UI',
    route: newroute,
    dispatch: 'hashchange'
  });
}

export const initialize = () => {
  window.addEventListener('hashchange', navigated, false);
  window.location.hash = '/';
  navigated();
}

export const changeRoute = (route) => {
  window.setTimeout( () => window.location.hash = '/' + route, 0);
}

const selectFn = (callback) => {
  window.store.dispatch({
    type: 'SETNAME_UI',
    name: callback.student.name
  });
  window.store.dispatch({
    type: 'SETCLASS_UI',
    class: callback.student.class
  });
  window.store.dispatch({
    type: 'SETROLE_UI',
    role: callback.student.role
  });
  window.store.dispatch({
    type: 'LOGGEDIN_UI'
  });

  horizonSync(horizon, store, '/observations', callback.CO.collection, 'OBSERVATIONS')
  horizonSync(horizon, store, '/class_state', 'class_state', 'CLASS_STATE', {class: callback.student.class}, {readOnly: true})
  horizonSync(horizon, store, '/student_state', 'student_state', 'DRAFTS', {group: callback.CO.collection, owner: callback.student.name}, {readOnly: true})

  store.dispatch({
    type: 'SETBOARD_UI',
    group: callback.CO.name,
  });
  store.dispatch({
    type: 'SETOBSERVATIONFIELDS_UI',
    fields: JSON.parse(callback.CO.prompt).prompt
  });

  if (callback.student.role === "board") {
    changeRoute('board');
  } else {
    changeRoute('student');
  }
}

// --------------------------------------
const Route = ({ route }) => {
  // force login if not yet logged in
  if (!window.store.getState().ui.loggedIn) {
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
      if (window.store.getState().ui.loggedIn) {
        if (window.store.getState().ui.role === "board") {
          return <BoardView />
        } else {
          return <StudentReadView />
        }
      } else {
        return <EncoreLogin onSelect={selectFn} />
      }
  }
}

export const CurrentRoute = connect(e => ({route: e.ui.route}))(Route);

