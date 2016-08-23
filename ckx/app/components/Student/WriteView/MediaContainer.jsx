import React from 'react'

export default ({ state }) => {
  return (
    <div>
      {state.media ?
      <div>
        {state.media.map(function(url) {
          let src = "http://pikachu.coati.encorelab.org/" + url
          return <img src={src} style={thumbnailStyle} ></img>
        })}
      </div> : null}
    </div>
  )
}

const thumbnailStyle = {
  padding: '5px',
  width: '100px',
  height: '100px'
}
