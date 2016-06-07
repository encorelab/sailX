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

const AddObservationDialog = ( { dispatch, fields, open, onClose, onSubmit } ) => {
  // start here - we definitely need talk about backing up notes, it is only submitted on submit (what happens if tablet crashes)
  const attachMediaFn = () => {
    dispatch({type: 'ADDMEDIA_OBSERVATION', doc: 'uh-oh'})
  };

  return (
    <Dialog
      title = 'Add a new idea'
      modal = {false}
      open = {open}
      onRequestClose = {onClose}
    >
      <NewObservationView
        attachMediaFn = {attachMediaFn}
        fields = {fields}
        onSubmit = {onSubmit}
        onClose = {onClose}
      />
    </Dialog>
  )
}

export default ( { dispatch, isOpen, openFn, closeFn, submitFn, fields } ) => {
  return (
    <div>
      <NewObservationButton onClick = {openFn} />
      <AddObservationDialog
        dispatch = {dispatch}
        open = {isOpen}
        onClose = {closeFn}
        onSubmit = {submitFn}
        fields = {fields}
      />
    </div>
  )
}