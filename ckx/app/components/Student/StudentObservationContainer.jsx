import React from 'react';
import Paper from 'material-ui/lib/paper';
import AspectRatio from 'react-icons/lib/md/aspect-ratio';
import Delete from 'react-icons/lib/md/delete';
import Create from 'react-icons/lib/md/create'
import { shorten } from '../../lib/utils';

export default ({ ui, openInfoFn, openEditFn, deleteFn, ...observation, studentState }) => {
  let deleteBtn, editBtn, detailsBtn;
  if (observation.owner === ui.user) {
    deleteBtn = <Delete onClick = {deleteFn} />;
    if (studentState.length == 0) {

      editBtn = <Create
      onClick = {openEditFn}
      size = '1em'
      />;
    }
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