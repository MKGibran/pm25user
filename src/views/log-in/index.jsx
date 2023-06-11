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

export default function LogInPage() {
  const { register, handleSubmit } = useForm()
  // const [authenticated, setauthenticated] = useState(null)
  const dispatch = useDispatch()
  const onSubmitForm = (data) => {
    loginApi.loginUser(data).then((res) => {
      dispatch(userActions.setUserData({ current_user: res.current_user, token: res.token }))
      dispatch(globalUiActions.setToastMessage(res.state))
    })
  }

  return (
    <div className="d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
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
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                      <CCol xs={6}>
                        <CButton
                          type="submit"
                          value="submit"
                          color="success"
                          className="px-4 float-end"
                          style={{
                            backgroundColor: 'rgb(130, 205, 71)',
                            color: '#fff',
                            border: 'none',
                          }}
                        >
                          Login
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
                  <div className="my-5">
                    <h2>Sign up</h2>
                    <p className="mt-3">Don&apos;t have an account?</p>
                    <Link to="/sign-up">
                      <CButton
                        style={{
                          backgroundColor: '#fff',
                          color: '#000',
                          border: 'none',
                        }}
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
