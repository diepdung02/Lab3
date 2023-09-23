import React, { createContext, useReducer, useContext } from 'react'
import { node } from 'prop-types'

const initialState = {
  isDarkModeOn: false,
  test: {
    a: "sfs",
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        isDarkModeOn: action.payload,
      }
    default:
      return state
  }
}
const Store = createContext()
function StoreProvider({ children }) {
  return <Store.Provider value={useReducer(reducer, initialState)}>{children}</Store.Provider>
}

StoreProvider.propTypes = {
  children: node,
}
const useStateValue = () => useContext(Store)

export { initialState, Store, reducer, StoreProvider, useStateValue }
