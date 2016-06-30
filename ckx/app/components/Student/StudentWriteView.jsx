import React from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux';
import Formsy from 'formsy-react'
import FRC from 'formsy-react-components'
import { getKey } from '../../lib/utils'

const getDraft = (props) => getKey('draft', props.studentState)

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



// only fires for studentState right now - TODO
// move me into my own element at some point
const populateMediaContainer = (draft) => {
  if (draft && draft.file && draft.file[0]) {
    return draft.file[0].name
  }
};
      // onSubmit = {this.onSubmitWithId}
      // onValid = {this.valid}
      // onInvalid = {this.invalid}
      // onChange = {this.onChange}

// return either current note being edited, current draft, or empty object if brand new observation
const getExistingObs = (draft, ui) => {
  if (ui.editMode) {
    return ui.observationToEdit
  } else if (draft) {
    return draft.text
  } else {
    return {};
  }
}

// merge all fields with existing obs (if exists, either from saved note or draft), and set the right field type
const getFields = (draft, ui) => {
  const existingObs = getExistingObs(draft, ui) // check if we're editing an existing note, or if there is a draft
  return ui.fields.map( e => NewObservationFields(e, existingObs)) 
}

class StudentWriteViewEl extends React.Component {
  constructor() {
    super();
    this.state = {valid: false};
  }
  valid = () => this.setState({valid: true});
  invalid = () => this.setState({valid: false});
  fields = () => getFields(this.props.draft, this.props.ui)
  onSubmitWithId = (doc) => this.props.onSubmit(doc, this.props.ui.observationToEdit && this.props.ui.observationToEdit.id, this.props.ui.user, this.props.draft > 0 && draft.id);
  onCancelWithId = (doc) => this.props.onCancel(doc, draft && draft.id);

  render() { return(
    <div>
      <Formsy.Form
        onSubmit = {this.onSubmitWithId}
        onValid = {this.valid}
        onInvalid = {this.invalid}
        onChange = {this.onChange}
        >
        <fieldset>
          {this.fields()}
          <FRC.File ref="file" type="file" name="file" accept=".jpg,.gif,.jpeg,.png,.mp4,.m4v,.mov" multiple/>
          <div>
            {populateMediaContainer(this.props.draft)}
          </div>
        </fieldset>
        <input
          className = "btn btn-primary"
          type = "submit"
          disabled = {!this.state.valid}
          defaultValue = "Submit"
          {...this.props.submitButton}
        />
      </Formsy.Form>
      <button onClick = {this.onCancelWithId}>Cancel</button>
    </div>
  )}
}

//   onSubmitWithId = (doc) => this.props.onSubmit(doc, this.props.ui.observationToEdit && this.props.ui.observationToEdit.id, this.props.ui.user, this.props.studentState.length > 0 && draft.id);
//   onCancelWithId = (doc) => this.props.onCancel(doc, draft && draft.id);
//   // WARNING: this kind of multiline function has bitten us in the past
//   onChange = (doc) => {
//     // this first condition prevents the onChange synthetic event from bubbling up - need to find a cleaner way to do this
//     if (event.type !== 'react-change') {
//       //if (this.props.studentState.length > 0 && this.props.studentState[0].id) {
//         this.props.updateDraft(doc, draft && draft.id)
//       //}
//     }
//   }

//  render() {
//     return (
//     )
//   }
// }

export default connect(e => ({ui: e.ui, observations: e.observations, draft: getDraft(e)}))(StudentWriteViewEl)
