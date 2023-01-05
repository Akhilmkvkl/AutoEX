import React from 'react'
import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './Reducers/Index'
import {Provider} from 'react-redux'

const store = configureStore({ reducer:rootReducer} )

function DataProvider({children}) {
  return (
    <Provider store={store}>
            {children}
    </Provider>
  )
}

export default DataProvider;