import React from 'react';
import { render } from 'react-dom'

import Formsy from 'formsy-react'
import FRC from 'formsy-react-components'

const formField = (e) => {
  let { id, ...rest } = e
  console.log(e)
  switch (e.kind) {
    case 'INPUT': 
      return(<FRC.Input
          name={id}
          id={id}
          key={id}
          type='text'
          value=''
          {...rest} />)
    case 'TEXTAREA':
      return(<FRC.Textarea   
          name={id}
          id={id}
          key={id}
          value={e.value || ''}
          {...rest} />)
  }
}
class Form extends React.Component {
  constructor() {
    super();
    this.state = {valid: false};
    Form.context = this;
  }
  valid = () => this.setState({valid: true});
  invalid = () => this.setState({valid: false});
  fields = () => this.props.fields.map( e => formField(e) );

  render() {
  console.log(this.fields())
  return(
    <Formsy.Form onSubmit={this.props.onSubmit} onValid={this.valid} onInvalid={this.invalid}>
      <fieldset>
        {this.fields()}
      </fieldset>
        <input className="btn btn-primary" type="submit" defaultValue="Submit" disabled={!this.state.valid} {...this.props.submitButton}/>
    </Formsy.Form>
  )}}

  export default Form
