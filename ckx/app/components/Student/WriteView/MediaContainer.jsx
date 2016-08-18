import React from 'react'

const createImg = (file) => {
  debugger
  const objectURL = URL.createObjectURL(file)
  return <img style={thumbnailStyle} src={objectURL} />
}

export default ({ files }) => {
  let filesAr = files.map(createImg)

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