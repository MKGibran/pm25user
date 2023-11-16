/* eslint-disable react/prop-types */
import { cilLocationPin } from "@coreui/icons"
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
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import isObjectEmpty from "src/utils/helper/checkObjIsEmpty"
import ToTitleCase from "src/utils/helper/toTitleCase"
import ipb from "../../assets/images/Logo IPB.png"
import sea from "../../assets/images/Logo-RFMRC-SEA-Terbaru.png"
import ubi from "../../assets/images/Logo_Udara_Bersih_Indonesia.png"
import SmokeApi from "../../models/api/smoke"
import Chart from "./chart"
import Level from "./level"

const Smoke = (props) => {
  const user = props?.user || {}
  const region = props?.user?.region || {}
  const [data, setData] = useState([])
  const [date, setDate] = useState([])
  const [value, setValue] = useState([])

  const getData = () => {
    const endDate = dayjs(new Date()).format("YYYY-MM-DDThh:mm:ss")
    const startDate = dayjs("2022-09-26").subtract(14, "day").format("YYYY-MM-DDThh:mm:ss")
    console.log(user.user.village_code)
    SmokeApi.getDataSmoke({
      startDate: startDate,
      endDate: endDate,
      villageCode: user.user.village_code,
      sortBy: "id",
      sortOrder: "desc",
    })
      .then((response) => {
        setData(response.data)
        const dates = []
        const values = []
        response.data.forEach((data) => {
          dates.push(dayjs(data.datetime).format("DD-MM-YYYY"))
          values.push(data.value)
        })
        setDate(dates)
        setValue(values)
      })
      .catch((error) => console.error(error))
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <CRow>
        <CCol className="col-8">
          <h4>Smoke</h4>
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
                  <Chart dates={date} values={value} />
                </CRow>
              </CCardBody>
            </CContainer>
          </CCard>
        </CCol>
        <CCol>{isObjectEmpty(user.user) ? <></> : <Level user={user} />}</CCol>
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
                    if (item.value < 4400) {
                      item.status = "good"
                      item.statusColor = "primary"
                    } else if (item.value >= 4400 && item.value <= 9400) {
                      item.status = "fair"
                      item.statusColor = "success"
                    } else if (item.value >= 9400 && item.value <= 12400) {
                      item.status = "moderate"
                      item.statusColor = "warning"
                    } else if (item.value >= 12400 && item.value <= 15400) {
                      item.status = "poor"
                      item.statusColor = "danger"
                    } else {
                      item.status = "very poor"
                      item.statusColor = "dark"
                    }
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
                        <CTableDataCell style={{ textAlign: "center" }}>{item.value}</CTableDataCell>
                        <CTableDataCell style={{ textAlign: "center" }}>
                          <CBadge color={item.statusColor} shape="rounded-pill">
                            {item.status}
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

export default Smoke
