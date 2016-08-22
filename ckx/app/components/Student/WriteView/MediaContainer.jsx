import React from 'react'

const createImg = (file) => {
  const objectURL = URL.createObjectURL(file)
  return <img style={thumbnailStyle} src={objectURL} />
}

export default ({ state }) => {
  let filesAr = [];
  if (state.doc && state.doc.file) {
    let files = state.doc.file
    for (var i = 0; i < files.length; i++) {
      filesAr.push(createImg(files[i]))
    }
  }

  return (
    <div>
      {filesAr}
    </div>
  )
}

const thumbnailStyle = {
  padding: '5px',
  width: '100px',
  height: '100px'
}