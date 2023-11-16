/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CAvatar, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

// import { logoNegative } from 'src/assets/brand/logo-negative'
// import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import logo from "../assets/images/Logo_Udara_Bersih_Indonesia.png"

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = (props) => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  return (
    <CSidebar
      style={{
        backgroundColor: 'rgb(130, 205, 71)',
        overflowY: 'hidden',
      }}
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand
        className="d-none d-md-flex my-3"
        to="/"
        style={{
          backgroundColor: 'rgb(130, 205, 71)',
          color: '#fff',
        }}
      >
        <CAvatar src={logo} size="xl" className="mx-3" />
        <h5>Fire Safety Database</h5>
      </CSidebarBrand>
      <CSidebarNav className="mt-5">
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        style={{
          backgroundColor: 'rgb(130, 205, 71)',
        }}
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
