import React from 'react';
import BoardObservationContainer from './BoardObservationContainer';
import BoardObservationDetails from './BoardObservationDetails';

export default ({ observations, ui, dispatch }) => {
  const observationList = observations.map(e => {
    const openInfoFn = () => { dispatch({type: 'OPENINFO_UI', id: e.id}) }
    const closeInfoFn = () => { dispatch({type: 'CLOSEINFO_UI', id: e.id}) }

    const setXY = (a, ui) => {
      dispatch({ type: 'MOVE_OBSERVATION', id: e.id, delta_x: ui.position.left, delta_y: ui.position.top })
    }

    return (
      <div>
        <BoardObservationContainer
          key = {e.id}
          setXY={setXY}
          openInfoFn = {openInfoFn}
          {...e}
        />
        <BoardObservationDetails
          key = {e.id+'info'}
          closeInfoFn = {closeInfoFn}
          open = {ui.infoOpen == e.id}
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