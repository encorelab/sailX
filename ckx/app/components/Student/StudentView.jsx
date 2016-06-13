import React from 'react';
import { connect } from 'react-redux';
import StudentReadView from './StudentReadView'
import StudentWriteView from './StudentWriteView'
import LockedView from './LockedView'
import { currentDate } from '../../lib/utils'


const StudentViewEl = ({ ui, observations, studentState, dispatch }) => {
  // need to standardize where the functionality resides (eg submit cancel is here, but 'add obs' is one down)
  const cancelNewObservation = () => {
    dispatch({type: 'UNSETEDIT_UI'});
    dispatch({type: 'SWITCHVIEW_UI', view: 'read'});
  };
  const submitNewObservation = (e) => {
    debugger
    dispatch({type: 'ADD_OBSERVATION', doc: e});
    dispatch({type: 'UNSETEDIT_UI'});
    dispatch({type: 'SWITCHVIEW_UI', view: 'read'});
  };
  const submitEditObservation = (e) => {
    let editedObs = window.store.getState().ui.observationToEdit
    editedObs.title = e.title
    editedObs.content = e.content
    editedObs.modified_at = currentDate()
    debugger
    dispatch({type: 'EDIT_OBSERVATION', doc: editedObs});
    dispatch({type: 'UNSETEDIT_UI'});
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
        onSubmitEdit = {submitEditObservation}
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