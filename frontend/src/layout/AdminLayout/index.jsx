import { Box, LinearProgress } from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import '../../admin.css'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
const SIDEBAR_WIDTH = 240

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  return (
    <>
      {<LinearProgress />}
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
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

export default AdminLayout
