import React from 'react';
import { connect } from 'react-redux';
import ObservationList from './ObservationList'
import AddObservation from './AddObservation'

const StudentReadViewEl = ({ ui, boxes, dispatch }) => {
  const addFn = () => { dispatch({type: 'OPENADD_UI'}) }
  const closeAddFn = () => { dispatch({type: 'CLOSEADD_UI'}) }
  const submitAdd = (e) => {
    closeAddFn()
    dispatch({type: 'ADD_BOX', doc: e})
  }

  return (
    <div>
      <ObservationList
        ui = {ui}
        boxes = {boxes}
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