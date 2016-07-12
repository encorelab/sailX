import React from 'react'

const createImg = (file) => {
  const objectURL = URL.createObjectURL(file)
  return <img style={{padding: '5px'}} width="100" height="100" src={objectURL} />
}

export default ({ files }) => {
  let filesAr = files.map(createImg)

  return (
    <div>
      {filesAr}
    </div>
  )
}
