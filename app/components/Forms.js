import React from 'react';
import { render } from 'react-dom'
import { Flex, Block} from 'jsxstyle';
import { connect } from 'react-redux'

import Formsy from 'formsy-react'
import FRC from 'formsy-react-components'

const Log = (e) => console.log(e)

const formData = [
  {id: 'name', type: 'INPUT', label: "Name", required: true, placeholder: "Name"},
  {id: 'age', type: 'INPUT', label: "Age", obligatory: false, valueType: "number"},
  {id: 'desc', type: 'TEXTAREA', label: 'Description'}
]

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
const fields = formData.map( e => formField(e) )

class Form extends React.Component {
  constructor() {
    super();
    this.state = {valid: false};
    Form.context = this;
  }
  valid = () => this.setState({valid: true});
  invalid = () => this.setState({valid: false});

  render() {
  return(
    <Formsy.Form onSubmit={Log} onValid={this.valid} onInvalid={this.invalid}>
      <fieldset>
        {fields}
      </fieldset>
        <input className="btn btn-primary" type="submit" defaultValue="Submit" disabled={!this.state.valid}/>
    </Formsy.Form>
  )}}

  export default Form
