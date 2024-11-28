import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import React from 'react'
import { BsBell } from 'react-icons/bs'
import { FiMenu } from 'react-icons/fi'
import ProfileMenu from '../ProfileMenu'

const Navbar = ({ sideBarWidth, handleDrawerToggle }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${sideBarWidth}px)` },
        ml: { md: `${sideBarWidth}px` },
        boxShadow: 'unset',
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottomWidth: 1,
        borderBottomColor: 'divider',
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Tooltip title="Menu" arrow>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <FiMenu />
              </IconButton>
            </Tooltip>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Notifications" arrow>
              <IconButton sx={{ fontSize: '20px', color: 'text.primary' }}>
                <Badge color="error" variant="dot">
                  <BsBell />
                </Badge>
              </IconButton>
            </Tooltip>

            <ProfileMenu />
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
