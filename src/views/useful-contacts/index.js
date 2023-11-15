import React from 'react'
import {
  CCard,
  CCardBody,
  CContainer,
  CTable,
  CCardHeader,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CRow,
  CCol,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const FireData = (props) => {
  return (
    <div>
      <CRow>
        <h4>Contacts</h4>
      </CRow>

      <CCard className="border-light my-4">
        <CContainer>
          <CCardBody style={{ textAlign: 'center' }}>
            <CRow className={`mb-5`}>
              <CTable responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableDataCell scope="col" style={{ color: 'rgba(125, 123, 122)' }}>
                      Name
                    </CTableDataCell>
                    <CTableDataCell scope="col" style={{ color: 'rgba(125, 123, 122)' }}>
                      Phone
                    </CTableDataCell>
                    <CTableDataCell scope="col" style={{ color: 'rgba(125, 123, 122)' }}>
                      Whatsapp
                    </CTableDataCell>
                    <CTableDataCell scope="col" style={{ color: 'rgba(125, 123, 122)' }}>
                      Email
                    </CTableDataCell>
                    <CTableDataCell scope="col" style={{ color: 'rgba(125, 123, 122)' }}>
                      Address
                    </CTableDataCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody style={{ textAlign: 'left' }}>
                  <CTableRow>
                    <CTableDataCell style={{ textAlign: 'center' }}>
                      Robi Deslia Waldi, S.Hut., M.Si
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'center' }}>
                      <CBadge color={'warning'} shape="rounded-pill">
                        (0251) 8421929
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'center' }}>
                      <CBadge color={'success'} shape="rounded-pill">
                        +6281290002231
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'center' }}>
                      ubi.fahutanipb@gmail.com / rfmrcsea.ipb@gmail.com
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'center' }}>
                      Jl. Ulin Lingkar Kampus IPB Dramaga, Gedung Biologi Kehutanan BK 214 Faculty
                      of Forestry, Bogor 16680, West Java, Indonesia
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CRow>
          </CCardBody>
        </CContainer>
      </CCard>
    </div>
  )
}

export default FireData
