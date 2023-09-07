'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button, Grid, Stack } from '@mui/material'
import LoginButton from '@/components/LoginButton'
import { useAuthContext } from '@/context/authContext'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { user } = useAuthContext()
  return (
    <main>
      <Grid
        container
        height="100vh"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <h1 className="text-4xl mb-4 text-center">
          Mantén el control en la renta de equipo.
        </h1>
        <p>Bicicletas</p>
        <p>Patines</p>
        <p>Motos</p>
        <p>Autos</p>
        <p>lo que sea ...</p>
        {!user && (
          <div className="my-4">
            <LoginButton />
          </div>
        )}
      </Grid>
    </main>
  )
}
