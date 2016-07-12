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
    this.state = {valid: false};
  }
  valid = () => this.setState({valid: true});
  invalid = () => this.setState({valid: false});
  fields = () => this.props.fields.map( e => observationFields(e) )

  onChange = (doc) => {
    // this first condition prevents the onChange synthetic event from bubbling up - need to find a cleaner way to do this
    if (event.type !== 'react-change') {
      console.log(doc)
    }
  }

  render() {
    console.log(this.props)
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
          />
        </Formsy.Form>
        <button onClick = {() => this.props.switchView('read')}>Cancel</button>
      </div>
    )
  }
}

export default connect(
  e => ({fields: e.ui.fields, observations: e.observations, canCreate: !e.studentstate.draft}),
  {...uiActions, ...crudActions('Observation')}
)(WriteView)

