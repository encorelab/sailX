import React from 'react';
import FRC from 'formsy-react-components'
import { notEmpty } from 'app/lib/utils'

export default (fields, toEdit, draftDoc) => {
  let draft
  if(notEmpty(toEdit)) { 
    draft = toEdit
  } else if(draftDoc && draftDoc.doc) {
    draft = draftDoc.doc
  }

  const formFields = fields.map( e => {
    const { id, ...rest } = e
    const value = draft ? draft[id] : ''

    switch (e.kind) {
      case 'INPUT':
        return (
          <FRC.Input
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
          name = {id}
          id = {id}
          key = {id}
          value = {value}
          {...rest}
          />
      )
      case 'FILE':
        return (
          <FRC.File
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
