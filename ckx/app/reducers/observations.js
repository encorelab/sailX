import { createSelector } from 'reselect'

export const infoSelector = (e) => { return (
  e.ui.infoOpen ? 
    e.observations.filter(obs => obs.id == e.ui.infoOpen)[0] : 
    undefined
)} 

export default (state, action) => {
  switch (action.type) {
    case 'MOVE':
      return state.map(observation =>
        observation.id === action.id ?
          {...observation, x: observation.x + action.delta_x, y: observation.y + action.delta_y} :
          observation
      )

    case 'GATHER':
      return state

    case 'SCATTER':
      return state

    default:
      return state
    }
}
