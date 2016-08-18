import { uuid, currentDate } from '../lib/utils'

export default (state, action) => {
  switch (action.type) {
    // db sync actions
    case 'add':
      if (action.doc.id) {
        console.error("You used add with a document that already has an ID. Use the edit action instead, or remove the id to create a new object!")
      }
      return [...state,
        {
          id: uuid(),
          created_at: currentDate(),
          ...action.doc
        }
      ]
      break

    case 'edit':
      return state.map(doc =>
        doc.id === action.doc.id ?
          {...doc, ...action.doc} :
          doc
        )
      break

    case 'delete':
      return state.filter(doc =>
        doc.id !== action.id
      )

    case 'deleteall':
      return([])
      break

    default:
      return state
  }
}
