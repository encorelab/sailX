export default (state, action) => {
  switch (action.type) {
    case 'MOVE':
      return state.map(observation =>
        observation.id === action.id ?
          {...observation, x: observation.x + action.delta_x, y: observation.y + action.delta_y} :
          observation
      )
    // should this just be in the CRUD - edit? Nope, can't do either since we don't have a doc.id
    // case 'ADDMEDIA':
    //   debugger
    //   return state.map(observation =>
    //     observation.id === action.id ?
    //     {...observation, media: action}
    //     : observation
    //   )

    default:
      return state
    }
}
