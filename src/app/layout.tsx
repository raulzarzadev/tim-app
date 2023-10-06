import ErrorBoundary from '@/components/ErrorBoundary'
import './globals.css'
import BottomNavigation from '@/components/BottomNavigation'
import Navigation from '@/components/Navigation'
import { AuthContextProvider } from '@/context/authContext'
import { UserCompaniesProvider } from '@/context/userCompaniesContext'

export const metadata = {
  title: 'baja-rent app',
  description: 'Take control of your rentals, easy and fast'
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
      <body>
        <ErrorBoundary componentName="RootLayout auth">
          <AuthContextProvider>
            <ErrorBoundary componentName="Companies">
              <UserCompaniesProvider>
                <ErrorBoundary componentName="RootLayout navigation">
                  <Navigation />
                </ErrorBoundary>
                <ErrorBoundary componentName="RootLayout">
                  {children}
                </ErrorBoundary>
                <ErrorBoundary componentName="BottomNavigation">
                  <BottomNavigation />
                </ErrorBoundary>
              </UserCompaniesProvider>
            </ErrorBoundary>
          </AuthContextProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
