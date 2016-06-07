import React from 'react';
import Paper from 'material-ui/lib/paper';
import AspectRatio from 'react-icons/lib/md/aspect-ratio';
import Delete from 'react-icons/lib/md/delete';
import { shorten } from '../lib/utils';
import { ObservationContainer, ObservationDetails } from './ObservationElements';

export default ( { key, observations, ui, dispatch, openEditFn } ) => {

  const observationList = observations.map(e => {
    const deleteFn = () => { dispatch({type: 'DELETE_OBSERVATION', id: e.id}) }
    const openInfoFn = () => { dispatch({type: 'OPENINFO_UI', id: e.id}) }
    const closeInfoFn = () => { dispatch({type: 'CLOSEINFO_UI', id: e.id}) }

    return (
      <div>
        <ul>
          <li>
            <ObservationContainer
              key = {e.id+'info'}
              openInfoFn = {openInfoFn}
              openEditFn = {openEditFn}
              deleteFn = {deleteFn}
              {...e}
            />
            <ObservationDetails
              key = {e.id}
              observation = {e}
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