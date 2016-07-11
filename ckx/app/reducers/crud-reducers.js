import { uuid, currentDate } from '../lib/utils'

// returns a function that contains normal CRUD + DB sync reducers, with
// kind attached to end of reducer names (like INSERT_kind). Non-matching
// actions are passed on to restfn
export default (kind, restfn, initstate = [], deffields) => {
  return (
    (state = initstate, fullaction) => {
      // only carry on if the action kind is the one we want, then strip the action kind to make reducers generic
      if (fullaction.type.indexOf(kind) === -1) {
        return state
      } else {
        let action = {
          ...fullaction,
          type: fullaction.type.split('/')[0]
        }

        switch (action.type) {
          // db sync actions
          case 'INITSTATE':
            return action.docs

          case 'DBINSERT':
            return [
              action.doc,
              ...state.filter(doc => doc.id != action.doc.id)
            ]

          case 'DBDELETE':
            return state.filter(doc =>
              doc.id !== action.id
            )

          case 'DBUPDATE':
            return state.map(observation =>
              observation.id === action.doc.id ?
                action.doc :
                observation
            )

          // CRUD

          // fix window store nonsense here
          case 'ADD':
            return [
              ...state,
              {
                id: uuid(),
                created_at: currentDate(),
                media: [],
                ...deffields,
                ...action.doc
              }
            ]

          case 'EDIT':
            return state.map(doc =>
                doc.id === action.doc.id ?
                  {...doc, ...action.doc} :
                  doc
              )

          case 'DELETE':
            return state.filter(doc =>
              doc.id !== action.id
            )

          case 'DELETEALL':
            return([])

          default:
            return restfn(state, action, kind)
        }
      }
    }
  )
}
