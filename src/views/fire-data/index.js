import { cilLocationPin } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react"
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { default as PmValueIndicator, default as SmokeValueIndicator } from "src/views/widgets/WPmValueIndicator"
import InformationApi from '../../models/api/information'
import regionApi from '../../models/api/region'
import WFormSelect from '../widgets/WFormSelect'

export default function FireData(props) {
  // const user = props.user.user.village_code
  const user = useSelector((state) => state.user.current_user.village_code)

  const { control, handleSubmit } = useForm()
  const [regionSelected] = useState({
    province: null,
    district: null,
  })
  const [visible, setVisible] = useState(false)
  const [valuePM, setValuePM] = useState([])
  const [lowValueHotspot, setLowValueHotspot] = useState([])
  const [mediumValueHotspot, setMediumValueHotspot] = useState([])
  const [highValueHotspot, setHighValueHotspot] = useState([])
  const [valueSmoke, setValueSmoke] = useState([])
  const [valueVillage, setValueVillage] = useState([])
  const [valueDistrict, setValueDistrict] = useState([])
  const [pmSeverity, setPmSeverity] = useState([])
  const [smokeSeverity, setSmokeSeverity] = useState([])
  // const [hotspotSeverity, setHotspotSeverity] = useState([])
  const [valueProvince, setValueProvince] = useState([])
  const [region] = useState([])
  const [provinceData, setProvinceData] = useState([{}])
  const [citiesData, setCitiesData] = useState([{}])
  const [districtData, setDistrictData] = useState([{}])
  const [villageData, setVillageData] = useState([{}])

  const fetchInformationData = (user, region) => {
    console.log("Test")
    console.log(props)
    InformationApi.getDataInformation(user).then((response) => {
      if (response.data === null) {
        setValuePM({ value: "-" })
        setLowValueHotspot({ value: "-" })
        setMediumValueHotspot({ value: "-" })
        setHighValueHotspot({ value: "-" })
        setValueSmoke({ value: "-" })
        setPmSeverity({ value: "normal" })
        setSmokeSeverity({ value: "normal" })
        // setHotspotSeverity({ value: "normal" })
      } else {
        if (response.data.hotspot === null) {
          setLowValueHotspot({ value: "-" })
          setMediumValueHotspot({ value: "-" })
          setHighValueHotspot({ value: "-" })
          // setHotspotSeverity({ value: "normal" })
        } else {
          setLowValueHotspot(response.data.hotspot.low_confidence_hotspot)
          setMediumValueHotspot(response.data.hotspot.medium_confidence_hotspot)
          setHighValueHotspot(response.data.hotspot.high_confidence_hotspot)
        }
        setValuePM(response.data.particulate_matter)
        setValueSmoke(response.data.smoke)
        // PM
        if (response.data.particulate_matter.value <= 10) {
          setPmSeverity({ value: "normal" })
        } else if (response.data.particulate_matter.value <= 25) {
          setPmSeverity({ value: "abnormal" })
        } else if (response.data.particulate_matter.value <= 50) {
          setPmSeverity({ value: "severe" })
        } else if (response.data.particulate_matter.value <= 75) {
          setPmSeverity({ value: "dangerous" })
        } else if (response.data.particulate_matter.value > 75) {
          setPmSeverity({ value: "very-dangerous" })
        }
        // Smoke
        if (response.data.smoke.value <= 4400) {
          setSmokeSeverity({ value: "normal" })
        } else if (response.data.smoke.value <= 9400) {
          setSmokeSeverity({ value: "abnormal" })
        } else if (response.data.smoke.value <= 12400) {
          setSmokeSeverity({ value: "severe" })
        } else if (response.data.smoke.value <= 15400) {
          setSmokeSeverity({ value: "dangerous" })
        } else if (response.data.smoke.value > 15400) {
          setSmokeSeverity({ value: "very-dangerous" })
        }
      }
    })
  }

  useEffect(() => {
    if (user) fetchInformationData(user, region)
    regionApi.getProvinces().then((res) => setProvinceData(res))
  }, [])

  useEffect(() => {}, [regionSelected])

  const onSubmit = (data) => {
    setVisible(false)
    InformationApi.getDataInformation(data.village_code).then((response) => {
      if (response.data.particulate_matter === null) {
        setValuePM({ value: "-" })
        setLowValueHotspot({ value: "-" })
        setMediumValueHotspot({ value: "-" })
        setHighValueHotspot({ value: "-" })
        setValueSmoke({ value: "-" })
        setPmSeverity({ value: "normal" })
        setSmokeSeverity({ value: "normal" })
        // setHotspotSeverity({ value: "normal" })
      } else {
        if (response.data.hotspot === null) {
          setLowValueHotspot({ value: "-" })
          setMediumValueHotspot({ value: "-" })
          setHighValueHotspot({ value: "-" })
          // setHotspotSeverity({ value: "normal" })
        } else {
          setLowValueHotspot(response.data.hotspot.low_confidence_hotspot)
          setMediumValueHotspot(response.data.hotspot.medium_confidence_hotspot)
          setHighValueHotspot(response.data.hotspot.high_confidence_hotspot)
        }
        setValuePM(response.data.particulate_matter)
        setValueSmoke(response.data.smoke)
        // PM
        if (response.data.particulate_matter.value <= 10) {
          setPmSeverity({ value: "normal" })
        } else if (response.data.particulate_matter.value <= 25) {
          setPmSeverity({ value: "abnormal" })
        } else if (response.data.particulate_matter.value <= 50) {
          setPmSeverity({ value: "severe" })
        } else if (response.data.particulate_matter.value <= 75) {
          setPmSeverity({ value: "dangerous" })
        } else if (response.data.particulate_matter.value > 75) {
          setPmSeverity({ value: "very-dangerous" })
        }
        // Smoke
        if (response.data.smoke.value <= 4400) {
          setSmokeSeverity({ value: "normal" })
        } else if (response.data.smoke.value <= 9400) {
          setSmokeSeverity({ value: "abnormal" })
        } else if (response.data.smoke.value <= 12400) {
          setSmokeSeverity({ value: "severe" })
        } else if (response.data.smoke.value <= 15400) {
          setSmokeSeverity({ value: "dangerous" })
        } else if (response.data.smoke.value > 15400) {
          setSmokeSeverity({ value: "very-dangerous" })
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
        setValueVillage(region.village)
        setValueDistrict(region.district)
        setValueProvince(region.province)
      })
  }
  return (
    <div>
      <CRow>
        <h4>Fire Data</h4>
      </CRow>

      {user ? (
        <>
          <CContainer className="border-light mt-4 mb-2">
            <CRow>
              <CCol>
                <p style={{ fontSize: "10pt" }} className={"text-secondary my-auto"}>
                  <CIcon icon={cilLocationPin} size="sm" style={{ marginRight: "1%" }} />
                  {valueVillage.name}, {valueDistrict.name}, {valueProvince.name}
                </p>
              </CCol>
              <CCol>
                <CButton color="success" style={{ color: "#fff", float: "right" }} onClick={() => setVisible(!visible)}>
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

          <CRow>
            {/* PM */}
            <CCol>
              <CCard style={{ marginBottom: "2%" }} className={"border-light"}>
                <CContainer>
                  <h5 className={"m-3"}>Air Pollution</h5>
                  <CCardBody>
                    <CRow>
                      <CCol style={{ textAlign: "center" }}>
                        <CRow className={"mb-4"}>
                          <PmValueIndicator value={valuePM.value} severity={pmSeverity.value} />
                        </CRow>
                        <CRow>
                          <p>PM 2.5 (g/m3)</p>
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CContainer>
              </CCard>
            </CCol>
            {/* Smoke */}
            <CCol>
              <CCard style={{ marginBottom: "2%" }} className={"border-light"}>
                <CContainer>
                  <h5 className={"m-3"}>Smoke</h5>
                  <CCardBody>
                    <CRow>
                      <CCol style={{ textAlign: "center" }}>
                        <CRow className={"mb-4"}>
                          <SmokeValueIndicator value={valueSmoke.value} severity={smokeSeverity.value} />
                        </CRow>
                        <CRow>
                          <p>Carbon monoxide level</p>
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CContainer>
              </CCard>
            </CCol>
            {/* Hotspot */}
            <CCol>
              <CCard style={{ marginBottom: "2%" }} className={"border-light"}>
                <CContainer>
                  <h5 className={"m-3"}>Hotspot</h5>
                  <CCardBody>
                    <CRow className={""}>
                      <CCol style={{ textAlign: "center" }} className={"mx-3"}>
                        <button
                          className={"btn btn-success rounded-pill p-3 text-white text-bold mb-2"}
                          shape="rounded-pill"
                        >
                          {lowValueHotspot.value}
                        </button>
                        <p style={{ fontSize: "10pt" }} className={"text-secondary"}>
                          Low
                        </p>
                      </CCol>
                      <CCol style={{ textAlign: "center" }} className={"mx-3"}>
                        <button
                          className={"btn btn-warning rounded-pill p-3 text-white text-bold mb-2"}
                          shape="rounded-pill"
                        >
                          {mediumValueHotspot.value}
                        </button>
                        <p style={{ fontSize: "10pt" }} className={"text-secondary"}>
                          Medium
                        </p>
                      </CCol>
                      <CCol style={{ textAlign: "center" }} className={"mx-3"}>
                        <button
                          className={"btn btn-danger rounded-pill p-3 text-white text-bold mb-2"}
                          shape="rounded-pill"
                        >
                          {highValueHotspot.value}
                        </button>
                        <p style={{ fontSize: "10pt" }} className={"text-secondary"}>
                          High
                        </p>
                      </CCol>
                    </CRow>
                    {/* <CRow>
                      <CCol style={{ textAlign: "center" }}>
                        <CRow className={"mb-4"}>
                          <HotspotValueIndicator value={valueHotspot.value} severity={hotspotSeverity.value} />
                        </CRow>
                        <CRow>
                          <p>Hotspot Level</p>
                        </CRow>
                      </CCol>
                    </CRow> */}
                  </CCardBody>
                </CContainer>
              </CCard>
            </CCol>
          </CRow>

          {/* <CContainer>
            <CRow xs={{ gutterX: 5 }}>
              <CCol>
                <CRow>
                  <CCard style={{ marginBottom: "2%", textAlign: "center" }}>
                    <CContainer>
                      <CCardBody>
                        <h5>The current air pollution level in your commune is</h5>
                        <p>
                          Nilai partikel PM 2.5 <br />
                          (g/m2)
                        </p>
                        <PmValueIndicator value={valuePM.value} severity={pmSeverity.value} className={"my-5"} />
                        <CButtonGroup role="group" aria-label="Basic example" className="mt-4">
                          <CButton color="success"></CButton>
                          <CButton color="warning"></CButton>
                          <CButton color="danger"></CButton>
                          <CButton color="dark"></CButton>
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
                      marginBottom: "2%",
                      textAlign: "center",
                    }}
                  >
                    <CContainer>
                      <CCardBody>
                        <h5>The current number of hotspot in your commune is</h5>
                        <PmValueIndicator
                          value={valueHotspot.value}
                          severity={hotspotSeverity.value}
                          className={"my-5"}
                        />
                      </CCardBody>
                    </CContainer>
                  </CCard>
                </CRow>
                <CRow>
                  <CCard style={{ marginBottom: "2%", textAlign: "center" }}>
                    <CContainer>
                      <CCardBody>
                        <h5>The current carbon monoxide level in your commune is</h5>
                        <PmValueIndicator value={valueSmoke.value} severity={smokeSeverity.value} className={"my-5"} />
                      </CCardBody>
                    </CContainer>
                  </CCard>
                </CRow>
              </CCol>
            </CRow>
          </CContainer> */}
        </>
      ) : (
        <span className={"text-secondary mb-0"}>Couldn&apos;t detect currect location. Please login first!</span>
      )}
    </div>
  )
}
