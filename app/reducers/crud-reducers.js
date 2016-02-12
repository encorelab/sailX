import { uuid } from '../lib/utils'

// returns a function that contains normal CRUD + DB sync reducers, with
// kind attached to end of reducer names (like INSERT_kind). Non-matching
// actions are passed on to restfn
export default (kind, restfn, initstate = [], deffields) => {
  return(
(state = initstate, fullaction) => {
  if ( fullaction.type.indexOf(kind) == -1) { return state } else {     // only carry on if the action kind is the one we want, then strip the action kind to make reducers generic
  let action = { ...fullaction,
    type: fullaction.type.split('_')[0]
  }
  switch (action.type) {
    // db sync actions
  case 'INITSTATE':
    return action.docs

    case 'DBINSERT':
      return [
        action.doc, 
        ...state
      ]

    case 'DBDELETE':
      return state.filter(doc =>
        doc._id !== action._id
      )

    case 'DBEDIT':
      return state.map(doc =>
        doc._id === action.doc._id ?
          {...doc, ...action.doc} : 
          doc
      )

      // crud
    case 'ADD':
      return [
        ...state,
        {
            _id: uuid(),
            ...deffields,
          ...action.doc
        } 
      ]

    case 'UPDATE':
      return state.map(box =>
        box._id === action.doc._id ?
          action.doc :
          box
      )
      
    case 'DELETEALL':
      return([])

    default:
      return restfn(state, action, kind)
  }
}
})}

