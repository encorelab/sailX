import React from 'react';
import Paper from 'material-ui/lib/paper';
import AspectRatio from 'react-icons/lib/md/aspect-ratio';
import Delete from 'react-icons/lib/md/delete';
import { shorten } from '../lib/utils';
import { MovableObservationContainer, ObservationDetails } from './ObservationElements';


export default ( { boxes, ui, dispatch } ) => {
  // sorting by id for now, what do we want in the long run? maybe 'date created inverse'? (will need to add date_created?)
  const observationList = boxes.map(e => {
    const clickFn = () => { dispatch({type: 'DELETE_BOX', id: e.id}) }
    const infoFn = () => { dispatch({type: 'OPENINFO_UI', id: e.id}) }
    const closeInfoFn = () => { dispatch({type: 'CLOSEINFO_UI', id: e.id}) }

    const setXY = (a, ui) => {
      dispatch({ type: 'MOVE_BOX', id: e.id, delta_x: ui.position.left, delta_y: ui.position.top })
    }

    return (
      <div>
        <MovableObservationContainer
          key = {e.id}
          clickFn = {clickFn}
          setXY={setXY}
          infoFn = {infoFn}
          {...e}
        />
        <ObservationDetails
          box = {e}
          key = {e.id+'info'}
          onClose = {closeInfoFn}
          title = {e.title}
          text = {e.content}
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