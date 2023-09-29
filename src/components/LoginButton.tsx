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
        console.log({ res })
      }}
      variant="text"
    >
      Ingresar
    </Button>
  )
}

export default LoginButton
