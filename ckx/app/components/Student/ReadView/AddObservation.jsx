import React from 'react'
import { Create, WrapText } from 'app/lib/icons'
import { connect } from 'react-redux';
import { switchView } from 'app/ui/actions'
import './AddObservation.scss'

const AddObservation = ( { hasDraft, switchView } ) => {
  const properties = {
    className: "AddObservation",
    size: '4em',
    onClick: () => switchView('write')
  }

  return hasDraft ? <WrapText {...properties} /> : <Create {...properties} />
}

export default connect(
  e => ({hasDraft: e.studentstate.draft}),
  {switchView: switchView}
)(AddObservation)
