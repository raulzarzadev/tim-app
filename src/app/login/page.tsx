'use client'
import AppIcon from '@/components/AppIcon'
import LoginForm from '@/components/LoginForm'
import { googleLogin } from '@/firebase/auth'
import { Button, Divider, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()
  return (
    <div className="flex-col ">
      <LoginForm
        onForgotPassword={() => {
          router.push('/forgot')
        }}
        onSignUp={() => {
          router.push('/signup')
        }}
      />
      <Divider className="my-6 truncate" orientation="vertical"></Divider>
      <div className="flex items-center flex-col justify-center">
        <Typography className="text-center">
          {' '}
          O inicia sesion con alguno de estos proveedores
        </Typography>
        <div className="grid my-6 gap-6 ">
          <Button
            onClick={async (e) => {
              const res = await googleLogin()
            }}
            aria-label="sign-in-button"
            variant="contained"
            style={{
              backgroundColor: '#4285F4'
            }}
            endIcon={<AppIcon icon="google" />}
          >
            <span className="truncate">Google</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
