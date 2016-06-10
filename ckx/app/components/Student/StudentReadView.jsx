import React from 'react';
import { connect } from 'react-redux';
import ObservationList from './ObservationList'
import AddObservation from './AddObservation'
import _ from 'lodash'

export default ({ ui, observations, dispatch }) => {
  const openEditFn = () => {
    dispatch({type: 'SWITCHVIEW_UI', view: 'write'});
  }

  return (
    <div>
      <h1>{ui.board}</h1>
      <h1>{ui.user}</h1>
      <ObservationList
        ui = {ui}
        observations = {_.orderBy(observations, ['created_at'], ['desc'])}
        dispatch = {dispatch}
        openEditFn = {openEditFn}
      />
      <AddObservation
        onClick = {() => dispatch({type: 'SWITCHVIEW_UI', view: 'write'})}
      />
    </div>
  )
}