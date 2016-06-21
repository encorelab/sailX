import React from 'react';
import { connect } from 'react-redux';
import StudentReadView from './StudentReadView'
import StudentWriteView from './StudentWriteView'
import LockedView from './LockedView'
import { currentDate, getKey } from '../../lib/utils'

const StudentViewEl = ({ ui, classState, observations, drafts, dispatch }) => {
  const cancelObservation = (obs, draftId) => {
    if (draftId) {
      dispatch({type: 'DELETE_DRAFT', id: draftId});
    }
    dispatch({type: 'UNSETEDIT_UI'});
    dispatch({type: 'SWITCHVIEW_UI', view: 'read'});
  };
  const submitObservation = (obs, id, owner, draftId) => {
    if (id) {
      // we are editing an existing observation
      const obsWithId = {...obs, id: id}
      dispatch({type: 'EDIT_OBSERVATION', doc: obsWithId});
      dispatch({type: 'UNSETEDIT_UI'});
    } else {
      const obsWithOwner = {...obs, owner: owner}
      dispatch({type: 'ADD_OBSERVATION', doc: obsWithOwner});
    }
    if (draftId) {
      dispatch({type: 'DELETE_DRAFT', id: draftId});
    }
    dispatch({type: 'SWITCHVIEW_UI', view: 'read'});
  };
  const updateDraft = (obs, id) => {
    const obsWithId = {...obs, id: id}
    dispatch({type: 'EDIT_DRAFT', doc: obsWithId});
  };

  let boardEl;
  if (getKey('tablets_locked', classState)) {
    boardEl = <LockedView />
  } else {
    if (ui.activeView === 'write') {
      boardEl = <StudentWriteView
        ui = {ui}
        observations = {observations}
        drafts = {drafts}
        dispatch = {dispatch}
        onSubmit = {submitObservation}
        onCancel = {cancelObservation}
        updateDraft = {updateDraft}
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
const StudentView = connect(e => ({ui: e.ui, classState: e.classState, observations: e.observations, drafts: e.drafts}))(StudentViewEl)
// thinking about moving the orderBy to here? Need to understand/unpack this connect thing more...
export default StudentView
