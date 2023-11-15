/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { cilLocationPin } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CImage,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
} from "@coreui/react"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import isObjectEmpty from "src/utils/helper/checkObjIsEmpty"
import ToTitleCase from "src/utils/helper/toTitleCase"
import ipb from "../../assets/images/Logo IPB.png"
import ubi from "../../assets/images/Logo Udara Bersih Indonesia.jpeg"
import sea from "../../assets/images/Logo-RFMRC-SEA-Terbaru.png"
import ParticulateMatterApi from "../../models/api/particulate-matter"
import regionApi from "../../models/api/region"
import WFormSelect from "../widgets/WFormSelect"
import Chart from "./chart"
import Level from "./level"

const AirPollution = (props) => {
  const { register, control, handleSubmit } = useForm()
  const user = props?.user || {}
  const region = props?.user?.region || {}
  const [data, setData] = useState([])
  const [date, setDate] = useState([])
  const [value, setValue] = useState([])

  const getData = (formData) => {
    const endDate =
      dayjs(new Date()).format("YYYY-MM-DDThh:mm:ss") || dayjs(formData.endDate).format("YYYY-MM-DDThh:mm:ss")
    const startDate =
      dayjs("2022-09-26").subtract(14, "day").format("YYYY-MM-DDThh:mm:ss") ||
      dayjs(formData.startDate).format("YYYY-MM-DDThh:mm:ss")
    const villageCode = formData?.village_code || region?.village?.code
    ParticulateMatterApi.getDataPM({
      startDate: startDate,
      endDate: endDate,
      villageCode: villageCode ?? undefined,
      sortBy: "id",
      sortOrder: "desc",
    })
      .then((response) => response.data)
      .then((data) => {
        setData(data)
        const dates = []
        const values = []
        data?.forEach((data, index) => {
          dates.push(dayjs(data?.datetime).format("DD-MM-YYYY"))
          values.push(data?.value)
        })
        setDate(dates)
        setValue(values)
        setFetching(false)
      })
      .catch((error) => console.error(error))
  }

  const [provinceData, setProvinceData] = useState([{}])
  const [citiesData, setCitiesData] = useState([{}])
  const [districtData, setDistrictData] = useState([{}])
  const [villageData, setVillageData] = useState([{}])

  useEffect(() => {
    getData({})
    regionApi.getProvinces().then((res) => setProvinceData(res))
  }, [])
  const onSubmit = (formData) => {
    setFetching(true)
    getData(formData)
  }

  const [fetching, setFetching] = useState(false)

  return (
    <div>
      <CRow>
        <CCol className="col-8">
          <h4>Air Pollution</h4>
        </CCol>
        <CCol>
          <CRow>
            <CCol>
              <CImage fluid src={ipb} width={70} />
            </CCol>
            <CCol>
              <CImage fluid src={ubi} width={70} />
            </CCol>
            <CCol>
              <CImage fluid src={sea} width={70} />
            </CCol>
          </CRow>
        </CCol>
      </CRow>

      <CContainer style={{ marginBottom: "1%", fontSize: "10pt" }} className={"text-secondary mb-0"}>
        <CRow>
          <CCol>
            {!isObjectEmpty(region) ? (
              <p>
                <CIcon icon={cilLocationPin} size="sm" style={{ marginRight: "1%" }} />
                {region?.village?.name}, {region?.district?.name}, {region?.province?.name}
              </p>
            ) : (
              <p>Please login and/or select region</p>
            )}
          </CCol>
        </CRow>
      </CContainer>

      {isObjectEmpty(user.user) ? <></> : <Level user={user} />}

      <CCard style={{ marginBottom: "2%" }} className={"border-light"}>
        <CContainer>
          <h5 className={"m-3"}>Overview</h5>
          <CCardBody style={{ textAlign: "center" }}>
            <CRow className={"mb-5"}>
              <Chart dates={date} values={value} />
            </CRow>
          </CCardBody>
        </CContainer>
      </CCard>

      <CCard style={{ marginBottom: "2%" }} className={"border-light"}>
        <CContainer>
          <div className={"m-3"}>
            <h5>List Data</h5>
            <p className="text-secondary mb-0" style={{ fontSize: "10pt" }}>
              For last 14 days
            </p>
          </div>
          <CCardBody style={{ textAlign: "center" }}>
            <CRow>
              <CForm className="my-4" onSubmit={handleSubmit(onSubmit)}>
                <CRow>
                  <CCol>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="Province" className="col-sm-4 col-form-label text-start">
                        Province
                      </CFormLabel>
                      <CCol sm={6}>
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
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="City" className="col-sm-4 col-form-label text-start">
                        City
                      </CFormLabel>
                      <CCol sm={6}>
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
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="District" className="col-sm-4 col-form-label text-start">
                        District
                      </CFormLabel>
                      <CCol sm={6}>
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
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="Village" className="col-sm-4 col-form-label text-start">
                        Village
                      </CFormLabel>
                      <CCol sm={6}>
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
                  </CCol>
                  <CCol>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="Start Date" className="col-sm-4 col-form-label text-start">
                        Start Date
                      </CFormLabel>
                      <CCol sm={6}>
                        <CFormInput
                          aria-label="Date"
                          type="datetime-local"
                          id="Tanggal"
                          name="startDate"
                          {...register("startDate")}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="End Date" className="col-sm-4 col-form-label text-start">
                        End Date
                      </CFormLabel>
                      <CCol sm={6}>
                        <CFormInput
                          aria-label="Date"
                          type="datetime-local"
                          id="Tanggal"
                          name="endDate"
                          {...register("endDate")}
                        />
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                      <CCol sm={10}>
                        <CButton color="success" style={{ color: "#fff", float: "right" }} type="submit">
                          <span className="mx-3">Search</span>
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CForm>
            </CRow>
            <CRow>
              <CTable responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableDataCell scope="col" style={{ color: "rgba(125, 123, 122)" }}>
                      No
                    </CTableDataCell>
                    <CTableDataCell scope="col" style={{ color: "rgba(125, 123, 122)" }}>
                      Date
                    </CTableDataCell>
                    <CTableDataCell scope="col" style={{ color: "rgba(125, 123, 122)" }}>
                      Time
                    </CTableDataCell>
                    <CTableDataCell scope="col" style={{ color: "rgba(125, 123, 122)" }}>
                      Province
                    </CTableDataCell>
                    <CTableDataCell scope="col" style={{ color: "rgba(125, 123, 122)" }}>
                      City
                    </CTableDataCell>
                    <CTableDataCell scope="col" style={{ color: "rgba(125, 123, 122)" }}>
                      District
                    </CTableDataCell>
                    <CTableDataCell scope="col" style={{ color: "rgba(125, 123, 122)" }}>
                      Village
                    </CTableDataCell>
                    <CTableDataCell scope="col" style={{ color: "rgba(125, 123, 122)" }}>
                      Value
                    </CTableDataCell>
                    <CTableDataCell scope="col" style={{ color: "rgba(125, 123, 122)" }}>
                      Status
                    </CTableDataCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody style={{ textAlign: "left" }}>
                  {data.length ? (
                    data.map((item, index) => {
                      if (item.value < 25) {
                        item.status = "good"
                        item.statusColor = "primary"
                      } else if (item.value >= 25 && item.value <= 50) {
                        item.status = "fair"
                        item.statusColor = "success"
                      } else if (item.value >= 50 && item.value <= 100) {
                        item.status = "poor"
                        item.statusColor = "warning"
                      } else if (item.value >= 100 && item.value <= 300) {
                        item.status = "very poor"
                        item.statusColor = "danger"
                      } else {
                        item.status = "extremely poor"
                        item.statusColor = "dark"
                      }
                      if (fetching !== false) {
                        return (
                          <div className="d-flex justify-content-center align-items-center vw-100">
                            <div className="spinner-border text-success" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>
                        )
                      } else {
                        return (
                          <CTableRow key={item.id}>
                            <CTableDataCell style={{ textAlign: "center" }}>{index + 1}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: "center" }}>
                              {dayjs(item.datetime).format("DD-MM-YYYY")}
                            </CTableDataCell>
                            <CTableDataCell style={{ textAlign: "center" }}>
                              {dayjs(item.datetime).format("HH:mm")}
                            </CTableDataCell>
                            <CTableDataCell style={{ textAlign: "center" }}>
                              {ToTitleCase(item.province.name)}
                            </CTableDataCell>
                            <CTableDataCell style={{ textAlign: "center" }}>
                              {ToTitleCase(item.city.name)}
                            </CTableDataCell>
                            <CTableDataCell style={{ textAlign: "center" }}>
                              {ToTitleCase(item.district.name)}
                            </CTableDataCell>
                            <CTableDataCell style={{ textAlign: "center" }}>
                              {ToTitleCase(item.village.name)}
                            </CTableDataCell>
                            <CTableDataCell style={{ textAlign: "center" }}>{item.value}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: "center" }}>
                              <CBadge color={item.statusColor} shape="rounded-pill">
                                {item.status}
                              </CBadge>
                            </CTableDataCell>
                          </CTableRow>
                        )
                      }
                    })
                  ) : (
                    <>No data found!</>
                  )}
                </CTableBody>
              </CTable>
            </CRow>
          </CCardBody>
        </CContainer>
      </CCard>
    </div>
  )
}

export default AirPollution
