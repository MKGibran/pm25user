import React, { useEffect, useRef } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

import { useSelector } from 'react-redux'
import AppSimpleToast from '../components/toast/AppSimpleToast'
import { CToaster } from '@coreui/react'

const DefaultLayout = () => {
  const toaster = useRef()
  const toastState = useSelector((state) => state.globalUi?.toast)
  useEffect(() => {
    console.log(toastState)
  }, [toastState])

  return (
    <div>
      {toastState?.open ? (
        <CToaster
          ref={toaster}
          push={<AppSimpleToast message={toastState?.message} severity={toastState?.severity} />}
          placement="bottom-start"
        />
      ) : (
        <></>
      )}
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3" style={{ backgroundColor: 'rgb(253, 250, 246)' }}>
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
