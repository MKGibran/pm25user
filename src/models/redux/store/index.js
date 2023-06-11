import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { devToolsEnhancer } from '@redux-devtools/extension'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import regionalSlice from './regionalSlice'
import userSlice from './userSlice'
import globalUiSlice from './globalUiSlice'

const rootPersistConfig = {
  key: 'root',
  storage,
}

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

const persistedReducer = persistReducer(rootPersistConfig, reducerProxy)

export const store = configureStore({
  reducer: persistedReducer,
  // TODO: change dev tools when up to staging
  devTools: true,
  enhancers: [devToolsEnhancer()],
})
export const persistor = persistStore(store)

export default store
