import ErrorBoundary from '@/components/ErrorBoundary'
import BottomNavigation from '@/components/BottomNavigation'
import Navigation from '@/components/Navigation'
import { AuthContextProvider } from '@/context/authContext'
import { UserCompaniesProvider as UserCompaniesProvider2 } from '@/context/userCompaniesContext2'
import { StyledEngineProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import './globals.css'

export const metadata = {
  title: 'baja-rent app',
  description: 'Take control of your rentals, easy and fast',
  icons: {
    apple: 'images/icons/icon-512x512.png'
  },
  manifest: '/manifest.json',
  themeColor: '#2196f3'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>BajaRent</title>
      </head>
      <body className="pb-16">
        <CssBaseline />
        <StyledEngineProvider injectFirst>
          <ErrorBoundary componentName="RootLayout auth">
            <AuthContextProvider>
              <ErrorBoundary componentName="RootLayout Companies">
                <UserCompaniesProvider2>
                  <ErrorBoundary componentName="RootLayout navigation">
                    <Navigation />
                  </ErrorBoundary>
                  <ErrorBoundary componentName="RootLayout child">
                    {children}
                  </ErrorBoundary>
                  <ErrorBoundary componentName="RootLayout BottomNavigation">
                    <BottomNavigation />
                  </ErrorBoundary>
                </UserCompaniesProvider2>
              </ErrorBoundary>
            </AuthContextProvider>
          </ErrorBoundary>
        </StyledEngineProvider>
      </body>
    </html>
  )
}
