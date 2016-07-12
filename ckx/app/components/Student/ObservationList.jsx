import React from 'react';
import Paper from 'material-ui/Paper';
import AspectRatio from 'react-icons/lib/md/aspect-ratio';
import Delete from 'react-icons/lib/md/delete';
import { shorten } from '../../lib/utils';
import { connect } from 'react-redux';
import * as uiActions from 'app/ui/actions'
import crudActions from 'app/reducers/crud-actions'
import ObservationContainer from './ObservationContainer';

const ObservationList = (props) => {
  const list = props.observations.map(e => {

    const deleteFn = () => {
      if (confirm('Are you sure you want to delete this observation?')) {
        props.deleteObservation(e.id)
      }
    }

    const openEditFn = () => {
      props.setEdit(e)
      props.switchView('write')
    }

    return (
      <li key = {e.id}>
        <ObservationContainer
          isOwn = {!props.user == e.owner}
          openInfoFn = {() => props.openInfo(e.id)}
          openEditFn = {openEditFn}
          deleteFn = {deleteFn}
          canCreate = {props.canCreate}
          {...e}
        />
      </li>
    )
  })

  return (
    <ul>
      {list}
    </ul>
  )
}

export default connect(
  e => ({user: e.ui.name, observations: e.observations, canCreate: !e.studentstate.draft}),
  {...uiActions, ...crudActions('Observation')}
)(ObservationList)
