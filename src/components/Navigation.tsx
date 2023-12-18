'use client'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import { Skeleton } from '@mui/material'
import LoginButton from './LoginButton'
import { AuthContext, useAuthContext } from '@/context/authContext'
import { logout } from '@/firebase/auth'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { UserType } from '@/types/user'
import Image from 'next/image'
import APP_CONFIG from '@/APP_CONFIG'

const pages = [
  {
    label: 'Precio',
    route: '/pricing'
  },
  // {
  //   label: 'Contacto',
  //   route: '/contact'
  // },
  // {
  //   label: 'Blog',
  //   route: '/blog'
  // },
  // {
  //   label: `FAQ's`,
  //   route: '/faqs'
  // },
  {
    label: `Mercado`,
    route: '/market'
  }
  // {
  //   label: `Login`,
  //   route: '/login'
  // }
]

const userLinks: { label: string; route?: string; action?: () => void }[] = [
  {
    label: 'Perfil',
    route: '/profile'
  },
  // {
  //   label: 'Cuenta',
  //   route: '/account'
  // },
  {
    label: 'Dashboard',
    route: '/dashboard'
  },
  {
    label: 'Salir',

    action: () => logout()
  }
]

function ResponsiveAppBar() {
  useAuthContext()
  useUserCompaniesContext()

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const { user } = React.useContext(AuthContext)

  const { currentCompany } = useUserCompaniesContext()

  const companyName = currentCompany?.name || 'BajaRent'
  const companyLogo = currentCompany?.image || APP_CONFIG.logos.appleIcon

  return (
    <AppBar position="static">
      <Container maxWidth="xl" className="p-1">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Image
            src={companyLogo}
            width={60}
            height={60}
            alt="logo"
            className="rounded-full hidden md:flex"
            blurDataURL="/images/icons/icon-384x384.png"
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              ml: 1,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            {companyName}
          </Typography>
          <Link href={'/'}>
            <Image
              src={companyLogo}
              width={50}
              height={50}
              alt="logo"
              className="rounded-sm flex md:hidden "
            />
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none', justifyContent: 'end' }
            }}
          >
            {!!user ? (
              <Tooltip title={user.email}>
                <IconButton onClick={handleOpenNavMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.email} src={user.image} />
                </IconButton>
              </Tooltip>
            ) : (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link href={page.route}>{page.label}</Link>
                  </Typography>
                </MenuItem>
              ))}
              {user === null && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href={'/login'}>Login</Link>
                </MenuItem>
              )}
              {user &&
                userLinks?.map((setting) => (
                  <MenuItem key={setting.label} onClick={handleCloseNavMenu}>
                    {setting.action ? (
                      <Button onClick={setting.action}>
                        <Typography textAlign="center">
                          {setting.label}
                        </Typography>
                      </Button>
                    ) : (
                      <Link href={setting.route || '/'}>
                        <Typography textAlign="center">
                          {setting.label}
                        </Typography>
                      </Link>
                    )}
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          {/* <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              ml: 1,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            {companyName}
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                LinkComponent={Link}
                href={page.route}
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
            {!user && <div test-id="awaiting-user"></div>}
            {user === null && (
              <Button
                test-id="login-button"
                LinkComponent={Link}
                href={'/login'}
                key={'Login'}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Login
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {user && <UserNavMenu user={user} />}
          </Box>
          {user === undefined && (
            <Skeleton variant="circular" width={50} height={50} />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

const UserNavMenu = ({ user }: { user: UserType }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={user.email}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user.email} src={user.image} />
        </IconButton>
      </Tooltip>
      <Menu
        //sx={{ mt: '45px', border: '1px solid black', background: 'blue' }}
        anchorEl={anchorElUser}
        // anchorOrigin={{
        //   vertical: 'top',
        //   horizontal: 'right'
        // }}
        keepMounted
        // transformOrigin={{
        //   vertical: 'top',
        //   horizontal: 'right'
        // }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {userLinks.map((setting) => (
          <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
            {setting.action ? (
              <Button onClick={setting.action}>
                <Typography textAlign="center">{setting.label}</Typography>
              </Button>
            ) : (
              <Link href={setting.route || '/'}>
                <Typography textAlign="center">{setting.label}</Typography>
              </Link>
            )}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default ResponsiveAppBar
