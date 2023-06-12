import React, { useEffect, useRef, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

import { useSelector } from 'react-redux'
import AppSimpleToast from '../components/toast/AppSimpleToast'
import { CToaster } from '@coreui/react'
import regionApi from '../models/api/region'

const DefaultLayout = () => {
  const [region, setRegion] = useState([])
  const toaster = useRef()
  const toastState = useSelector((state) => state?.globalUi?.toast)
  const user = useSelector((state) => state?.user?.current_user)
  const getVillageData = () => {
    regionApi
      .getVillage(user.village_code)
      .then((response) => {
        return response
      })
      .then((data) => {
        setRegion(data)
      })
  }
  useEffect(() => {
    getVillageData()
    console.log(toastState)
  }, [toastState, user])

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
      <AppSidebar user={user} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader user={user} />
        <div className="body flex-grow-1 px-3" style={{ backgroundColor: 'rgb(253, 250, 246)' }}>
          <AppContent user={user} region={region} />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  )
}

export default DefaultLayout
