import React from 'react';
import { render } from 'react-dom'
import Formsy from 'formsy-react'
import FRC from 'formsy-react-components'

const NewObservationFields = (e, observation) => {
  let { id, ...rest } = e

  switch (e.kind) {
    case 'INPUT':
      return (
        <FRC.Input
          name = {id}
          id = {id}
          key = {id}
          type = 'text'
          value = {observation[e.id] || ''}
          {...rest}
        />
      )
    case 'TEXTAREA':
      return (
        <FRC.Textarea
          name = {id}
          id = {id}
          key = {id}
          value = {observation[e.id] || ''}
          {...rest}
        />
      )
  }
}


const attachMedia = (context, dispatch) => {
  const MAX_FILE_SIZE = 20971520;
  var formData = new FormData();
  var file = context.refs.file.files[0];
  formData.append( 'file', file );

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

const checkWriteMode = (context) => {
  if (context.props.ui.editMode) {
    return context.props.ui.observationToEdit;
  } else if (context.props.drafts && context.props.drafts.length > 0) {
    return context.props.drafts[0];
  } else {
    return {};
  }
};

class StudentWriteView extends React.Component {
  constructor() {
    super();
    this.state = {valid: false};
    StudentWriteView.context = this;
  }
  valid = () => this.setState({valid: true});
  invalid = () => this.setState({valid: false});
  fields = () => this.props.ui.fields.map( e => NewObservationFields(e, checkWriteMode(StudentWriteView.context)) );
  onSubmitWithId = (doc) => this.props.onSubmit(doc, this.props.ui.observationToEdit && this.props.ui.observationToEdit.id, this.props.ui.user);
  onChange = (doc) => this.props.updateDraft(doc, this.props.drafts[0].id);

  //let uploadSpinner = '<div>Nope</div>';
  // if (this.props.isUploading == true) {
  //   //<i class="fa fa-spinner fa-pulse"></i>
  //   uploadSpinner = '<div>Working</div>'
  // }<FRC.Input type="text" name="id" value={this.props.ui.observationToEdit.id} style={{visibility: 'hidden'}}/>


  render() {
    return (
      <div>
        <Formsy.Form
          onSubmit = {this.onSubmitWithId}
          onValid = {this.valid}
          onInvalid = {this.invalid}
          onChange = {this.onChange}
        >
          <fieldset>
            {this.fields()}
          </fieldset>
          <input
            className = "btn btn-primary"
            type = "submit"
            defaultValue = "Submit"
            disabled = {!this.state.valid}
            {...this.props.submitButton}
          />

        </Formsy.Form>


        <button onClick = {() => attachMedia(StudentWriteView.context, this.props.dispatch)}>Attach Media</button>
        <br />
        <input id="relationship-photo-file" ref="file" type="file" name="file" accept=".jpg,.gif,.jpeg,.png,.mp4,.m4v,.mov" />
        {/* {uploadSpinner} */}
        <br />
        {/* Formsy doesn't seem to have a native cancel... lame. Or maybe I'm out of touch with modern UX practices? :) */}
        <button onClick = {this.props.onCancel}>Cancel</button>
      </div>
    )
  }
}

export default StudentWriteView