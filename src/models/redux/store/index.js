import { combineReducers, configureStore } from '@reduxjs/toolkit'
import regionalSlice from './regionalSlice'
import { devToolsEnhancer } from '@redux-devtools/extension'

const combinedReducer = combineReducers({
  regional: regionalSlice.reducer,
})

export const store = configureStore({
  reducer: combinedReducer,
  // TODO: change dev tools when up to staging
  devTools: true,
  enhancers: [devToolsEnhancer()],
})

export default store
