import React, { useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CRow,
  CCol,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react'
import { useForm } from 'react-hook-form'
import signUp from 'src/models/api/sign-up'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { globalUiActions } from 'src/models/redux/actions/globalUiActions'

export default function SignUpOTPPopup({ visible, setVisible, data }) {
  const { register, control, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const navigator = useNavigate()

  useEffect(() => {
    setValue('user_id', data)
  }, [data])

  const onSubmit = (data) => {
    signUp
      .checkOtp(data)
      .then((res) => {
        console.log('data', data)
        dispatch(globalUiActions.setToastMessage(res.state))
        if (res.status === 'success') {
          setVisible(false)
          navigator('/log-in', { replace: true })
        }
      })
      .catch((err) => {
        dispatch(globalUiActions.setToastMessage(err.state))
      })
  }

  const onSubmitResentOtp = () => {
    signUp
      .resentOtp({
        user_id: getValues('user_id'),
      })
      .then((res) => {
        if (res.status === 'success') {
          console.log(res.state)
          dispatch(globalUiActions.setToastMessage(res.state))
        }
      })
      .catch((err) => {
        dispatch(globalUiActions.setToastMessage(err.state))
      })
  }

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Registrasi berhasil</CModalTitle>
      </CModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CModalBody>
          Silahkan masukan OTP yang dikirimkan ke email untuk memverifikasi akun anda
          <CRow>
            <CCol>
              <CFormInput name="OTP" {...register('otp')} className="mb-2" placeholder="OTP" />
              <a onClick={onSubmitResentOtp}>Resent OTP</a>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton type="submit" value="submit" color="primary">
            Save changes
          </CButton>
        </CModalFooter>
      </form>
    </CModal>
  )
}
