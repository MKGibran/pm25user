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
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import WFormSelect from '../widgets/WFormSelect'
import regionApi from '../../models/api/region'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export default function SignUpPage() {
  const { register, control, handleSubmit } = useForm()

  const [regionSelected, setRegionSelected] = useState({
    province: null,
    district: null,
  })
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
    console.log(data)
    alert('Data received!')
  }

  return (
    <>
      <CCard style={{ marginBottom: '2%' }}>
        <CContainer>
          <CCardBody style={{ textAlign: 'center' }}>
            <h4>The fire safety database is here to help you protect Indonesia</h4>
          </CCardBody>
        </CContainer>
      </CCard>
      <CCard>
        <CCardHeader>
          <h4>Sign Up</h4>
        </CCardHeader>
        <CCardBody className="p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CFormInput name="name" {...register('name')} className="mb-2" placeholder="Name" />
            <CFormInput
              name="job-title"
              {...register('job-title')}
              className="mb-2"
              placeholder="Job Title"
            />
            <CFormInput
              name="organization"
              {...register('organization')}
              className="mb-2"
              placeholder="Organization"
            />
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
                    regionApi.getCities(e.target.value).then((res) => setCitiesData(res))
                  }}
                  className="mb-2"
                />
              )}
            />
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
                    regionApi.getDistricts(e.target.value).then((res) => setDistrictData(res))
                  }}
                  className="mb-2"
                />
              )}
            />
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
                    regionApi.getVillages(e.target.value).then((res) => setVillageData(res))
                  }}
                  className="mb-2"
                />
              )}
            />
            <Controller
              control={control}
              name="village"
              render={({ field: { onChange, value, ref } }) => (
                <WFormSelect
                  label="Village"
                  inputRef={ref}
                  data={villageData}
                  value={value}
                  onChange={onChange}
                  className="mb-3"
                />
              )}
            />
            <CRow>
              <CCol>
                <Link to="/login">Already have an account ? Login here !</Link>
              </CCol>
              <CCol>
                <CButton type="submit" value="submit" style={{ float: 'right', color: '#fff' }}>
                  Register
                </CButton>
              </CCol>
            </CRow>
          </form>
        </CCardBody>
      </CCard>
    </>
  )
}
