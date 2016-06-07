export default (state, action) => {
  switch (action.type) {
    case 'MOVE':
      return state.map(observation =>
        observation.id === action.id ?
          {...observation, x: observation.x + action.delta_x, y: observation.y + action.delta_y} :
          observation
      )
    case 'ADDMEDIA':
      console.log('and got there', action.doc);
      return state
    default:
      return state
    }
}
