import React from 'react';
import { render } from 'react-dom'

import Formsy from 'formsy-react'
import FRC from 'formsy-react-components'

const formField = (e) => {
  switch (e.type) {
    case 'INPUT': 
      return(<FRC.Input
          name={e.id}
          id={e.id}
          key={e.id}
          value={ e.defaultValue }
          label={ e.label }
          type={ e.valueType }
          placeholder= { e.placeholder }
          help= { e.help }
          required={ e.required} />)
    case 'TEXTAREA':
      return(<FRC.Textarea   
          name={e.id}
          id={e.id}
          key={e.id}
          value={ e.defaultValue }
          label={ e.label }
          type={ e.valueType }
          placeholder= { e.placeholder }
          help= { e.help }
          required={ e.required} />)
  }
}
class Form extends React.Component {
  constructor() {
    super();
    this.state = {valid: false};
    Form.context = this;
    console.log(this.props)
  }
  valid = () => this.setState({valid: true});
  invalid = () => this.setState({valid: false});
  fields = () => this.props.fields.map( e => formField(e) );

  render() {
  return(
    <Formsy.Form onSubmit={this.props.onSubmit} onValid={this.valid} onInvalid={this.invalid}>
      <fieldset>
        {this.fields()}
      </fieldset>
        <input className="btn btn-primary" type="submit" defaultValue="Submit" disabled={!this.state.valid} {...this.props.submitButton}/>
    </Formsy.Form>
  )}}

  export default Form
