import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import TabAllOrders from './Tab/TabAllOrders'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import { getOrdersByUser } from '../../service/apiUser'
import useMe from '../../hooks/useMe'
import useUrl from '../../hooks/ui/useUrl'

function OrderHistory() {
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ bgcolor: 'white' }}>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Tất cả" value="1" />
          <Tab label="Chờ thanh toán" value="2" />
          <Tab label="Vận chuyển" value="3" />
          <Tab label="Chờ giao hàng" value="4" />
          <Tab label="Hoàn thành" value="5" />
          <Tab label="Đã hủy" value="6" />
          <Tab label="Trả hàng" value="7" />
        </TabList>
        <TabPanel value="1">
          <TabAllOrders />
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  )
}

export default OrderHistory
