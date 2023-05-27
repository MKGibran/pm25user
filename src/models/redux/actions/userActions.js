import userSlice from '../store/userSlice'
import loginAPI from '../../api/login'
// import { setSnackbar } from './uiStateActions'
import Cookies from 'js-cookie'
import { TOKEN_NAME } from '../../api/config'

export const userActions = userSlice.actions

export const loginActions = (userInput) => {
  return async (dispatch) => {
    await loginAPI.loginUser(userInput).then((res) => {
      // dispatch(setSnackbar(res.data));
      if (res.data.severity !== 'error') {
        if (userInput.save_ca) Cookies.set(TOKEN_NAME, res.token)
        else Cookies.set(TOKEN_NAME, res.token, { expires: 1 })
        // else dispatch(userActions.setToken({ token: res.token }));
        dispatch(userActions.setUserData({ current_user: res.current_user }))
      }
    })
  }
}
