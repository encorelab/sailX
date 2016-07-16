import React from 'react';
import Paper from 'material-ui/Paper';
import { AspectRatio, Delete, Create } from 'app/lib/icons'
import { shorten } from 'app/lib/utils';

export default ({ ui, openInfoFn, openEditFn, deleteFn, ...observation, isOwn, canCreate }) => {
  let deleteBtn, editBtn, detailsBtn;

  // can only delete own posts
  if (isOwn) {
    deleteBtn = <Delete onClick = {deleteFn} />
  }

  // can only edit if own, and no draft available
  if (isOwn && canCreate) {
      editBtn = <Create
      onClick = {openEditFn}
      size = '1em'
      />
  } else {
    detailsBtn = <AspectRatio onClick = {openInfoFn} />
  }

  return (
    <div style = {toplevelStyle}>
      <Paper zDepth = {3} style = {containerStyle} >
        <div>
          {shorten(observation.title, 20)}
          <span style = {buttonStyle}>
            {deleteBtn}
            {editBtn}
            {detailsBtn}
          </span>
        </div>
        <div style = {contentStyle}>
          {shorten(observation.content, 100)}
        </div>
        <div style = {ownerStyle}>
          {observation.owner}
        </div>
      </Paper>
    </div>
  )
}

const toplevelStyle = {
  fontSize: '20px',
  textOverflow: 'ellipsis',
  overflow: 'hidden'
}

const containerStyle = {
  height: 100,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block'
}

const buttonStyle = {
  float:'right'
}

const contentStyle = {
  fontSize: '15px',
  float: 'left',
  marginTop: '15px',
  marginLeft: '5px'
}

const ownerStyle = {
  fontSize: '12px',
  float: 'right',
  marginTop: '50px',
  marginRight: '5px'
}
