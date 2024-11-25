import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { links } from '../../../constants/links'
import SidebarItem from './SidebarItem'
import SidebarItemCollapsed from './SidebarItemCollapsed'

const Sidebar = ({ window, sideBarWidth, mobileOpen, handleDrawerToggle }) => {
  const drawer = (
    <div>
      <Toolbar>
        <img src="/favicon.ico" alt="Logo" width="40" />
        <Typography variant="h5" sx={{ fontWeight: 'bold', ml: 2 }}>
          XTMobile
        </Typography>
      </Toolbar>
      <Divider />
      <List disablePadding>
        {links?.map((link, index) =>
          link?.subLinks ? (
            <SidebarItemCollapsed {...link} key={index} />
          ) : (
            <SidebarItem {...link} key={index} />
          ),
        )}
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box
      component="nav"
      sx={{ width: { md: sideBarWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: sideBarWidth,
            backgroundColor: 'sidebar.background',
            color: 'sidebar.textColor',
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
          '& .MuiDrawer-paper': {
            width: sideBarWidth,
            boxSizing: 'border-box',
            borderRight: 0,
            backgroundColor: 'sidebar.background',
            color: 'sidebar.textColor',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default Sidebar
