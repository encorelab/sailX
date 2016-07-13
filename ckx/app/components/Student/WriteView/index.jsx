import React from 'react';
import { render } from 'react-dom'
import Formsy from 'formsy-react'
import { isEqual } from 'lodash'
import { connect } from 'react-redux';
import MediaContainer from './MediaContainer'
import observationFields from './observationFields'
import * as uiActions from 'app/ui/actions'
import * as studentStateActions from 'app/reducers/student-state-actions'
import crudActions from 'app/reducers/crud-actions'

class WriteView extends React.Component {
  constructor() {
    super();
    this.state = {valid: false, doc: {}};
  }

  componentDidMount = () => { 
    const interval = window.setInterval(this.periodicSaveDraft, 1000)
    const formFields = observationFields(this.props.fields, this.props.draft)
    this.setState({
      interval,
      formFields,
    })
  }

  componentWillUnmount = () => {
    window.clearInterval(this.state.interval)
  }

  periodicSaveDraft = () => { 
    if(this.state.doc != {} &&
      !isEqual(this.state.doc, this.state.prevDoc)) {
        this.props.storeDraft(this.state.doc)
        this.setState({prevDoc: this.state.doc})
    }
  }

  valid = () => this.setState({valid: true});
  invalid = () => this.setState({valid: false});
  cancel = () => {
    this.props.discardDraft()
    this.props.switchView('read')
  }

  onChange = (doc) => this.setState({doc: doc}) 
  onSubmit = () => {
    this.props.addObservation({...this.state.doc, owner: this.props.user})
    this.props.discardDraft()
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
            {this.state.formFields}
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
  e => ({fields: e.ui.fields, user: e.ui.user, draft: e.studentstate.draft}),
    {...uiActions, ...studentStateActions, ...crudActions('Observation')}
)(WriteView)

