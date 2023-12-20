'use client'
import { googleLogin } from '@/firebase/auth'
import useModal from '@/hooks/useModal'
import { Box, Button, Divider, Typography } from '@mui/material'
import Modal from './Modal'
import LoginForm from './LoginForm'
import { useState } from 'react'
import SignUpForm from './SignUpForm'
import ForgotPasswordForm from './ForgotPasswordForm'
import AppIcon from './AppIcon'
import CallToActionCard from './Home/CallToActionCard'
const LoginButton = () => {
  const modal = useModal({ title: 'Ingresar' })

  const [selectForm, setSelectForm] = useState<'login' | 'signup' | 'forgot'>(
    'login'
  )

  return (
    <>
      <CallToActionCard
        subTitle="comenzar a rentar"
        title="Ingresa"
        label="Ingresar"
        onClick={modal.onOpen}
      />
      <Modal {...modal}>
        <Box className="">
          <div>
            {selectForm == 'login' && (
              <LoginForm
                onSignUp={() => setSelectForm('signup')}
                onForgotPassword={() => setSelectForm('forgot')}
              />
            )}
            {selectForm == 'signup' && (
              <SignUpForm onLogin={() => setSelectForm('login')} />
            )}

            {selectForm == 'forgot' && (
              <ForgotPasswordForm onSignIn={() => setSelectForm('login')} />
            )}
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default LoginButton
