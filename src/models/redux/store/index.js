import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { devToolsEnhancer } from '@redux-devtools/extension'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import regionalSlice from './regionalSlice'
import userSlice from './userSlice'
import globalUiSlice from './globalUiSlice'

const combinedReducer = combineReducers({
  regional: regionalSlice.reducer,
  user: userSlice.reducer,
  globalUi: globalUiSlice.reducer,
})

export const store = configureStore({
  reducer: combinedReducer,
  // TODO: change dev tools when up to staging
  devTools: true,
  enhancers: [devToolsEnhancer()],
})

export default store
