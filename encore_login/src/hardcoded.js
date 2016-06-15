const defPrompt = `{
  "prompt": [
    {
      "id": "title",
      "label": "Title",
      "kind": "INPUT",
      "required": true
    },
    {
      "id": "content",
      "label": "Idea",
      "kind": "TEXTAREA",
      "required": true
    }
  ]
}`

const COs = [
  {type: 'ck', name: 'Group 1', prompt: defPrompt, collection: 'group1ck'},
  {type: 'ck', name: 'Group 2', prompt: defPrompt, collection: 'group2ck'},
  {type: 'ck', name: 'Group 3', prompt: defPrompt, collection: 'group3ck'}
]

export default [
  {student: {name: 'Cole', role: 'student', class: 1}, CO: COs[0]},
  {student: {name: 'Peter', role: 'student', class: 1}, CO: COs[0]},
  {student: {name: 'Paul', role: 'student', class: 1}, CO: COs[0]},
  {student: {name: 'Marianne', role: 'student', class: 1}, CO: COs[0]},
  {student: {name: 'Board', role: 'board', class: 1}, CO: COs[0]},
  {student: {name: 'Stian', role: 'student', class: 2}, CO: COs[1]},
  {student: {name: 'Andreas', role: 'student', class: 2}, CO: COs[1]},
  {student: {name: 'Janne', role: 'student', class: 2}, CO: COs[1]},
  {student: {name: 'Andrea', role: 'student', class: 2}, CO: COs[2]},
  {student: {name: 'Agnete', role: 'student', class: 2}, CO: COs[2]}
]
