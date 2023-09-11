'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import MUIBottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Paper from '@mui/material/Paper'
import AppIcon from './AppIcon'
import { useAuthContext } from '@/context/authContext'
import Link from 'next/link'
import { useUserCompaniesContext } from '@/context/userCompaniesContext'

export default function BottomNavigation() {
  const [value, setValue] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)
  const { user } = useAuthContext()
  const { companies } = useUserCompaniesContext()
  const isOwner = companies.length > 0
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
            LinkComponent={Link}
            href="/"
            label="Buscar"
            icon={<AppIcon icon="search" />}
          />
          <BottomNavigationAction
            LinkComponent={Link}
            href="/my-rentals"
            label="Rentas"
            icon={<AppIcon icon="bike" />}
          />
          {isOwner && (
            <BottomNavigationAction
              LinkComponent={Link}
              href="/dashboard"
              label="Empresas"
              icon={<AppIcon icon="store" />}
            />
          )}
          <BottomNavigationAction
            LinkComponent={Link}
            href="/profile"
            label="Perfil"
            icon={<AppIcon icon="person" />}
          />
        </MUIBottomNavigation>
      </Paper>
    </Box>
  )
}
