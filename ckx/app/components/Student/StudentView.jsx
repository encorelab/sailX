import React from 'react';
import { connect } from 'react-redux';
import StudentReadView from './StudentReadView'
import StudentWriteView from './StudentWriteView'
import LockedView from './LockedView'
import _ from 'lodash'

const StudentViewEl = ({ ui, observations, studentState, dispatch }) => {
  // need to standardize where the functionality resides (eg submit cancel is here, but 'add obs' is one down)
  const cancelNewObservation = () => { dispatch({type: 'SWITCHVIEW_UI', view: 'read'}) };
  const submitNewObservation = (e) => {
    dispatch({type: 'ADD_OBSERVATION', doc: e});
    dispatch({type: 'SWITCHVIEW_UI', view: 'read'});
  };

  let boardEl;
  if (ui.tabletsLocked) {
    boardEl = <LockedView />
  } else {
    if (ui.activeView === 'write') {
      boardEl = <StudentWriteView
        ui = {ui}
        observations = {observations}
        studentState = {studentState}
        dispatch = {dispatch}
        onSubmit = {submitNewObservation}
        onCancel = {cancelNewObservation}
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
const StudentView = connect(e => ({ui: e.ui, observations: e.observations, studentState: e.studentState}))(StudentViewEl)
// thinking about moving the orderBy to here? Need to understand/unpack this connect thing more...
export default StudentView