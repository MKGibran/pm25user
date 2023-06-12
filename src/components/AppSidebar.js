/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler, CAvatar } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

// import { logoNegative } from 'src/assets/brand/logo-negative'
// import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import logo from '../assets/images/klhk_logo.png'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = (props) => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  useEffect(() => {
    if (!props.user.full_name) {
      navigation.splice(3)
    } else {
      navigation.splice(0, 1)
    }
  }, [navigation])
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
