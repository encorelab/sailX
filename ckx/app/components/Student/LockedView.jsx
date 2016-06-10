import React from 'react';
const lockedImg = require('../../img/lock-icon.png')

export default () => {
  return (
    <div
      style = {
        {
          height: '100%',
          background: 'black',
          paddingLeft: '46%',
          paddingTop: '27%'
        }
      }
    >
      <img src={lockedImg} />
    </div>
  )
}