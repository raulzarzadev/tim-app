'use client'
import { googleLogin } from '@/firebase/auth'
import { Button } from '@mui/material'
const LoginButton = () => {
  //const router = useRouter()
  return (
    <Button
      aria-label="sign-in-button"
      onClick={async (e) => {
        const res = await googleLogin()
      }}
      variant="contained"
    >
      Ingresar
    </Button>
  )
}

export default LoginButton
