import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { devToolsEnhancer } from '@redux-devtools/extension'
import regionalSlice from './regionalSlice'
import userSlice from './userSlice'

const combinedReducer = combineReducers({
  regional: regionalSlice.reducer,
  user: userSlice.reducer,
})

export const store = configureStore({
  reducer: combinedReducer,
  // TODO: change dev tools when up to staging
  devTools: true,
  enhancers: [devToolsEnhancer()],
})

export default store
