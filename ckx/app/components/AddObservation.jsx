import React from 'react';
import Create from 'react-icons/lib/md/create'
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import NewObservationView from './NewObservationView'

// the little pencil icon used for creating a new note
const NewObservationButton = ( { onClick } ) => {
  const style = {
    position: 'fixed',
    left: '50%',
    bottom: '20px',
    transform: 'translate(-50%, -50%)',
    margin: '0 auto'
  }

  return (
    <Create
      style = {style}
      onClick = {onClick}
      size = '4em'
    />
  )
}

const AddObservationDialog = ( { fields, open, onClose, onSubmit } ) => {
  return (
    <Dialog
      title = 'Add a new idea'
      modal = {false}
      open = {open}
      onRequestClose = {onClose}
    >
      <NewObservationView
        fields = {fields}
        onSubmit = {onSubmit}
        onClose = {onClose}
      />
    </Dialog>
  )
}

export default ( { isOpen, openFn, closeFn, submitFn, fields } ) => {
  return (
    <div>
      <NewObservationButton onClick = {openFn} />
      <AddObservationDialog
        open = {isOpen}
        onClose = {closeFn}
        onSubmit = {submitFn}
        fields = {fields}
      />
    </div>
  )
}