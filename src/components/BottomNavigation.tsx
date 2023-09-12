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
import { usePathname } from 'next/navigation'

export default function BottomNavigation() {
  const pathname = usePathname()

  const ref = React.useRef<HTMLDivElement>(null)
  const { companies } = useUserCompaniesContext()
  const isOwner = companies.length > 0
  const pages: {
    href: string
    label: string
    icon: JSX.Element
    visible: boolean
  }[] = [
    {
      href: '/',
      label: 'Buscar',
      icon: <AppIcon icon="search" />,
      visible: true
    },
    {
      href: '/my-rentals',
      label: 'Rentas',
      icon: <AppIcon icon="bike" />,
      visible: true
    },
    {
      href: '/profile',
      label: 'Perfil',
      icon: <AppIcon icon="person" />,
      visible: true
    },
    {
      href: '/dashboard',
      label: 'Empresas',
      icon: <AppIcon icon="store" />,
      visible: isOwner
    }
  ]
  const [value, setValue] = React.useState(0)
  React.useEffect(() => {
    setValue(pages?.findIndex((p) => p.href === pathname))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

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
          {pages.map((page) =>
            page.visible ? (
              <BottomNavigationAction
                key={page.href}
                LinkComponent={Link}
                href={page.href}
                label={page.label}
                icon={page.icon}
              />
            ) : null
          )}
          {/* <BottomNavigationAction
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
          /> */}
        </MUIBottomNavigation>
      </Paper>
    </Box>
  )
}
