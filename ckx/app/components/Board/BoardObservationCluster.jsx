import React from 'react';
import { connect } from 'react-redux'
import { move } from 'app/reducers/observations/actions'
import * as uiActions from 'app/reducers/ui/actions'
import BoardObservationContainer from './BoardObservationContainer';
import BoardObservationDetails from './BoardObservationDetails';

const ObservationCluster = ({ observations, ui, move, openInfo, closeInfo }) => {
  const observationList = observations.map(e => {
    const openInfoFn = () => openInfo(e.id)
    const closeInfoFn = () => closeInfo(e.id)

    const setXY = (_, draggable) => move(e.id, draggable.position.left, draggable.position.top)

    return (
      <div>
        <BoardObservationContainer
          key = {e.id}
          setXY={setXY}
          openInfoFn = {openInfoFn}
          {...e}
        />
      </div>
    )
  })

  return (
    <div>
      {observationList}
    </div>
  )
}

export default connect(
  e => ({observations: e.observations, ui: e.ui}),
  { move, ...uiActions })
(ObservationCluster)
