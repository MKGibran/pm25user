/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react'
import {} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'

const Chart = (props) => {
  return (
    <>
      <CChart
        type="line"
        style={{ height: '300px' }}
        data={{
          labels: props.dates.reverse(),
          datasets: [
            {
              label: 'Low',
              backgroundColor: 'rgba(220, 220, 220, 0.2)',
              borderColor: 'rgba(46, 184, 92)',
              pointBackgroundColor: 'rgba(46, 184, 92)',
              pointBorderColor: '#fff',
              data: props.valuesLow.reverse(),
              fill: true,
            },
            {
              label: 'Medium',
              backgroundColor: 'rgba(220, 220, 220, 0.2)',
              borderColor: 'rgba(253, 126, 20)',
              pointBackgroundColor: 'rgba(253, 126, 20)',
              pointBorderColor: '#fff',
              data: props.valuesMedium.reverse(),
              fill: true,
            },
            {
              label: 'High',
              backgroundColor: 'rgba(220, 220, 220, 0.2)',
              borderColor: 'rgba(220, 53, 69)',
              pointBackgroundColor: 'rgba(220, 53, 69)',
              pointBorderColor: '#fff',
              data: props.valuesHigh.reverse(),
              fill: true,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </>
  )
}

export default Chart
