/* eslint-disable react/prop-types */
import React, { Suspense, useEffect, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner, CToaster } from '@coreui/react'

// routes config
import routes from '../routes'

const AppContent = (props) => {
  useEffect(() => {
    if (!props.user.full_name) {
      routes.splice(5)
    } else {
      routes.splice(0, 2)
    }
  }, [routes])
  return (
    <>
      <CContainer className="mt-4" lg>
        <Suspense fallback={<CSpinner color="primary" />}>
          <Routes>
            {routes.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element user={props} />}
                  />
                )
              )
            })}
            <Route path="/" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </Suspense>
      </CContainer>
    </>
  )
}

export default React.memo(AppContent)
