import { uuid, currentDate } from '../lib/utils'
import React from 'react'

export default (state, action) => {
  switch (action.type) {
    case 'STORE-DRAFT':
      const draft = {
          type: 'draft',
          id: uuid(),
          text: action.doc,
          created_at: currentDate}
      return [
        ...state.filter(e => e.type != 'draft'),
        draft
      ]

    case 'DISCARD-DRAFT':
      return state.filter(e => e.type != 'draft')

    default:
      return state
  }
}
