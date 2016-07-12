import React from 'react'
import Create from 'react-icons/lib/md/create'
import { connect } from 'react-redux';
import { switchView } from 'app/ui/actions'
import './AddObservation.scss'

const AddObservation = ( { switchView } ) => {
  return (
    <Create
      className = "AddObservation"
      size = '4em'
      onClick = {() => switchView('write')}
    />
  )
}

export default connect(
  undefined,
  {switchView: switchView}
)(AddObservation)
