'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import MUIBottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ArchiveIcon from '@mui/icons-material/Archive'
import Paper from '@mui/material/Paper'
import AppIcon from './AppIcon'

export default function BottomNavigation() {
  const [value, setValue] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <MUIBottomNavigation
          className=""
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        >
          <BottomNavigationAction
            label="Recents"
            icon={<AppIcon icon="restore" />}
          />
          <BottomNavigationAction
            label="Favorites"
            icon={<AppIcon icon="favorite" />}
          />
          <BottomNavigationAction
            label="Archive"
            icon={<AppIcon icon="archive" />}
          />
        </MUIBottomNavigation>
      </Paper>
    </Box>
  )
}
