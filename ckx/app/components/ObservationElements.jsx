import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import Paper from 'material-ui/lib/paper';
import AspectRatio from 'react-icons/lib/md/aspect-ratio';
import Delete from 'react-icons/lib/md/delete';
import Create from 'react-icons/lib/md/create'
import Draggable from 'react-draggable'
import { shorten } from '../lib/utils';


// const format = (observation) => {
//   let c = []
//   for (var key in observation) {
//     if (observation.hasOwnProperty(key)) {
//       c.push([key, observation[key]])
//     }
//   }
//   return c.map(k => <div><b>{k[0]}</b>:{k[1]}<br /></div>)
// }


export const ObservationContainer = ( { ui, openInfoFn, openEditFn, deleteFn, ...observation, drafts } ) => {
  let deleteBtn, editBtn, detailsBtn;
  if (observation.owner === ui.user && drafts.length == 0) {
    deleteBtn = <Delete onClick = {deleteFn} />;
    editBtn = <Create
      onClick = {openEditFn}
      size = '1em'
    />;
  } else {
    detailsBtn = <AspectRatio onClick = {openInfoFn} />;
  }

  const style = {
    height: 100,
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block'
  };

  // we need to have a convo about the concept of a 'style variable' (some of this wants to overlap btw the observations?)
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
          {shorten(observation.title, 20)}
          <span style = {{float:'right'}} >
            {deleteBtn}
            {editBtn}
            {detailsBtn}
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
          {shorten(observation.content, 100)}
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
          {observation.owner}
        </div>
      </Paper>
    </div>
  )
}

export const MovableObservationContainer = ( { x, y, setXY, openInfoFn, ...observation } ) => {
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
            {shorten(observation.title, 20)}
            <span style = {{float:'right'}} >
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
            {shorten(observation.content, 100)}
          </div>
        </Paper>
      </div>
    </Draggable>
  )
}

export const ObservationDetails = ( { key, open, closeInfoFn, observation } ) => {
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