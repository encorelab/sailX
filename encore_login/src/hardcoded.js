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
  {name: 'Cole', role: 'student', CO: COs[0]},
  {name: 'Peter', role: 'student', CO: COs[0]},
  {name: 'Paul', role: 'student', CO: COs[0]},
  {name: 'Marianne', role: 'student', CO: COs[0]},
  {name: 'Board', role: 'board', CO: COs[0]},
  {name: 'Stian', role: 'student', CO: COs[1]},
  {name: 'Andreas', role: 'student', CO: COs[1]},
  {name: 'Janne', role: 'student', CO: COs[1]},
  {name: 'Andrea', role: 'student', CO: COs[2]},
  {name: 'Agnete', role: 'student', CO: COs[2]}
]