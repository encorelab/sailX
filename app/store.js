import { createStore, applyMiddleware } from 'redux'

import reducers from './reducers'

const store = (init) => createStore(reducers, init,
  window.devToolsExtension ? window.devToolsExtension() : undefined
)

export default store

