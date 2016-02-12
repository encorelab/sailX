import React from 'react';
import { connect } from 'react-redux'
import Forms from './Forms'

const defPrompt = `{"prompt": [
  {"label": "Title",
    "kind": "INPUT",
    "required": true
  },
  {"label": "Idea",
    "kind": "TEXTAREA",
    "required": true}
]}`

const validPrompt = (prompt) => {
  try {
    let p = JSON.parse(prompt)
    let fields = p.prompt.map(e => e.label)
    const valid = fields.indexOf('Title') 
    return valid > -1
  } catch(err) {
    return false
  }
}

const newfields = (group) => {
  if (group) {
    var { title, id, prompt} = group
  } else {
    var title = undefined, id = undefined, prompt = defPrompt
  }
  return (
  [
  {id: 'title',
    label: 'Title',
    kind: 'INPUT',
    required: true,
    defaultValue: title},
  {id: 'id',
    label: 'Unique id',
    kind: 'INPUT',
    required: true,
    defaultValue: id},
  {id: 'prompts',
    label: 'Prompts',
    kind: 'TEXTAREA',
    rows: 20,
    cols: 80,
    required: true,
    defaultValue: prompt,
    validations: {myCustom: (e, p) => validPrompt(p)},
    validationErrors: {myCustom: "Not valid prompt"}}
])
}
const Group = (props) => <li>{props.name}</li>

const Groups = (props) => {
  return(
    <div>
    <ul>
    {props.groups.map(e => <Group name={e.name} key={e.name}/>)}
    </ul>
    <Forms fields={newfields()} onSubmit={(e) => console.log(e)} />
    </div>
  )}


const GroupWrapper = connect(
  e => ({groups: e.groups}))(Groups)

export default GroupWrapper
