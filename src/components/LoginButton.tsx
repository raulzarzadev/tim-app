'use client'
import { googleLogin } from '@/firebase/auth'
import { Button } from '@mui/material'
const LoginButton = () => {
  return (
    <Button
      aria-label="sign-in-button"
      onClick={async (e) => {
        const res = await googleLogin()
      }}
      variant="contained"
      style={{
        backgroundColor: '#4285F4'
      }}
    >
      Ingresar
    </Button>
  )
}

export default LoginButton
