import React from 'react';
import { connect } from 'react-redux'
import Forms from './Forms'
import PouchSync from '../lib/pouch-middleware'

const defPrompt = `{"prompt": [
  {"id": "title", 
   "label": "Title",
    "kind": "INPUT",
    "required": true
  },
  { "id": "content",
    "label": "Idea",
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
    value: prompt,
    validations: {myCustom: (e, p) => validPrompt(p)},
    validationErrors: {myCustom: "Not valid prompt"}}
])
}
const Group = ({onClick, title}) => <li><a href='#' onClick={onClick}> {title}</a></li>

const Groups = (props) => {
  const chooseGroup = (group) =>{ return( () => {
   PouchSync(store, "/boxes", group.id, "BOXES")
   store.dispatch({type: "SETGROUP_UI", group: group.id, fields: JSON.parse(group.prompts).prompt})
   store.dispatch({type: "CHANGEROUTE_UI", route: 'boxes'})
  })}
  return(
    <div> <ul>
    {props.groups.map(e => <Group title={e.title} key={e.title} onClick={chooseGroup(e)}/>)}
    </ul>
    <Forms fields={newfields()} onSubmit={(e) => store.dispatch({type: 'ADD_GROUP', doc: e})} />
    </div>
  )}


const GroupWrapper = connect(
  e => ({groups: e.groups}))(Groups)

export default GroupWrapper
