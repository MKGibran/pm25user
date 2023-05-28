import { createSlice } from '@reduxjs/toolkit'

export const initialStateGlobalUi = {
  toast: {
    open: false,
    message: '',
    severity: '',
  },
}

const globalUiSlice = createSlice({
  name: 'globalUi',
  initialState: initialStateGlobalUi,
  reducers: {
    setToastMessage(state, action) {
      return {
        ...state,
        toast: {
          open: action.payload?.open,
          message: action.payload?.message,
          severity: action.payload?.severity,
        },
      }
    },
  },
})

export default globalUiSlice
