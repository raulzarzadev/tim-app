'use client'
import BottomNavigation from '@/components/BottomNavigation'
import './globals.css'
import Navigation from '@/components/Navigation'
import { AuthContextProvider, useAuthContext } from '@/context/authContext'

// export const metadata = {
//   title: 'baja-rent app',
//   description: 'Take control of your rentals, easy and fast'
// }

// const getUser = async () => {
//   const user = await getCurrentUser()
//   return user
// }

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  useAuthContext()
  return (
    <html lang="en">
      <head>
        <title>BajaRent</title>
      </head>
      <AuthContextProvider>
        <body>
          <Navigation />
          {children}
          <BottomNavigation />
        </body>
      </AuthContextProvider>
    </html>
  )
}
