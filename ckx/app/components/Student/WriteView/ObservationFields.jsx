import React from 'react';
import FRC from 'formsy-react-components'
import { notEmpty } from 'app/lib/utils'

export default (fields, toEdit, draftDoc) => {
  let draft
  if (notEmpty(toEdit)) {
    draft = toEdit
  } else if (draftDoc && draftDoc.doc) {
    draft = draftDoc.doc
  }

  const formFields = fields.map( e => {
    const { id, ...rest } = e
    const value = draft ? draft[id] : ''

    switch (e.kind) {
      case 'INPUT':
        return (
          <FRC.Input
            style = {fieldStyle}
            name = {id}
            id = {id}
            key = {id}
            type = 'text'
            value = {value}
            {...rest}
          />
        )
      case 'TEXTAREA':
        return (
          <FRC.Textarea
            style = {fieldStyle}
            name = {id}
            id = {id}
            key = {id}
            value = {value}
            {...rest}
          />
        )
      case 'FILE':
      debugger
        return (
          <FRC.File
            style = {fileUploadStyle}
            id = 'file'
            type = 'file'
            name = 'file'
            accept = '.jpg,.gif,.jpeg,.png,.mp4,.m4v,.mov' multiple
            value = {value}
          />
        )
    }
  })
  return formFields
}

const fieldStyle = {
  width: '100%',
  padding: 10,
  marginBottom: '20px',
  border: '2px solid #eeeeee',
  fontFamily: 'Roboto',
  fontSize: '1em',
  fontWeight: 200
}

const fileUploadStyle = {
  fontFamily: 'Roboto',
  fontSize: '1em',
  fontWeight: 200
}