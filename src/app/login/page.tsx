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
    </div>
  )
}

export default Login
