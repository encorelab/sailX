// destructive function that loads all fixtures into database, creating db and tables
export default (r) => {
   r.dbDrop('encore_login').run()
   .then(() => () => {}, () => {}) // keep going no matter what, probably nicer way to do this
   .then(() => r.dbCreate('encore_login').run())
   .then(() => {

      const rr = r.db('encore_login')

      rr.tableCreate('classes', {primaryKey: "id"}).run()
      .then(() => rr.table('classes').insert(classes).run())

      rr.tableCreate('students', {primaryKey: "id"}).run()
      .then(() => rr.table('students').insert(students).run())

      rr.tableCreate('groups', {primaryKey: "id"}).run()
      .then(() => rr.table('groups').insert(groups).run())

      rr.tableCreate('COs', {primaryKey: "id"}).run()
      .then(() => rr.table('COs').insert(COs).run())

      rr.tableCreate('prompts', {primaryKey: "id"}).run()
      .then(() => rr.table('prompts').insert(prompts).run())
   }).then(() => console.log("RethinkDB encore_login db reset according to fixtures"))
}

const log = console.log

const defPrompt = `{
  "prompt": [
    {
      "id": "title",
      "placeholder": "Headline",
      "kind": "INPUT",
      "required": true
    },
    {
      "id": "content",
      "placeholder": "Give more details",
      "kind": "TEXTAREA",
      "required": true
    },
    {
      "kind": "FILE",
      "required": false
    }
  ]
}`

const altPrompt = `{
  "prompt": [
    {
      "id": "title",
      "placeholder": "Headline",
      "kind": "INPUT",
      "required": true
    },
    {
      "id": "content",
      "placeholder": "Give more details",
      "kind": "TEXTAREA",
      "required": true
    },
    {
      "id": "buildupon",
      "placeholder": "Build upon your classmates' contributions",
      "kind": "TEXTAREA",
      "required": false
    }
  ]
}`

export const classes = [
    {id: 1, name: 'Class 1', group: 1},
    {id: 2, name: 'Class 2', group: 2},
    {id: 3, name: 'Class 3', group: 3}
]

export const students = [
    {id: 1, name: 'John', class: 1, groups: [4, 5]},
    {id: 2, name: 'Peter', class: 1, groups: [4]},
    {id: 3, name: 'Alfred', class: 1},
    {id: 4, name: 'Anna', class: 2}
]

export const groups = [
    {id: 1, name: 'Class 1', COs: [1, 4]},
    {id: 2, name: 'Class 2', COs: [2]},
    {id: 3, name: 'Class 3', COs: []},
    {id: 4, name: 'Group Green', COs: [3,5]},
    {id: 5, name: 'Group Greenioe', COs: [6]},
]

export const COs = [
    {id: 1, type: 'ckx', name: 'Class 1 board', prompt: 1},
    {id: 2, type: 'ckx', name: 'Class 2 board', prompt: 1},
    {id: 3, type: 'ckx', name: 'Group Green board', prompt: 2},
    {id: 4, type: 'forum', name: 'Class 1 forum'},
    {id: 5, type: 'forum', name: 'Group Green forum'},
    {id: 6, type: 'ckx', name: 'Group Greenio board'}
]

export const prompts = [
    {id: 1, prompt: defPrompt}
]

