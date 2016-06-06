import React from 'react';
import Paper from 'material-ui/lib/paper';
import AspectRatio from 'react-icons/lib/md/aspect-ratio';
import Delete from 'react-icons/lib/md/delete';
import { shorten } from '../lib/utils';
import { ObservationContainer, ObservationDetails } from './ObservationElements';

export default ( { boxes, ui, dispatch } ) => {

  const observationList = boxes.map(e => {
    const deleteFn = () => { dispatch({type: 'DELETE_BOX', id: e.id}) }
    const openInfoFn = () => { dispatch({type: 'OPENINFO_UI', id: e.id}) }
    const closeInfoFn = () => { dispatch({type: 'CLOSEINFO_UI', id: e.id}) }

    return (
      <div>
        <ul>
          <li>
            <ObservationContainer
              key = {e.id}
              deleteFn = {deleteFn}
              openInfoFn = {openInfoFn}
              {...e}
            />
            <ObservationDetails
              box = {e}
              key = {e.id+'info'}
              closeInfoFn = {closeInfoFn}
              open = {ui.infoOpen == e.id}
            />
          </li>
        </ul>
      </div>
    )
  })

  return (
    <div>
      {observationList}
    </div>
  )
}