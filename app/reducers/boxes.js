export default (state, action) => {
  switch (action.type) {
    case 'MOVE':
      return state.map(box =>
        box.id === action.id ?
          {...box, x: box.x + action.delta_x, y: box.y + action.delta_y} : 
          box
      )
    default: 
      return state
    }
}
