import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { devToolsEnhancer } from '@redux-devtools/extension'
import regionalSlice from './regionalSlice'
import userSlice from './userSlice'
import globalUiSlice from './globalUiSlice'

const combinedReducer = combineReducers({
  regional: regionalSlice.reducer,
  user: userSlice.reducer,
  globalUi: globalUiSlice.reducer,
})

const reducerProxy = (state, action) => {
  if (action.type === 'user/LOGOUT') {
    return combinedReducer({ globalUi: state.globalUi }, action)
  }
  return combinedReducer(state, action)
}

export const store = configureStore({
  reducer: reducerProxy,
  // TODO: change dev tools when up to staging
  devTools: true,
  enhancers: [devToolsEnhancer()],
})

export default store
