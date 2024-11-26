import styled from '@emotion/styled'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import Table from '../../components/Admin/Table'
import { orders, ordersColumns } from '../../constants/orders'
import BarChart from './Home/BarChart'
import Stats from './Home/Stats'
import TransactionCustomer from './Home/TransactionCustomer'

const Admin = () => {
  const ComponentWrapper = styled(Box)({
    marginTop: '20px',
    paddingBottom: '10px',
  })

  return (
    <Box sx={{ pt: '80px', pb: '20px' }}>
      <Typography variant="h6" sx={{ marginBottom: '14px' }}>
        Bảng điều khiển
      </Typography>
      <ComponentWrapper>
        <Stats />
      </ComponentWrapper>

      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <BarChart />
          </Grid>
        </Grid>
      </ComponentWrapper>
      <ComponentWrapper>
        <TransactionCustomer />
      </ComponentWrapper>

      <ComponentWrapper>
        <Typography variant="h5" sx={{ my: 3 }}>
          Latest Orders
        </Typography>
        <Table
          data={orders}
          fields={ordersColumns}
          numberOfRows={5}
          enableTopToolBar={false}
          enableBottomToolBar={false}
          enablePagination={false}
          enableRowSelection={false}
          enableColumnFilters={false}
          enableEditing={false}
          enableColumnDragging={false}
        />
      </ComponentWrapper>
    </Box>
  )
}

export default Admin
