import {
  CBreadcrumb,
  CBreadcrumbItem,
  CButton,
  CCol,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import loginAPI from 'src/models/api/login'
import { globalUiActions } from 'src/models/redux/actions/globalUiActions'

const StepEnterUname = ({ register }) => (
  <>
    Silakan masukan username/e-mail Anda
    <CRow>
      <CCol>
        <CFormInput
          name="uname-email"
          {...register('email_or_uname')}
          className="mb-2"
          placeholder="Username/E-mail Anda"
        />
      </CCol>
    </CRow>
  </>
)

const StepEnterOtp = ({ register }) => (
  <>
    Silakan masukkan OTP yang Anda terima di e-mail Anda
    <CRow>
      <CCol>
        <CFormInput name="otp" {...register('otp')} className="mb-2" placeholder="Kode OTP" />
      </CCol>
    </CRow>
  </>
)
const StepEnterPassword = ({ register }) => (
  <>
    Silakan masukkan password baru Anda
    <CRow>
      <CCol>
        <CFormInput
          name="password"
          {...register('password')}
          className="mb-2"
          placeholder="Kata sandi baru"
          type="password"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <CFormInput
          name="password_confirmation"
          {...register('password_confirmation')}
          className="mb-2"
          placeholder="Ulang kata sandi baru"
          type="password"
        />
      </CCol>
    </CRow>
  </>
)

export default function ForgotPassword({ visible, setVisible }) {
  const { register, handleSubmit } = useForm()
  const [currStep, setCurrStep] = useState(0)
  const [userId, setUserId] = useState(0)
  const [tokenUser, setTokenUser] = useState('')
  const [otpId, setOtpId] = useState(0)
  const dispatch = useDispatch()

  const onSubmitStepOne = (data) => {
    console.log(data)
    loginAPI.forgotPassword({ email_or_uname: data?.email_or_uname }).then((res) => {
      if (res.status === 'success') {
        setUserId(res.userId)
        console.log(res)
        setCurrStep(1)
      }
      dispatch(globalUiActions.setToastMessage(res.data))
    })
  }

  const onSubmitStepTwo = (data) => {
    console.log(data)
    loginAPI.forgotPasswordOtp({ user_id: userId, otp: data.otp }).then((res) => {
      if (res.status === 'success') {
        setTokenUser(res.tokenUser)
        setOtpId(res.otp_id)
        console.log(res)
        setCurrStep(2)
      }
      dispatch(globalUiActions.setToastMessage(res.data))
    })
  }

  const onSubmitStepThree = (data) => {
    console.log(data)
    loginAPI
      .forgotPasswordSubmit({
        otp_id: otpId,
        token: tokenUser,
        password: data.password,
        password_confirmation: data.password_confirmation,
      })
      .then((res) => {
        if (res.status === 'success') {
          console.log(res)
          setVisible(false)
          setCurrStep(0)
        }
        dispatch(globalUiActions.setToastMessage(res.data))
      })
  }

  return (
    <CModal visible={visible} onClose={() => setVisible(false)} alignment="center">
      <CModalHeader>
        <CModalTitle>Lupa Kata Sandi</CModalTitle>
      </CModalHeader>
      <form
        onSubmit={handleSubmit(
          currStep === 0 ? onSubmitStepOne : currStep === 1 ? onSubmitStepTwo : onSubmitStepThree,
        )}
      >
        <CModalBody>
          <CBreadcrumb style={{ '--cui-breadcrumb-divider': "'>'" }}>
            {['Masukan username/e-mail', 'Masukan OTP', 'Masukkan kata sandi baru'].map(
              (item, index) => (
                <CBreadcrumbItem
                  active={currStep === index}
                  style={{ '--cui-breadcrumb-item-active-color': '#8C8154' }}
                  key={index}
                >
                  {item}
                </CBreadcrumbItem>
              ),
            )}
          </CBreadcrumb>
          {currStep === 0 ? <StepEnterUname register={register} /> : <></>}
          {currStep === 1 ? <StepEnterOtp register={register} /> : <></>}
          {currStep === 2 ? <StepEnterPassword register={register} /> : <></>}
        </CModalBody>
        <CModalFooter>
          <CButton type="submit" value="submit" color="primary" style={{ color: 'fff' }}>
            Selanjutnya
          </CButton>
        </CModalFooter>
      </form>
    </CModal>
  )
}
