import React from 'react';
import Paper from 'material-ui/lib/paper';
import AspectRatio from 'react-icons/lib/md/aspect-ratio';
import Delete from 'react-icons/lib/md/delete';
import { shorten } from '../lib/utils';
import { MovableObservationContainer, ObservationDetails } from './ObservationElements';


export default ( { boxes, ui, dispatch } ) => {
  const observationList = boxes.map(e => {
    const openInfoFn = () => { dispatch({type: 'OPENINFO_UI', id: e.id}) }
    const closeInfoFn = () => { dispatch({type: 'CLOSEINFO_UI', id: e.id}) }

    const setXY = (a, ui) => {
      dispatch({ type: 'MOVE_BOX', id: e.id, delta_x: ui.position.left, delta_y: ui.position.top })
    }

    return (
      <div>
        <MovableObservationContainer
          key = {e.id}
          setXY={setXY}
          openInfoFn = {openInfoFn}
          {...e}
        />
        <ObservationDetails
          box = {e}
          key = {e.id+'info'}
          closeInfoFn = {closeInfoFn}
          open = {ui.infoOpen == e.id}
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