import BottomNavigation from '@/components/BottomNavigation'
import './globals.css'
import Navigation from '@/components/Navigation'
import { AuthContextProvider } from '@/context/authContext'

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
        <AuthContextProvider>
          <Navigation />
          {children}
          <BottomNavigation />
        </AuthContextProvider>
      </body>
    </html>
  )
}
