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

const COs = [
  {type: 'ck', name: 'Group 1', prompt: defPrompt, collection: 'group1ck'},
  {type: 'ck', name: 'Group 2', prompt: defPrompt, collection: 'group2ck'},
  {type: 'ck', name: 'Group 3', prompt: defPrompt, collection: 'group3ck'}
]

export default [
  {name: 'Stian', CO: COs[0]},
  {name: 'Peter', CO: COs[0]},
  {name: 'Paul', CO: COs[0]},
  {name: 'Marianne', CO: COs[0]},
  {name: 'Stian', CO: COs[1]},
  {name: 'Andreas', CO: COs[1]},
  {name: 'Janne', CO: COs[1]},
  {name: 'Andrea', CO: COs[2]},
  {name: 'Agnete', CO: COs[2]}
]



