/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
  CButtonGroup,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLocationPin } from '@coreui/icons'
import WFormSelect from '../widgets/WFormSelect'
import InformationApi from '../../models/api/information'
import PmValueIndicator from 'src/views/widgets/WPmValueIndicator'
import regionApi from '../../models/api/region'

export default function FireData(props) {
  const user = props.user.user.village_code
  const region = props.user.region
  const { register, control, handleSubmit } = useForm()
  const [regionSelected, setRegionSelected] = useState({
    province: null,
    district: null,
  })
  const [visible, setVisible] = useState(false)
  const [valuePM, setValuePM] = useState([])
  const [valueHotspot, setValueHotspot] = useState([])
  const [valueSmoke, setValueSmoke] = useState([])
  const [valueVillage, setValueVillage] = useState([])
  const [valueDistrict, setValueDistrict] = useState([])
  const [pmSeverity, setPmSeverity] = useState([])
  const [valueProvince, setValueProvince] = useState([])
  const [provinceData, setProvinceData] = useState([{}])
  const [citiesData, setCitiesData] = useState([{}])
  const [districtData, setDistrictData] = useState([{}])
  const [villageData, setVillageData] = useState([{}])

  const fetchInformationData = (data) => {
    InformationApi.getDataInformation(data)
      .then((response) => {
        return response.data
      })
      .then((data) => {
        setValuePM(data.particulate_matter)
        setValueHotspot(data.hotspot)
        setValueSmoke(data.smoke)
        setValueVillage(region.village)
        setValueDistrict(region.district)
        setValueProvince(region.province)
        if (data.particulate_matter.value > 300) {
          data.pmSeverity = { value: 'very-dangerous' }
          setPmSeverity(data.pmSeverity)
        } else if (data.particulate_matter.value > 200) {
          data.pmSeverity = { value: 'dangerous' }
          setPmSeverity(data.pmSeverity)
        } else if (data.particulate_matter.value > 100) {
          data.pmSeverity = { value: 'severe' }
          setPmSeverity(data.pmSeverity)
        } else if (data.particulate_matter.value > 50) {
          data.pmSeverity = { value: 'abnormal' }
          setPmSeverity(data.pmSeverity)
        } else if (data.particulate_matter.value > 0) {
          data.pmSeverity = { value: 'normal' }
          setPmSeverity(data.pmSeverity)
        }
      })
  }

  useEffect(() => {
    regionApi.getProvinces().then((res) => setProvinceData(res))
  }, [])
  useEffect(() => {
    console.log(regionSelected)
  }, [regionSelected])
  useEffect(() => {
    fetchInformationData(user)
  }, [])

  const onSubmit = (data) => {
    setVisible(false)
    InformationApi.getDataInformation(data.village_code)
      .then((response) => {
        return response.data
      })
      .then((data) => {
        if (data.particulate_matter === null) {
          data.particulate_matter = { value: '-' }
          data.hotspot = { value: '-' }
          data.smoke = { value: '-' }
          data.pmSeverity = { value: 'normal' }
          setValuePM(data.particulate_matter)
          setValueHotspot(data.hotspot)
          setValueSmoke(data.smoke)
          setPmSeverity(data.pmSeverity)
        } else {
          setValuePM(data.particulate_matter)
          setValueHotspot(data.hotspot)
          setValueSmoke(data.smoke)
          if (data.particulate_matter.value > 300) {
            data.pmSeverity = { value: 'very-dangerous' }
            setPmSeverity(data.pmSeverity)
          } else if (data.particulate_matter.value > 200) {
            data.pmSeverity = { value: 'dangerous' }
            setPmSeverity(data.pmSeverity)
          } else if (data.particulate_matter.value > 100) {
            data.pmSeverity = { value: 'severe' }
            setPmSeverity(data.pmSeverity)
          } else if (data.particulate_matter.value > 50) {
            data.pmSeverity = { value: 'abnormal' }
            setPmSeverity(data.pmSeverity)
          } else if (data.particulate_matter.value > 0) {
            data.pmSeverity = { value: 'normal' }
            setPmSeverity(data.pmSeverity)
          }
        }
      })
    regionApi
      .getVillage(data.village_code)
      .then((response) => {
        return response
      })
      .then((data) => {
        const region = data
        console.log(region)
        setValueVillage(region.village)
        setValueDistrict(region.district)
        setValueProvince(region.province)
      })
  }
  return (
    <div>
      <CCard style={{ marginBottom: '2%' }}>
        <CContainer>
          <CCardBody style={{ textAlign: 'center' }}>
            <h4>Fire Data</h4>
          </CCardBody>
        </CContainer>
      </CCard>

      <CContainer style={{ marginBottom: '1%' }}>
        <CRow>
          <CCol>
            <p>
              <CIcon icon={cilLocationPin} size="sm" style={{ marginRight: '1%' }} />
              {valueVillage.name}, {valueDistrict.name}, {valueProvince.name}
            </p>
          </CCol>
          <CCol>
            <CButton
              color="success"
              style={{ color: '#fff', float: 'right' }}
              onClick={() => setVisible(!visible)}
            >
              Change location
            </CButton>
            <CModal visible={visible} onClose={() => setVisible(false)}>
              <CModalHeader onClose={() => setVisible(false)}>
                <CModalTitle>Change location</CModalTitle>
              </CModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
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
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisible(false)}>
                    Close
                  </CButton>
                  <CButton color="primary" className="text-light" type="submit">
                    Submit
                  </CButton>
                </CModalFooter>
              </form>
            </CModal>
          </CCol>
        </CRow>
      </CContainer>

      <CContainer>
        <CRow xs={{ gutterX: 5 }}>
          <CCol>
            <CRow>
              <CCard style={{ marginBottom: '2%', textAlign: 'center' }}>
                <CContainer>
                  <CCardBody>
                    <h5>The current air pollution level in your commune is</h5>
                    <p>
                      Nilai partikel PM 2.5 <br />
                      (g/m2)
                    </p>
                    <PmValueIndicator
                      value={valuePM.value}
                      severity={pmSeverity.value}
                      className={`my-5`}
                    />
                    <CButtonGroup role="group" aria-label="Basic example" className="mt-4">
                      <CButton color="success"></CButton>
                      <CButton color="warning"></CButton>
                      <CButton color="danger"></CButton>
                    </CButtonGroup>
                  </CCardBody>
                </CContainer>
              </CCard>
            </CRow>
          </CCol>
          <CCol>
            <CRow>
              <CCard
                style={{
                  marginBottom: '2%',
                  textAlign: 'center',
                }}
              >
                <CContainer>
                  <CCardBody>
                    <h5>The current number of hotspot in your commune is</h5>
                    <PmValueIndicator
                      value={valueHotspot.value}
                      severity={'normal'}
                      className={`my-5`}
                    />
                  </CCardBody>
                </CContainer>
              </CCard>
            </CRow>
            <CRow>
              <CCard style={{ marginBottom: '2%', textAlign: 'center' }}>
                <CContainer>
                  <CCardBody>
                    <h5>The current carbon monoxide level in your commune is</h5>
                    <PmValueIndicator
                      value={valueSmoke.value}
                      severity={'normal'}
                      className={`my-5`}
                    />
                  </CCardBody>
                </CContainer>
              </CCard>
            </CRow>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
