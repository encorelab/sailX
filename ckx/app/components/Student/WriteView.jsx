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
    case 'FILE':
      return (
        <FRC.File
          ref = "file"
          type = "file"
          name = "file"
          accept = ".jpg,.gif,.jpeg,.png,.mp4,.m4v,.mov" multiple
        />
      )
  }
}

const checkWriteMode = (context) => {
  // start here - context.props.studentState -> context.props.studentState[0].text EVERYWHERE - time to create some utils for this
  // more relevantly, there are some serious timing issues
  if (context.props.ui.editMode) {
    return context.props.ui.observationToEdit;
  } else if (context.props.studentState && context.props.studentState.length > 0) {
    //return context.props.studentState[0].text;
    return context.props.studentState[0];
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
  onSubmitWithId = (doc) => this.props.onSubmit(doc, this.props.ui.observationToEdit && this.props.ui.observationToEdit.id, this.props.ui.user, this.props.studentState.length > 0 && this.props.studentState[0].id);
  onCancelWithId = (doc) => this.props.onCancel(doc, this.props.studentState.length > 0 && this.props.studentState[0].id);
  // WARNING: this kind of multiline function has bitten us in the past
  onChange = (doc) => {
    // this first condition prevents the onChange synthetic event from bubbling up - need to find a cleaner way to do this
    if (event.type !== 'react-change') {
      if (this.props.studentState.length > 0 && this.props.studentState[0].id) {
        this.props.updateDraft(doc, this.props.studentState.length > 0 && this.props.studentState[0].id);
      }
    }
  }

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
            {this.props.studentState[0] && this.props.studentState[0].file ?
              <StudentMediaContainer files = {this.props.studentState[0].file} /> :
              <div />
            }
          </fieldset>
          <input
            className = "btn btn-primary"
            type = "submit"
            defaultValue = "Submit"
            disabled = {!this.state.valid}
            {...this.props.submitButton}
          />
        </Formsy.Form>
        <button onClick = {this.onCancelWithId}>Cancel</button>
      </div>
    )
  }
}

export default StudentWriteView
