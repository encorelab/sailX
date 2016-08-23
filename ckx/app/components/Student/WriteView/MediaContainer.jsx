import React from 'react'

// const createImg = (file) => {
//   const objectURL = URL.createObjectURL(file)
//   return <img style={thumbnailStyle} src={objectURL} />
// }

export default ({ state }) => {
  // let filesAr = [];
  // if (state.doc && state.doc.file) {
  //   let files = state.doc.file
  //   for (var i = 0; i < files.length; i++) {
  //     filesAr.push(createImg(files[i]))
  //   }
  // }

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