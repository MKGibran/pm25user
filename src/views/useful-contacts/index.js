import {
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

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
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Whatsapp</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody style={{ textAlign: 'left' }}>
                <CTableRow>
                  <CTableDataCell>Robi Deslia Waldi, S.Hut., M.Si</CTableDataCell>
                  <CTableDataCell>(0251) 8421929</CTableDataCell>
                  <CTableDataCell>+6281290002231</CTableDataCell>
                  <CTableDataCell>ubi.fahutanipb@gmail.com / rfmrcsea.ipb@gmail.com</CTableDataCell>
                  <CTableDataCell>
                    Jl. Ulin Lingkar Kampus IPB Dramaga, Gedung Biologi Kehutanan BK 214 Faculty of Forestry, Bogor
                    16680, West Java, Indonesia
                  </CTableDataCell>
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
