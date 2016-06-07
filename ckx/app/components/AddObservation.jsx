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

const AddObservationDialog = ( { dispatch, ui, open, onClose, onSubmit } ) => {
  const attachMediaFn = () => {
    const MAX_FILE_SIZE = 20971520;
    var file = jQuery("#relationship-photo-file")[0].files.item(0);
    var formData = new FormData();
    formData.append('file', file);

    if (file.size < MAX_FILE_SIZE) {
      dispatch({type: 'STARTUPLOADMEDIA_UI'});
      jQuery.ajax({
        url: 'https://pikachu.coati.encorelab.org/',
        type: 'POST',
        success: success,
        error: failure,
        data: formData,
        cache: false,
        contentType: false,
        processData: false
      });
    } else {
      jQuery().toastmessage('showErrorToast', "Max file size of 20MB exceeded");
    }

    function failure(err) {
      dispatch({type: 'ENDUPLOADMEDIA_UI'});
      jQuery().toastmessage('showErrorToast', "Photo could not be uploaded. Please try again");
    }

    function success(data, status, xhr) {
      dispatch({type: 'ENDUPLOADMEDIA_UI'});
      console.log("UPLOAD SUCCEEDED!" + data);
      console.log(xhr.getAllResponseHeaders());

      // clear out the label value if they for some reason want to upload the same thing...
      jQuery('#relationship-photo-file').val('');

      // update the observation - actually, there is no observation. Maybe this should all be one level lower, as a form field
      // dispatch({type: 'ADDMEDIA_OBSERVATION', doc: data.url});
    }

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
        fields = {ui.fields}
        onSubmit = {onSubmit}
        onClose = {onClose}
        isUploading = {ui.isUploading}
      />
    </Dialog>
  )
}

export default ( { dispatch, ui, isOpen, openFn, closeFn, submitFn } ) => {
  return (
    <div>
      <NewObservationButton onClick = {openFn} />
      <AddObservationDialog
        dispatch = {dispatch}
        open = {isOpen}
        onClose = {closeFn}
        onSubmit = {submitFn}
        ui = {ui}
      />
    </div>
  )
}