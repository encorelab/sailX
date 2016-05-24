import React from 'react';
// import { Flex, Block } from 'jsxstyle';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';


const format = (box) => {
  let c = []
  for(var key in box) {
    if(box.hasOwnProperty(key)) {
      c.push([key, box[key]])
    }
  }
  return c.map(k => <div><b>{k[0]}</b>:{k[1]}<br /></div>)
}

export const BoxDetail = ( { open, onClose, title, box } ) => {
  const actions = [
    <FlatButton
      label = "X"
      secondary = {true}
      onClick = {onClose}
    />
  ]

  return (
    <Dialog
      title = {title}
      modal = {false}
      actions = {actions}
      open = {open}
      onRequestClose = {onClose}
    >
      {format(box)}
    </Dialog>
  )
}