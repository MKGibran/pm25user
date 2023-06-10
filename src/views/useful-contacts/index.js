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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const FireData = (props) => {
  return (
    <div>
      <CCard style={{ marginBottom: '2%' }}>
        <CContainer>
          <CCardBody style={{ textAlign: 'center' }}>
            <h4>Useful Contacts</h4>
          </CCardBody>
        </CContainer>
      </CCard>

      <CCard style={{ marginBottom: '2%' }}>
        <CCardHeader>
          <h4>Here is a list of useful contacts for your region in the event of a fire</h4>
        </CCardHeader>
        <CContainer>
          <CCardBody>
            <CTable responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Provinsi</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Kab/Kota</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Kecamatan</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Kontak</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody style={{ textAlign: 'left' }}>
                <CTableRow>
                  <CTableDataCell>Jawa Barat</CTableDataCell>
                  <CTableDataCell>Bogor</CTableDataCell>
                  <CTableDataCell>Tegallega</CTableDataCell>
                  <CTableDataCell>0878000000</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CContainer>
      </CCard>
    </div>
  )
}

export default FireData
