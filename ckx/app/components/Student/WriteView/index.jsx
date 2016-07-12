import React from 'react';
import { render } from 'react-dom'
import Formsy from 'formsy-react'
import { connect } from 'react-redux';
import MediaContainer from './MediaContainer'
import observationFields from './observationFields'
import * as uiActions from 'app/ui/actions'
import crudActions from 'app/reducers/crud-actions'

class WriteView extends React.Component {
  constructor() {
    super();
    this.state = {valid: false, doc: {}};
  }
  valid = () => this.setState({valid: true});
  invalid = () => this.setState({valid: false});
  formFields = () => this.props.fields.map( e => observationFields(e) )
  cancel = () => this.props.switchView('read')
  onChange = (doc) => this.setState({doc: doc}) 
  onSubmit = () => {
    this.props.addObservation({...this.state.doc, owner: this.props.user})
    this.props.switchView('read')
  }

  render() {
    return (
      <div>
        <Formsy.Form
          onSubmit = {this.onSubmit}
          onValid = {this.valid}
          onInvalid = {this.invalid}
          onChange = {this.onChange}
        >
          <fieldset>
            {this.formFields()}
          </fieldset>
          <input
            className = "btn btn-primary"
            type = "submit"
            defaultValue = "Submit"
            disabled = {!this.state.valid}
          />
        </Formsy.Form>
        <button onClick = {this.cancel}>Cancel</button>
      </div>
    )
  }
}

export default connect(
  e => ({fields: e.ui.fields, user: e.ui.user}),
  {...uiActions, ...crudActions('Observation')}
)(WriteView)

