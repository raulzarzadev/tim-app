import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { passwordReset } from '@/firebase/auth'

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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function ForgotPasswordForm({
  onSignIn
}: {
  onSignIn?: () => void
}) {
  const [formStatus, setFormStatus] = React.useState<
    'invalid' | 'sending' | 'sent' | 'error' | 'valid'
  >('invalid')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setFormStatus('sending')
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email')
    })
    await passwordReset(data.get('email')?.toString() || '')
      .then((res) => {
        console.log(res)
        setFormStatus('sent')
      })
      .catch((err) => {
        console.log('error reset', err)
        setFormStatus('error')
      })
      .finally(() => {
        setFormStatus('sent')
      })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          test-id="forgot-password-form"
          sx={{
            //marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Recuperar contraseña
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              onChange={(e) => {
                const isValid =
                  e.target.value.length > 0 &&
                  e.target.value.includes('@') &&
                  e.target.value.includes('.')

                if (isValid) {
                  setFormStatus('valid')
                } else {
                  setFormStatus('invalid')
                }
              }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo "
              name="email"
              autoComplete="email"
              autoFocus
              helperText={
                formStatus === 'invalid' && `Debe ser un correo valido`
              }
            />
            {formStatus === 'sent' && (
              <Typography className="" variant="caption">
                Si el correo existe, recibira un email para resetar su
                contraseña.
              </Typography>
            )}
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}

            <Button
              disabled={['sending', 'sent', 'invalid'].includes(formStatus)}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Recuperar
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={onSignIn}
              test-id="backwards-button"
            >
              Regresar
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link> */}
              </Grid>
              <Grid item>
                {/* <Link href="#" variant="body2">
                  {`¿No tienes cuenta? Registrate`}
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  )
}
