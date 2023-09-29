'use client'
import { googleLogin } from '@/firebase/auth'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
const LoginButton = () => {
  const router = useRouter()

  return (
    <Button
      aria-label="sign-in-button"
      onClick={async (e) => {
        const res = await googleLogin()
        console.log({ res })
        if (res) {
          router.refresh()
        }
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
