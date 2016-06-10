import React from 'react';
import { connect } from 'react-redux';
import NewObservationView from './NewObservationView'

export default ({ ui, observations, dispatch, submitNewObservation, cancelNewObservation }) => {
  return (
    <div>
      <NewObservationView
        dispatch = {dispatch}
        fields = {ui.fields}
        onSubmit = {submitNewObservation}
        onCancel = {cancelNewObservation}
      />
    </div>
  )
}


