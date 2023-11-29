'use client'
import { Inter } from 'next/font/google'
import { Button, Grid, Typography } from '@mui/material'
import LoginButton from '@/components/LoginButton'
import { useAuthContext } from '@/context/authContext'
import Link from 'next/link'
import AppIcon from '@/components/AppIcon'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { user } = useAuthContext()

  return (
    <main>
      <div className="flex justify-center my-2">
        {user === null && <LoginButton />}
      </div>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Typography variant="h4" className="text-4xl mb-4 text-center">
          Renta lo que sea!.
        </Typography>
        <Typography variant="h5" sx={{ my: 1 }}>
          Bicicletas
        </Typography>
        <Typography variant="h5" sx={{ my: 1 }}>
          Patines
        </Typography>
        <Typography variant="h5" sx={{ my: 1 }}>
          Motos
        </Typography>
        <Typography variant="h5" sx={{ my: 1 }}>
          Autos
        </Typography>
        <Typography variant="h5" sx={{ my: 1 }}>
          Lavadoras
        </Typography>
        <Typography variant="h5" sx={{ my: 1 }}>
          y mas...
        </Typography>
        <Button
          variant="outlined"
          href="/market"
          LinkComponent={Link}
          endIcon={<AppIcon icon="store" />}
        >
          Visita el mercado
        </Button>
      </Grid>
    </main>
  )
}
