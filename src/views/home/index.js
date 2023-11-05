import React from 'react'
import { CCard, CCardBody, CCol, CContainer, CRow, CImage } from '@coreui/react'
import ipb from '../../assets/images/Logo IPB.png'
import ubi from '../../assets/images/Logo Udara Bersih Indonesia.jpeg'
import sea from '../../assets/images/Logo-RFMRC-SEA-Terbaru.png'

const Home = (props) => {
  return (
    <div>
      <CCard style={{ marginBottom: '2%' }}>
        <CContainer>
          <CCardBody style={{ textAlign: 'center' }}>
            <h4>The fire safety database is here to help you protect Indonesia</h4>
          </CCardBody>
        </CContainer>
      </CCard>

      <CCard style={{ marginBottom: '2%', textAlign: 'justify' }}>
        <CContainer>
          <CCardBody style={{ textAlign: 'center' }}>
            <CRow>
              <CCol>
                <CImage fluid src={ipb} width={100} />
              </CCol>
              <CCol>
                <CImage fluid src={ubi} width={100} />
              </CCol>
              <CCol>
                <CImage fluid src={sea} width={100} />
              </CCol>
            </CRow>
            <CRow>
              <p style={{ marginTop: '2%', textAlign: 'justify' }}>
                Indonesia suffers from increasing fires that are destroying the land. They put
                pollutants into the air, endangering the health of others. Air pollution from fire
                causes breathing problems and can destroy property. However, fire is not easy to
                fight and prevent. <br />
                Agencies across Indonesia have asked for more timely access to relevant fire
                information. To do this we have funded and created the Fire Safety Database. <br />
                This new platform provides daily state-of-the-art fire information, including NASA
                satellite hotspot data and air pollution measures. <br />
                By signing up to this platform you get access to this information for your specific
                area and become part of our Clean Air Indonesia community and be eligible for local
                and national awards. …etc…
              </p>
            </CRow>
          </CCardBody>
        </CContainer>
      </CCard>

      <CContainer>
        <CRow xs={{ gutterX: 5 }}>
          <CCol>
            <CRow>
              <CCard
                style={{
                  marginBottom: '2%',
                  textAlign: 'justify',
                  backgroundColor: 'rgb(241, 197, 80)',
                  color: '#fff',
                }}
              >
                <CContainer>
                  <CCardBody>
                    <h4>Quick Information</h4>
                    <p>Some common situations and keywords to quickly give information</p>
                  </CCardBody>
                </CContainer>
              </CCard>
              <CCard
                style={{
                  marginBottom: '2%',
                  textAlign: 'justify',
                  backgroundColor: 'rgb(234, 76, 76)',
                  color: '#fff',
                }}
              >
                <CContainer>
                  <CCardBody>
                    <h4>Report a fire Report a fire</h4>
                    <p>
                      Report a fire currently in progress to get support or make a record of a
                      recent fire
                    </p>
                  </CCardBody>
                </CContainer>
              </CCard>
              <CCard
                style={{
                  marginBottom: '2%',
                  textAlign: 'justify',
                  backgroundColor: 'rgb(161, 196, 90)',
                  color: '#fff',
                }}
              >
                <CContainer>
                  <CCardBody>
                    <h4>Useful contacts</h4>
                    <p>Access a list of useful contacts to get the support you need</p>
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
                  textAlign: 'justify',
                  backgroundColor: 'rgb(72, 156, 193)',
                  color: '#fff',
                }}
              >
                <CContainer>
                  <CCardBody>
                    <h4>Fire data</h4>
                    <p>
                      Precise data about your area to give you useful insights into the current
                      situations and what to do next. Including: Air pollution, Hotspots, Smoke
                    </p>
                  </CCardBody>
                </CContainer>
              </CCard>
              <CCard
                style={{
                  marginBottom: '2%',
                  textAlign: 'justify',
                  backgroundColor: 'rgb(255, 249, 224)',
                  color: 'rgb(234, 76, 76)',
                }}
              >
                <CContainer>
                  <CCardBody>
                    <h4>Leader board</h4>
                    <p>Track your (commune’s) progress and performance</p>
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

export default Home
