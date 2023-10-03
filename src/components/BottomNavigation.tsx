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
export type NavPages = {
  href: string
  label: string
  icon: JSX.Element
  visible: boolean
}[]
export default function BottomNavigation() {
  const pathname = usePathname()

  const ref = React.useRef<HTMLDivElement>(null)
  const { currentCompany } = useUserCompaniesContext()
  const { user } = useAuthContext()

  const [value, setValue] = React.useState(0)
  const [pages, setPages] = React.useState<NavPages | undefined>(undefined)
  React.useEffect(() => {
    setValue(pages?.findIndex((p) => p.href === pathname) || 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, user])

  React.useEffect(() => {
    const userPages: NavPages = [
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
      }
      // {
      //   href: '/dashboard',
      //   label: 'Empresas',
      //   icon: <AppIcon icon="store" />,
      //   visible: isOwner
      // }
    ]

    const ownerPages: NavPages = [
      {
        href: '/profile',
        label: 'Perfil',
        icon: <AppIcon icon="recordVoiceOver" />,
        visible: true
      },
      {
        href: '/dashboard',
        label: 'Dashboard',
        icon: <AppIcon icon="dashboard" />,
        visible:
          currentCompany?.staff?.find((staff) => staff?.email === user?.email)
            ?.permissions?.ADMIN || false
      },
      {
        href: `/dashboard/${currentCompany?.id}/CASHBOX`,
        label: 'Caja',
        icon: <AppIcon icon="cashbox" />,
        visible:
          currentCompany?.staff?.find((staff) => staff?.email === user?.email)
            ?.permissions?.CASHBOX || false
      },
      {
        href: `/dashboard/${currentCompany?.id}/RECEPTION`,
        label: 'Recepción',
        icon: <AppIcon icon="store" />,
        visible:
          currentCompany?.staff?.find((staff) => staff?.email === user?.email)
            ?.permissions?.RECEPTION || false
      },
      {
        href: `/dashboard/${currentCompany?.id}/MAINTENANCE`,
        label: 'Mantenimiento',
        icon: <AppIcon icon="fix" />,
        visible:
          currentCompany?.staff?.find((staff) => staff?.email === user?.email)
            ?.permissions?.MAINTENANCE || false
      }
    ]

    if (currentCompany) {
      setPages(ownerPages)
    } else {
      setPages(userPages)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCompany])

  if (!user) return <></>

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0
        }}
        elevation={3}
      >
        <MUIBottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
          className="overflow-x-auto justify-start sm:justify-center  "
        >
          {pages?.map((page) =>
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
        </MUIBottomNavigation>
      </Paper>
    </Box>
  )
}
