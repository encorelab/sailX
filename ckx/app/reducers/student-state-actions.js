export const storeDraft = (draft) => ({
  type: 'ADD/STUDENTSTATE',
  doc: { draft }
})

export const discardDraft = () => ({
  type: 'DELETE/STUDENTSTATE',
  id: 'draft'
})

