'use client'
import { Inter } from 'next/font/google'
import { Button, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import AppIcon from '@/components/AppIcon'
import Header from '@/components/Home/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Header />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Typography variant="h4" className="text-4xl mb-4 text-center">
          Renta de todo!
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
