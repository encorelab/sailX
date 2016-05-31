import React from 'react';
import { connect } from 'react-redux';
import ObservationList from './ObservationList'
import AddObservation from './AddObservation'
import _ from 'lodash'

const StudentReadViewEl = ({ ui, boxes, dispatch }) => {
  const addFn = () => { dispatch({type: 'OPENADD_UI'}) }
  const closeAddFn = () => { dispatch({type: 'CLOSEADD_UI'}) }
  const submitAdd = (e) => {
    closeAddFn()
    dispatch({type: 'ADD_BOX', doc: e})
  }

  // ordering by id for now, but we'll need to add a 'created_at'
  return (
    <div>
      <ObservationList
        ui = {ui}
        boxes = {_.orderBy(boxes, ['id'], ['asc'])}
        dispatch = {dispatch}
      />
      <AddObservation
        isOpen = {ui.addOpen}
        openFn = {addFn}
        closeFn = {closeAddFn}
        submitFn = {submitAdd}
        fields = {ui.fields}
      />
    </div>
  )
}

// connect is a curried component that maps the state from redux (first call) to a presentational component (second call, in this case List)
export const StudentReadView = connect(e => ({ui: e.ui, boxes: e.boxes}))(StudentReadViewEl)