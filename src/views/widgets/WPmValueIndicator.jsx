import React from 'react'

export default function PmValueIndicator({ value, severity }) {
  return (
    <div className={`val-indicator val-indicator-${severity}-3`}>
      <div className={`val-indicator val-indicator-${severity}-2`}>
        <div className={`val-indicator val-indicator-${severity}-1`}>
          <span>{value}</span>
        </div>
      </div>
    </div>
  )
}
