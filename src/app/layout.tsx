import ErrorBoundary from '@/components/ErrorBoundary'
import './globals.css'
import BottomNavigation from '@/components/BottomNavigation'
import Navigation from '@/components/Navigation'
import { AuthContextProvider } from '@/context/authContext'
import { UserCompaniesProvider } from '@/context/userCompaniesContext'
import { UserCompaniesProvider as UserCompaniesProvider2 } from '@/context/userCompaniesContext2'
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
            <ErrorBoundary componentName="RootLayout Companies">
              <UserCompaniesProvider>
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
              </UserCompaniesProvider>
            </ErrorBoundary>
          </AuthContextProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
