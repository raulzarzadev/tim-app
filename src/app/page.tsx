'use client'
import { Inter } from 'next/font/google'
import { Button, Grid } from '@mui/material'
import LoginButton from '@/components/LoginButton'
import { useAuthContext } from '@/context/authContext'
import Link from 'next/link'
import AppIcon from '@/components/AppIcon'

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
        <h1 className="text-4xl mb-4 text-center">Renta lo que sea!.</h1>
        <p>Bicicletas</p>
        <p>Patines</p>
        <p>Motos</p>
        <p>Autos</p>
        <p>Lavadoras</p>
        <p>y mas...</p>
        <Button
          variant="outlined"
          href="/market"
          LinkComponent={Link}
          endIcon={<AppIcon icon="store" />}
        >
          Visita el mercado
        </Button>

        {user === null && (
          <div className="my-4">
            <LoginButton />
          </div>
        )}
      </Grid>
    </main>
  )
}
