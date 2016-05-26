import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import Paper from 'material-ui/lib/paper';
import AspectRatio from 'react-icons/lib/md/aspect-ratio';
import Delete from 'react-icons/lib/md/delete';
import { shorten } from '../lib/utils';

const format = (box) => {
  let c = []
  for(var key in box) {
    if(box.hasOwnProperty(key)) {
      c.push([key, box[key]])
    }
  }
  return c.map(k => <div><b>{k[0]}</b>:{k[1]}<br /></div>)
}

export const ObservationContainer = ( { title, infoFn, clickFn, ...box } ) => {
  const style = {
    height: 100,
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block'
  };

  return (
    <div style =
      {
        {
          fontSize: '20px',
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        }
      }
    >
      <Paper zDepth = {3} style = {style} >
        <div>
          {shorten(title, 20)}
          <span style = {{float:'right'}} >
            <Delete onClick = {clickFn} />
            <AspectRatio onClick = {infoFn} />
          </span>
        </div>
        <div style =
          {
            {
              fontSize: '15px',
              float: 'left',
              marginTop: '15px',
              marginLeft: '5px'
            }
          }
        >
          {shorten(box.content, 100)}
        </div>
      </Paper>
    </div>
  )
}

export const ObservationDetails = ( { open, onClose, title, box } ) => {
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