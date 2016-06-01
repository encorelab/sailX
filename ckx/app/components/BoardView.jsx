import React from 'react'
import { connect } from 'react-redux'
import ObservationCluster from './ObservationCluster'

const BoardViewEl = ({ ui, boxes, dispatch }) => {
  return (
    <div>
      <ObservationCluster
        ui = {ui}
        boxes = {boxes}
        dispatch = {dispatch}
      />
    </div>
  )
}

// connect is a curried component that maps the state from redux (first call) to a presentational component (second call, in this case List)
export const BoardView = connect(e => ({ui: e.ui, boxes: e.boxes}))(BoardViewEl)