import React from 'react';
import Paper from 'material-ui/lib/paper';
import AspectRatio from 'react-icons/lib/md/aspect-ratio';
import Delete from 'react-icons/lib/md/delete';
import { shorten } from '../../lib/utils';
import { ObservationContainer, ObservationDetails } from '../ObservationElements';

export default ( { ui, observations, drafts, dispatch } ) => {
  const observationList = observations.map(e => {
    const deleteFn = () => {
      // we could try this if we wanted to style the ugly ass confirm dialog https://github.com/gregthebusker/react-confirm-bootstrap
      if (confirm('Are you sure you want to delete this observation?')) {
        dispatch({type: 'DELETE_OBSERVATION', id: e.id})
      }
    }
    const openEditFn = () => {
      dispatch({type: 'SETEDIT_UI', doc: e});
      dispatch({type: 'SWITCHVIEW_UI', view: 'write'});
    }
    const openInfoFn = () => { dispatch({type: 'OPENINFO_UI', id: e.id}) }
    const closeInfoFn = () => { dispatch({type: 'CLOSEINFO_UI', id: e.id}) }

    return (
      <div>
        <ul>
          <li>
            <ObservationContainer
              ui = {ui}
              key = {e.id+'info'}
              openInfoFn = {openInfoFn}
              openEditFn = {openEditFn}
              deleteFn = {deleteFn}
              drafts = {drafts}
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