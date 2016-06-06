import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import Paper from 'material-ui/lib/paper';
import AspectRatio from 'react-icons/lib/md/aspect-ratio';
import Delete from 'react-icons/lib/md/delete';
import Draggable from 'react-draggable'
import { shorten } from '../lib/utils';

const format = (box) => {
  let c = []
  for (var key in box) {
    if (box.hasOwnProperty(key)) {
      c.push([key, box[key]])
    }
  }
  return c.map(k => <div><b>{k[0]}</b>:{k[1]}<br /></div>)
}

export const ObservationContainer = ( { openInfoFn, deleteFn, ...box } ) => {
  let deleteBtn;
  if (box.owner === window.store.getState().ui.user) {
    deleteBtn = <Delete onClick = {deleteFn} />;
  }

  const style = {
    height: 100,
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block'
  };

  // we need to have a convo about the concept of a 'style variable' (some of this wants to overlap btw the boxes?)
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
          {shorten(box.title, 20)}
          <span style = {{float:'right'}} >
            {deleteBtn}
            <AspectRatio onClick = {openInfoFn} />
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
        <div style =
          {
            {
              fontSize: '12px',
              float: 'right',
              marginTop: '50px',
              marginRight: '5px'
            }
          }
        >
          {box.owner}
        </div>
      </Paper>
    </div>
  )
}

export const MovableObservationContainer = ( { x, y, setXY, title, openInfoFn, ...box } ) => {
  const style = {
    height: 100,
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block'
  };

  return (
    <Draggable
      onStart = {() => true}
      onStop = {setXY}
      cancel = '.nodrag'
    >
      <div style =
        {
          {
            position: 'absolute',
            fontSize: '20px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            top: y,
            left: x
          }
        }
      >
        <Paper zDepth = {3} style = {style} >
          <div>
            {shorten(title, 20)}
            <span style = {{float:'right'}} >
              {/* <Delete onClick = {clickFn} /> */}
              <AspectRatio onClick = {openInfoFn} />
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
    </Draggable>
  )
}

export const ObservationDetails = ( { open, closeInfoFn, title, box } ) => {
  const actions = [
    <FlatButton
      label = "X"
      secondary = {true}
      onClick = {closeInfoFn}
    />
  ]

  return (
    <Dialog
      title = {title}
      modal = {false}
      actions = {actions}
      open = {open}
      onRequestClose = {closeInfoFn}
    >
      {format(box)}
    </Dialog>
  )
}