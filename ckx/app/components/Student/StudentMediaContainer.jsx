import React from 'react'

export default ({ files }) => {
  let filesAr = [];
  for (var i=0; i < files.length; i++) {
    let objectURL = URL.createObjectURL(files[i]);
    filesAr.push(<img style={{padding: '5px'}} width="100" height="100" src={objectURL} />);
  }

  return (
    <div>
      {filesAr}
    </div>
  )
}