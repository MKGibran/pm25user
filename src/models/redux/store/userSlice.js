import { createSlice } from '@reduxjs/toolkit'

const initialStateUser = {
  current_user: {},
  token: '',
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialStateUser,
  reducers: {
    setUserData(state, action) {
      return { ...state, ...action.payload }
    },
    setToken(state, action) {
      return { ...state, ...action.payload }
    },
    logout(state) {},
  },
})

export default userSlice
