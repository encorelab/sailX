import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export default ({ key, open, closeInfoFn, ...observation }) => {
  const actions = [
    <FlatButton
      //key = {observation.id+'something'}
      label = "X"
      secondary = {true}
      onClick = {closeInfoFn}
    />
  ]

  return (
    <Dialog
      //key = {observation.id}
      title = {observation.title}
      modal = {false}
      actions = {actions}
      open = {open}
      onRequestClose = {closeInfoFn}
    >
      <div>
        {observation.content}
      </div>
      <br />
      <div>
        Media goes here eventually
      </div>
    </Dialog>
  )
}
