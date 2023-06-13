import {
  CButton,
  CCard,
  CCardBody,
  CFormInput,
  CFormSelect,
  CContainer,
  CCardHeader,
  CRow,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import WFormSelect from '../widgets/WFormSelect'
import regionApi from '../../models/api/region'
import signUpApi from '../../models/api/sign-up'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import SignUpOTPPopup from './SignUpOTPPopup'
import { useDispatch } from 'react-redux'
import { globalUiActions } from 'src/models/redux/actions/globalUiActions'

export default function SignUpPage() {
  const { register, control, handleSubmit } = useForm()

  const [regionSelected, setRegionSelected] = useState({
    province: null,
    district: null,
  })
  const [visible, setVisible] = useState(false)
  const [userId, setUserId] = useState(0)

  const dispatch = useDispatch()

  const [provinceData, setProvinceData] = useState([{}])
  const [citiesData, setCitiesData] = useState([{}])
  const [districtData, setDistrictData] = useState([{}])
  const [villageData, setVillageData] = useState([{}])

  useEffect(() => {
    regionApi.getProvinces().then((res) => setProvinceData(res))
  }, [])

  useEffect(() => {
    console.log(regionSelected)
  }, [regionSelected])

  const onSubmit = (data) => {
    signUpApi
      .signUp(data)
      .then((res) => {
        if (res.status === 'success') {
          console.log(res)
          setVisible(true)
          setUserId(res.data)
        }
        dispatch(globalUiActions.setToastMessage(res.state))
      })
      .catch((err) => {
        console.log(err)
        dispatch(globalUiActions.setToastMessage(err.state))
      })
  }

  return (
    <>
      {visible && userId > 0 ? (
        <SignUpOTPPopup visible={visible} setVisible={setVisible} data={userId} />
      ) : (
        <></>
      )}

      {/* <CCard style={{ marginBottom: '2%' }}>
        <CContainer>
          <CCardBody style={{ textAlign: 'center' }}>
            <h4>The fire safety database is here to help you protect Indonesia</h4>
          </CCardBody>
        </CContainer>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      </CCard> */}
      <div className="d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <CRow>
                      <CCol>
                        <CFormInput
                          name="full_name"
                          {...register('full_name')}
                          className="mb-2"
                          placeholder="Name"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CFormInput
                          name="job_title"
                          {...register('job_title')}
                          className="mb-2"
                          placeholder="Job Title"
                        />
                      </CCol>
                      <CCol>
                        <CFormInput
                          name="organization"
                          {...register('organization')}
                          className="mb-2"
                          placeholder="Organization"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CFormInput
                          name="date_of_birth"
                          type="date"
                          {...register('date_of_birth')}
                          className="mb-2"
                          placeholder="Date of Birth"
                        />
                      </CCol>
                      <CCol>
                        <CFormSelect
                          name="gender"
                          {...register('gender')}
                          className="mb-2"
                          placeholder="Gender"
                        >
                          <option>Gender</option>
                          <option value="Laki-Laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CFormInput
                      name="email"
                      type="email"
                      {...register('email')}
                      className="mb-2"
                      placeholder="Email"
                    />
                    <CFormInput
                      name="phone"
                      type="text"
                      {...register('phone')}
                      className="mb-2"
                      placeholder="Phone"
                    />
                    <CRow>
                      <CCol>
                        <Controller
                          control={control}
                          name="province"
                          render={({ field: { onChange, value, ref } }) => (
                            <WFormSelect
                              label="Province"
                              inputRef={ref}
                              data={provinceData}
                              value={value}
                              onChange={(e) => {
                                onChange(e)
                                regionApi
                                  .getCities(e.target.value)
                                  .then((res) => setCitiesData(res))
                              }}
                              className="mb-2"
                            />
                          )}
                        />
                      </CCol>
                      <CCol>
                        <Controller
                          control={control}
                          name="cities"
                          render={({ field: { onChange, value, ref } }) => (
                            <WFormSelect
                              label="Cities"
                              inputRef={ref}
                              data={citiesData}
                              value={value}
                              onChange={(e) => {
                                onChange(e)
                                regionApi
                                  .getDistricts(e.target.value)
                                  .then((res) => setDistrictData(res))
                              }}
                              className="mb-2"
                            />
                          )}
                        />
                      </CCol>
                      <CCol>
                        <Controller
                          control={control}
                          name="district"
                          render={({ field: { onChange, value, ref } }) => (
                            <WFormSelect
                              label="District"
                              inputRef={ref}
                              data={districtData}
                              value={value}
                              onChange={(e) => {
                                onChange(e)
                                regionApi
                                  .getVillages(e.target.value)
                                  .then((res) => setVillageData(res))
                              }}
                              className="mb-2"
                            />
                          )}
                        />
                      </CCol>
                      <CCol>
                        <Controller
                          control={control}
                          name="village_code"
                          render={({ field: { onChange, value, ref } }) => (
                            <WFormSelect
                              label="Village"
                              inputRef={ref}
                              data={villageData}
                              value={value}
                              onChange={onChange}
                              className="mb-2"
                            />
                          )}
                        />
                      </CCol>
                    </CRow>
                    <CFormInput
                      name="username"
                      type="text"
                      {...register('username')}
                      className="mb-2"
                      placeholder="Username"
                    />
                    <CRow>
                      <CCol>
                        <CFormInput
                          name="password"
                          type="password"
                          {...register('password')}
                          className="mb-2"
                          placeholder="Password"
                        />
                      </CCol>
                      <CCol>
                        <CFormInput
                          name="password_confirmation"
                          type="password"
                          {...register('password_confirmation')}
                          className="mb-2"
                          placeholder="Password Confirmation"
                        />
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol>
                        <Link to="/log-in">Already have an account ? Login here !</Link>
                      </CCol>
                      <CCol>
                        <CButton
                          type="submit"
                          value="submit"
                          style={{ float: 'right', color: '#fff' }}
                        >
                          Register
                        </CButton>
                      </CCol>
                    </CRow>
                  </form>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}
