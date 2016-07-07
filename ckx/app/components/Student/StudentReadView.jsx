import React from 'react';
import { connect } from 'react-redux';
import StudentObservationList from './StudentObservationList'
import StudentAddObservation from './StudentAddObservation'

export default ({ ui, observations, studentState, dispatch }) => {
  return (
    <div>
      <h1>{ui.board}</h1>
      <h1>{ui.user}</h1>
      <StudentObservationList
        ui = {ui}
        //observations = {_.orderBy(observations, ['created_at'], ['desc'])}
        observations = {observations}
        studentState = {studentState}
        dispatch = {dispatch}
      />
      <StudentAddObservation
        onClick = {() => dispatch({type: 'SWITCHVIEW_UI', view: 'write'})}
      />
    </div>
  )
}