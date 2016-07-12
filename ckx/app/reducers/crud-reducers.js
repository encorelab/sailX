import { uuid, currentDate } from '../lib/utils'

export default (state, action) => {
  switch (action.type) {
    // db sync actions
    case 'add':
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

    case 'deleteAll':
      return([])
      break

    default:
      return state
  }
}
