/* eslint-disable react/prop-types */
import CIcon from "@coreui/icons-react"
import {
  CBadge,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CImage,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
} from "@coreui/react"
import { useEffect, useState } from "react"
import Chart from "./chart"
import Level from "./level"
// import Filter from './filter'
import { cilLocationPin } from "@coreui/icons"
import dayjs from "dayjs"
import isObjectEmpty from "src/utils/helper/checkObjIsEmpty"
import ToTitleCase from "src/utils/helper/toTitleCase"
import ipb from "../../assets/images/Logo IPB.png"
import ubi from "../../assets/images/Logo Udara Bersih Indonesia.jpeg"
import sea from "../../assets/images/Logo-RFMRC-SEA-Terbaru.png"
import HotspotApi from "../../models/api/hotspot"

const Hotspot = (props) => {
  const user = props?.user || {}
  const region = props?.user?.region || {}
  const [data, setData] = useState([])
  const [date, setDate] = useState([])
  const [valueLow, setValueLow] = useState([])
  const [valueMedium, setValueMedium] = useState([])
  const [valueHigh, setValueHigh] = useState([])

  const getData = () => {
    const endDate = dayjs(new Date()).format("YYYY-MM-DDThh:mm:ss")
    const startDate = dayjs("2022-09-26").subtract(14, "day").format("YYYY-MM-DDThh:mm:ss")
    HotspotApi.getDataHotspot({
      startDate: startDate,
      endDate: endDate,
      villageCode: region ? undefined : region?.village.code,
      sortBy: "id",
      sortOrder: "desc",
    })
      .then((response) => {
        setData(response.data)
        const date = []
        const valuesLow = []
        const valuesMedium = []
        const valuesHigh = []
        response.data.forEach((data, index) => {
          date.push(dayjs(data.date).format("DD-MM-YYYY"))
          valuesLow.push(data.low_confidence_hotspot.value)
          valuesMedium.push(data.medium_confidence_hotspot.value)
          valuesHigh.push(data.high_confidence_hotspot.value)
        })
        setDate(date)
        setValueLow(valuesLow)
        setValueMedium(valuesMedium)
        setValueHigh(valuesHigh)
      })
      .then((data) => {})
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <CRow>
        <CCol className="col-8">
          <h4>Hotspot</h4>
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

      <CRow>
        <CCol>
          <CCard style={{ marginBottom: "2%" }} className={"border-light"}>
            <CContainer>
              <h5 className={"m-3"}>Overview</h5>
              <CCardBody style={{ textAlign: "center" }}>
                <CRow className={"mb-5"}>
                  <Chart dates={date} valuesLow={valueLow} valuesMedium={valueMedium} valuesHigh={valueHigh} />
                </CRow>
              </CCardBody>
            </CContainer>
          </CCard>
        </CCol>
        <CCol>{isObjectEmpty(user) ? <></> : <Level user={user} />}</CCol>
      </CRow>

      <CCard style={{ marginBottom: "2%" }} className={"border-light"}>
        <CContainer>
          <div className={"m-3"}>
            <h5>List Data</h5>
            <p className="text-secondary mb-0" style={{ fontSize: "10pt" }}>
              For last 14 days
            </p>
          </div>
          <CCardBody style={{ textAlign: "center" }}>
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
                    Low
                  </CTableDataCell>
                  <CTableDataCell scope="col" style={{ color: "rgba(125, 123, 122)" }}>
                    Medium
                  </CTableDataCell>
                  <CTableDataCell scope="col" style={{ color: "rgba(125, 123, 122)" }}>
                    High
                  </CTableDataCell>
                </CTableRow>
              </CTableHead>
              <CTableBody style={{ textAlign: "left" }}>
                {data.length ? (
                  data.map((item, index) => {
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
                        <CTableDataCell style={{ textAlign: "center" }}>{ToTitleCase(item.city.name)}</CTableDataCell>
                        <CTableDataCell style={{ textAlign: "center" }}>
                          {ToTitleCase(item.district.name)}
                        </CTableDataCell>
                        <CTableDataCell style={{ textAlign: "center" }}>
                          {ToTitleCase(item.village.name)}
                        </CTableDataCell>
                        <CTableDataCell style={{ textAlign: "center" }}>
                          <CBadge color={"success"} shape="rounded-pill">
                            {item.low_confidence_hotspot.value}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell style={{ textAlign: "center" }}>
                          <CBadge color={"warning"} shape="rounded-pill">
                            {item.medium_confidence_hotspot.value}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell style={{ textAlign: "center" }}>
                          <CBadge color={"danger"} shape="rounded-pill">
                            {item.high_confidence_hotspot.value}
                          </CBadge>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })
                ) : (
                  <>No data found!</>
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CContainer>
      </CCard>
    </div>
  )
}

export default Hotspot
