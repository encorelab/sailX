import React from 'react';
import { connect } from 'react-redux';
import StudentReadView from './StudentReadView'
import StudentWriteView from './StudentWriteView'
import LockedView from './LockedView'
import _ from 'lodash'

const StudentViewEl = ({ ui, observations, dispatch }) => {
  let boardEl;
  if (ui.tabletsLocked) {
    boardEl = <LockedView />
  } else {
    if (ui.activeView === 'write') {
      boardEl = <StudentWriteView
        ui = {ui}
        observations = {observations}
        dispatch = {dispatch}
      />
    } else {
      boardEl = <StudentReadView
        ui = {ui}
        observations = {observations}
        dispatch = {dispatch}
      />
    }
  }

  return (
    <div>
      {boardEl}
    </div>
  )
}


// connect is a curried component that maps the state from redux (first call) to a presentational component (second call, in this case List)
const StudentView = connect(e => ({ui: e.ui, observations: e.observations}))(StudentViewEl)
// thinking about moving the orderBy to here? Need to understand/unpack this connect thing more...
export default StudentView