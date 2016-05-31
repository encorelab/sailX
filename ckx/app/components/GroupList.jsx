import React from 'react';
import { connect } from 'react-redux'
import Forms from './Forms'
import { changeRoute } from '../router'
import { horizon } from '../index'
import horizonSync from 'horizon-redux-sync'

// suggestion for prompt for new groups
const defPrompt = `{
  "prompt": [
    { "id": "title",
     "label": "Title",
      "kind": "INPUT",
      "required": true
    },
    { "id": "content",
      "label": "Idea",
      "kind": "TEXTAREA",
      "required": true}
  ]
}`

// form to add new groups
const newGroupPrompt = (title, id, prompt) =>
[
  { id: 'title',
    label: 'Title',
    kind: 'INPUT',
    required: true,
    defaultValue: title},
  { id: 'id',
    label: 'Unique id',
    kind: 'INPUT',
    required: true,
    defaultValue: id},
  { id: 'prompts',
    label: 'Prompts',
    kind: 'TEXTAREA',
    rows: 20,
    cols: 80,
    required: true,
    value: prompt,
    validations: {myCustom: (e, p) => validPrompt(p)},
    validationErrors: {myCustom: "Not valid prompt"}}
]

// check if an entered prompt is valid
const validPrompt = (prompt) => {
  try {
    const p = JSON.parse(prompt)
    const fields = p.prompt.map(e => e.label)
    const valid = fields.indexOf('Title')
    return valid > -1
  } catch(err) {
    return false
  }
}

const newfields = (group) => {
  if (group) {
    var { title, id, prompt } = group
  } else {
    var title = undefined, id = undefined, prompt = defPrompt
  }

  return newGroupPrompt(title, id, prompt)
}

// single group component
const Group = ( {onClick, title} ) => {
  return (
    <li>
      <a href='#' onClick={onClick} >
        {title}
      </a>
    </li>
  )
}

// returns a function that connects the db to the
// group chosen, and emits to the redux store
// const chooseGroup = (group) => {
//   return ( () => {
//     // params: (x, y, redux subtree, rethink collection, suffix of the action)
//     horizonSync(horizon, store, '/boxes', group.id, 'BOXES')
//     store.dispatch({
//       type: "SETGROUP_UI",
//       group: group.id,
//       fields: JSON.parse(group.prompts).prompt
//     })
//     changeRoute('boxes')
//   })
// }
const chooseGroup = (group) => {
  return ( () => {
    // params: (x, y, redux subtree, rethink collection, suffix of the action)
    horizonSync(horizon, store, '/boxes', group.id, 'BOXES')
    store.dispatch({
      type: "SETGROUP_UI",
      group: group.id,
      fields: JSON.parse(group.prompts).prompt
    })
    changeRoute('student')
  })
}

// Group list and header
export const Groups = (props) => {
  return (
    <div>
      <h1>Welcome to CKX</h1>
      <p>Please choose a group board, or create a new one</p>
      <ul>
        {props.groups.map(e =>
          <Group
            title = {e.title}
            key = {e.id}
            onClick = {chooseGroup(e)}
          />
        )}
      </ul>
      <Forms
        fields = {newfields()}
        onSubmit = {(e) => store.dispatch({type: 'ADD_GROUP', doc: e})}
      />
    </div>
  )
}

const GroupWrapper = connect(e => ( {groups: e.groups} ))(Groups)

export default GroupWrapper
