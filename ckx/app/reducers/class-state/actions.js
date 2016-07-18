export const lockTablets = () => ({
  type: 'EDIT/class_state',
  doc: {'tabletsLocked': true}
})
export const unlockTablets = () => ({
  type: 'EDIT/class_state',
  doc: {'tabletsLocked': false}
})
