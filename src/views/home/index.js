import { CCard, CCardBody, CCol, CContainer, CImage, CRow } from "@coreui/react"
import ipb from "../../assets/images/Logo IPB.png"
import ubi from "../../assets/images/Logo Udara Bersih Indonesia.jpeg"
import sea from "../../assets/images/Logo-RFMRC-SEA-Terbaru.png"

const Home = (props) => {
  return (
    <div>
      <CRow>
        <CCol>
          <h4>Home</h4>
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

      <CCard style={{ marginBottom: "2%" }} className={"border-light"}>
        <CContainer>
          <h6 className={"mx-3 mt-3 mb-0"}>The fire safety database is here to help you protect Indonesia</h6>
          <CCardBody style={{ textAlign: "center" }}>
            <CRow>
              <p style={{ textAlign: "justify" }}>
                Indonesia suffers from increasing fires that are destroying the land. They put pollutants into the air,
                endangering the health of others. Air pollution from fire causes breathing problems and can destroy
                property. However, fire is not easy to Agencies across Indonesia have asked for more timely access to
                relevant fire information. To do this we have funded and created the Fire Safety Database. <br />
                This new platform provides daily state-of-the-art fire information, including NASA satellite hotspot
                data and air pollution measures. By signing up to this platform you get access to this information for
                your specific area and become part of our Clean Air Indonesia community and be eligible for local and
                national awards. …etc…
              </p>
            </CRow>
          </CCardBody>
        </CContainer>
      </CCard>

      <CContainer>
        <CRow xs={{ gutterX: 5 }}>
          <CCol>
            <CRow>
              <CCard style={{ marginBottom: "2%" }} className={"border-light"}>
                <CCardBody>
                  <h6>Quick Information</h6>
                  <p>Some common situations and keywords to quickly give information</p>
                </CCardBody>
              </CCard>
              <CCard style={{ marginBottom: "2%" }} className={"border-light"}>
                <CCardBody>
                  <h6>Report a fire Report a fire</h6>
                  <p>Report a fire currently in progress to get support or make a record of a recent fire</p>
                </CCardBody>
              </CCard>
              <CCard style={{ marginBottom: "2%" }} className={"border-light"}>
                <CCardBody>
                  <h6>Useful contacts</h6>
                  <p>Access a list of useful contacts to get the support you need</p>
                </CCardBody>
              </CCard>
            </CRow>
          </CCol>
          <CCol>
            <CRow>
              <CCard style={{ marginBottom: "2%" }} className={"border-light"}>
                <CCardBody>
                  <h6>Fire data</h6>
                  <p>
                    Precise data about your area to give you useful insights into the current situations and what to do
                    next. Including: Air pollution, Hotspots, Smoke
                  </p>
                </CCardBody>
              </CCard>
              <CCard style={{ marginBottom: "2%" }} className={"border-light"}>
                <CCardBody>
                  <h6>Leader board</h6>
                  <p>Track your (commune’s) progress and performance</p>
                </CCardBody>
              </CCard>
            </CRow>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Home
