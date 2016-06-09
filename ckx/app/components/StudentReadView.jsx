import React from 'react';
import { connect } from 'react-redux';
import ObservationList from './ObservationList'
import AddObservation from './AddObservation'
import _ from 'lodash'
const lockedImg = require('../img/lock-icon.png')

const StudentReadViewEl = ({ ui, observations, dispatch }) => {
  const openAddFn = () => { dispatch({type: 'OPENADD_UI'}) }
  const closeAddFn = () => { dispatch({type: 'CLOSEADD_UI'}) }
  const submitAdd = (e) => {
    closeAddFn()
    dispatch({type: 'ADD_OBSERVATION', doc: e})
  }
  const openEditFn = () => { console.log("TODO"); }

  let boardEl;
  if (ui.tabletsLocked) {
    boardEl = <div
      style = {
        {
          height: '100%',
          background: 'black',
          paddingLeft: '50%',
          paddingTop: '27%'
        }
      }>
      <img src={lockedImg} /> 
    </div>
  } else {
    boardEl = <div>
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
        isOpen = {ui.addOpen}         // wait, how is this right? - figure out the naming here
        openFn = {openAddFn}
        closeFn = {closeAddFn}
        submitFn = {submitAdd}
      />
    </div>
  }

  return (
    <div>
      {boardEl}
    </div>
  )
}

// connect is a curried component that maps the state from redux (first call) to a presentational component (second call, in this case List)
const StudentReadView = connect(e => ({ui: e.ui, observations: e.observations}))(StudentReadViewEl)
// thinking about moving the orderBy to here? Need to understand/unpack this connect thing more...
export default StudentReadView
