import React from 'react';
import { connect } from 'react-redux';
import ObservationList from './ObservationList'
import AddObservation from './AddObservation'
import _ from 'lodash'

export default ({ ui, observations, dispatch }) => {
  const openAddFn = () => { dispatch({type: 'SWITCHVIEW_UI', view: 'write'}) }


  const closeAddFn = () => { dispatch({type: 'CLOSEADD_UI'}) }
  const submitAdd = (e) => {
    closeAddFn()
    dispatch({type: 'ADD_OBSERVATION', doc: e})
  }
  const openEditFn = () => { console.log("TODO"); }

  return (
    <div>
      <h1>{ui.board}</h1>
      <h1>{ui.user}</h1>
      <ObservationList
        key = {'something'}
        ui = {ui}
        observations = {_.orderBy(observations, ['created_at'], ['desc'])}
        dispatch = {dispatch}
        openEditFn = {openEditFn}
      />
      <AddObservation
        dispatch = {dispatch}
        ui = {ui}
        isOpen = {ui.addOpen}
        openFn = {openAddFn}
        closeFn = {closeAddFn}
        submitFn = {submitAdd}
      />
    </div>
  )
}

