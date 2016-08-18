import React from 'react'
import { connect } from 'react-redux'
import ObservationCluster from './ObservationCluster'
import LockTablets from './LockTablets'
import ObservationDetails from './ObservationDetails'

const BoardViewEl = ({ ui, observations, dispatch }) => {
  return (
    <div>
      <h1>{ui.board}</h1>
      <ObservationCluster
        ui = {ui}
        observations = {observations}
        dispatch = {dispatch}
      />
      <ObservationDetails />
      <LockTablets
        ui = {ui}
        dispatch = {dispatch}
      />
    </div>
  )
}

// connect is a curried component that maps the state from redux (first call) to a presentational component (second call, in this case List)
const BoardView = connect(e => ({ui: e.ui, observations: e.observations}))(BoardViewEl)
export default BoardView