import Link from 'next/link'
import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata = {
  title: 'baja-rent app',
  description: 'Take control of your rentals, easy and fast'
}

export default function RootLayout({
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
        <Navigation />
        {children}
      </body>
    </html>
  )
}
