import React from 'react';
import { connect } from 'react-redux'

// route components
import State from './components/State.jsx'
import EncoreLogin from 'encore_login'

import { horizon } from './index'
import horizonSync from 'horizon-redux-sync'

import StudentReadView from './components/Student/StudentReadView.jsx'
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
  console.log("User selected, info passed from callback function: ", callback)
  window.store.dispatch({
    type: 'SETNAME_UI',
    name: callback.name
  });
  window.store.dispatch({
    type: 'SETROLE_UI',
    role: callback.role
  });
  window.store.dispatch({
    type: 'LOGGEDIN_UI'
  });

  horizonSync(horizon, store, '/observations', callback.CO.collection, 'OBSERVATIONS')

  store.dispatch({
    type: 'SETBOARD_UI',
    group: callback.CO.name,
  });
  store.dispatch({
    type: 'SETOBSERVATIONFIELDS_UI',
    fields: JSON.parse(callback.CO.prompt).prompt
  });

  if (window.store.getState().ui.role === "board") {
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
      return <StudentReadView />
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

