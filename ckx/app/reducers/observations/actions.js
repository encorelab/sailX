// moves a note by specifying the delta_x and delta_y
export const move = (id, delta_x, delta_y) => ({
  type: 'MOVE/OBSERVATIONS',
  id,
  delta_x,
  delta_y
})
