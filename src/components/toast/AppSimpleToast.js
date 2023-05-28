import { CToast, CToastBody, CToastClose } from '@coreui/react'

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { globalUiActions } from 'src/models/redux/actions/globalUiActions'
import { initialStateGlobalUi } from 'src/models/redux/store/globalUiSlice'

export default function AppSimpleToast({ message, severity = 'info' }) {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('ToastOpened')
  }, [])
  return (
    <CToast
      className="align-items-center"
      visible={true}
      color={severity}
      onClose={() => dispatch(globalUiActions.setToastMessage(initialStateGlobalUi.toast))}
    >
      <div className="d-flex text-white">
        <CToastBody>{message}</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )
}
