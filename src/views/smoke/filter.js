import React from 'react'
import { CCol, CRow, CForm, CFormInput, CFormLabel, CButton } from '@coreui/react'

const Filter = (props) => {
  return (
    <div>
      <CRow>
        <CCol style={{ textAlign: 'left' }}>
          <h5>List Data PM 2.5</h5>
        </CCol>
        <CCol>
          <CButton color="light" style={{ float: 'right' }}>
            Date Range
          </CButton>
        </CCol>
      </CRow>

      <CRow>
        <CForm className="my-4">
          <CRow>
            <CCol>
              <CRow className="mb-3">
                <CFormLabel htmlFor="Provinsi" className="col-sm-4 col-form-label text-start">
                  Provinsi
                </CFormLabel>
                <CCol sm={6}>
                  <CFormInput type="text" id="Provinsi" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="Kabupaten/Kota" className="col-sm-4 col-form-label text-start">
                  Kabupaten/Kota
                </CFormLabel>
                <CCol sm={6}>
                  <CFormInput type="text" id="Kabupaten/Kota" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="Kecamatan" className="col-sm-4 col-form-label text-start">
                  Kecamatan
                </CFormLabel>
                <CCol sm={6}>
                  <CFormInput type="text" id="Kecamatan" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="Kelurahan/Desa" className="col-sm-4 col-form-label text-start">
                  Kelurahan/Desa
                </CFormLabel>
                <CCol sm={6}>
                  <CFormInput type="text" id="Kelurahan/Desa" />
                </CCol>
              </CRow>
            </CCol>
            <CCol>
              <CRow className="mb-3">
                <CFormLabel htmlFor="Tanggal" className="col-sm-2 col-form-label text-start">
                  Tanggal
                </CFormLabel>
                <CCol sm={8}>
                  <CFormInput type="date" id="Tanggal" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="Waktu" className="col-sm-2 col-form-label text-start">
                  Waktu
                </CFormLabel>
                <CCol sm={4}>
                  <CFormInput type="time" id="Waktu" />
                </CCol>
                <CCol sm={4}>
                  <CFormInput type="time" id="Waktu" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol sm={10}>
                  <CButton color="success" style={{ color: '#fff', float: 'right' }}>
                    Cari
                  </CButton>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CForm>
      </CRow>
    </div>
  )
}

export default Filter
