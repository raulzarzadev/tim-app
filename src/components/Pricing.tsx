'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import StarIcon from '@mui/icons-material/StarBorder'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import GlobalStyles from '@mui/material/GlobalStyles'
import Container from '@mui/material/Container'

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: [
      '1 empresa incluida',
      '20 vehiculos',
      '100 rentas al mes',
      'Email support'
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined'
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '150',
    description: [
      '2 empresas incluidas',
      '100 vehiculos por empresa',
      '10,000 rentas por mes',
      'Priority email support'
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained'
  },
  {
    title: 'Enterprise',
    price: '300',
    description: [
      '+5 empresas incluidas',
      '10 vehiculos en renta',
      '100,000 rentas por mes',
      'Phone & email support'
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined'
  }
]

// TODO remove, this demo shouldn't need to reset the theme.

export default function Pricing() {
  return (
    <>
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography component="h1" variant="h2" align="center" gutterBottom>
          Precios
        </Typography>
        <Typography
          variant="h5"
          align="center"
          component="p"
          className="whitespace-pre-line"
        >
          {`Facilitamos la renta de equipo. Gestiona reservas, disponibilidad, reparaciones y mucho más.
           Todo por un precio fijo.
          `}
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center'
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700]
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant as 'outlined' | 'contained'}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
