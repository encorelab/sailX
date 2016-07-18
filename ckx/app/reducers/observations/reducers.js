import { createSelector } from 'reselect'
import { uuid, currentDate } from 'app/lib/utils'

export const infoSelector = (e) => { return (
  e.ui.infoOpen ?
    e.observations.filter(obs => obs.id == e.ui.infoOpen)[0] :
    undefined
)}

export default (state, action) => {
  switch (action.type) {
    case 'move':
      return state.map(observation =>
        observation.id === action.id ?
          {...observation, x: observation.x + action.delta_x, y: observation.y + action.delta_y} :
          observation
      )
      break

    case 'add':
      if(action.doc.id) { console.error("You used add with a document that already has an ID. Use the edit action instead, or remove the id to create a new object!") }
      return [...state,
        {
          id: uuid(),
          created_at: currentDate(),
          x: 0,
          y: 0,
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
      break

    case 'deleteall':
      return([])
      break


    default:
      return state
    }
}
