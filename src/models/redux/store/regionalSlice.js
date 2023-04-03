import { createSlice } from '@reduxjs/toolkit'

const initialStateRegionalData = {
  province: [],
  city: [],
  district: [],
  village: [],
}

const regionalSlice = createSlice({
  name: 'regional',
  initialState: initialStateRegionalData,
  reducers: {
    setProvince(state, action) {
      return {
        ...initialStateRegionalData,
        province: [...action.payload],
      }
    },
    setCity(state, action) {
      return {
        ...state,
        city: [...action.payload],
        district: [],
        village: [],
      }
    },
    setDistrict(state, action) {
      return {
        ...state,
        district: [...action.payload],
        village: [],
      }
    },
    setVillage(state, action) {
      return {
        ...state,
        village: [...action.payload],
      }
    },
  },
})

export default regionalSlice
