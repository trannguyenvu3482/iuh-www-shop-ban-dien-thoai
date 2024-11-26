import React from 'react'
import ReactApexChart from 'react-apexcharts'

const LineChart = ({ chartOptions, chartData }) => {
  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData}
      type="line"
      width="100%"
      height="100%"
    />
  )
}

export default LineChart
