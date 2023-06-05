import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useForm } from 'react-hook-form'
import loginApi from '../../models/api/login'
import { useDispatch } from 'react-redux'
import { userActions } from 'src/models/redux/actions/userActions'
import { globalUiActions } from 'src/models/redux/actions/globalUiActions'
import { Navigate } from 'react-router-dom'

export default function LogInPage() {
  const { register, handleSubmit } = useForm()
  const [visible, setVisible] = useState(false)
  const [authenticated, setauthenticated] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    if (authenticated) {
      return <Navigate replace to="/home" />
    } else {
      return <Navigate replace to="/login" />
    }
  }, [])

  const onSubmitForm = (data) => {
    loginApi.loginUser(data).then((res) => {
      console.log(res)
      dispatch(userActions.setUserData({ current_user: res.current_user }))
      dispatch(globalUiActions.setToastMessage(res.state))
      setauthenticated(authenticated)
    })
  }

  return (
    <div className="d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <form onSubmit={handleSubmit(onSubmitForm)}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="username"
                        type="text"
                        {...register('username')}
                        placeholder="Username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        {...register('password')}
                        placeholder="Password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          type="submit"
                          value="submit"
                          color="success"
                          className="px-4"
                          style={{
                            backgroundColor: 'rgb(130, 205, 71)',
                            color: '#fff',
                            border: 'none',
                          }}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </form>
                </CCardBody>
              </CCard>
              <CCard
                className="py-5"
                style={{
                  textAlign: 'justify',
                  backgroundColor: 'rgb(130, 205, 71)',
                  color: '#fff',
                  width: '44%',
                }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/sign-up">
                      <CButton
                        style={{
                          backgroundColor: '#fff',
                          color: '#000',
                          border: 'none',
                        }}
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
