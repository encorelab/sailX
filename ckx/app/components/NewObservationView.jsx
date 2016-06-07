import React from 'react';
import { render } from 'react-dom'
import Formsy from 'formsy-react'
import FRC from 'formsy-react-components'

const NewObservationFields = (e) => {
  let { id, ...rest } = e
  switch (e.kind) {
    case 'INPUT':
      return (
        <FRC.Input
          name = {id}
          id = {id}
          key = {id}
          type = 'text'
          value = ''
          {...rest}
        />
      )
    case 'TEXTAREA':
      return (
        <FRC.Textarea
          name = {id}
          id = {id}
          key = {id}
          value = {e.value || ''}
          {...rest}
        />
      )
  }
}

class NewObservationView extends React.Component {
  constructor() {
    super();
    this.state = {valid: false};
    NewObservationView.context = this;
  }
  valid = () => this.setState({valid: true});
  invalid = () => this.setState({valid: false});
  fields = () => this.props.fields.map( e => NewObservationFields(e) );

  //let uploadSpinner = '<div>Nope</div>';
  // if (this.props.isUploading == true) {
  //   //<i class="fa fa-spinner fa-pulse"></i>
  //   uploadSpinner = '<div>Working</div>'
  // }

  render() {
    return (
      <div>
        <Formsy.Form
          onSubmit = {this.props.onSubmit}
          onValid = {this.valid}
          onInvalid = {this.invalid}
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
        <button onClick = {this.props.attachMediaFn}>Attach Media</button>
        {/* Formsy doesn't seem to have a native cancel... lame. Or maybe I'm out of touch with modern UX practices? :) */}
        <button onClick = {this.props.onClose}>Cancel</button>
        <br />
        <input id="relationship-photo-file" type="file" name="file" accept=".jpg,.gif,.jpeg,.png,.mp4,.m4v,.mov" />
        {/* {uploadSpinner} */}
      </div>
    )
  }
}

export default NewObservationView