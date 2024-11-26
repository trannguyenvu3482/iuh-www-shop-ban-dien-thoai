import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import '../../admin.css'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
const SIDEBAR_WIDTH = 240

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar
        sideBarWidth={SIDEBAR_WIDTH}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        sideBarWidth={SIDEBAR_WIDTH}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 1, md: 2 },
          width: { xs: '100%', md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        }}
      >
        {/* Routes */}
        {/* <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/products/categories" element={<ProductCategories />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<SingleCustomer />} />
        <Route path="/sales/analysis" element={<SalesAnalytics />} />
        <Route path="/sales" element={<ProductSales />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/template" element={<OrderTemplate />} />
        <Route path="/orders/:id" element={<SingleOrder />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes> */}
        <Outlet />
        <Footer />
      </Box>
    </Box>
  )
}

export default AdminLayout
