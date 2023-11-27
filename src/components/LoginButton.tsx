'use client'
import {
  createUserWithPassword,
  googleLogin,
  signInWithPassword
} from '@/firebase/auth'
import useModal from '@/hooks/useModal'
import { Box, Button, Divider, Typography } from '@mui/material'
import Modal from './Modal'
import LoginForm from './LoginForm'
import { useState } from 'react'
import SignUpForm from './SignUpForm'
import ForgotPasswordForm from './ForgotPasswordForm'
import AppIcon from './AppIcon'
const LoginButton = () => {
  const modal = useModal({ title: 'Ingresar' })

  const [selectForm, setSelectForm] = useState<'login' | 'signup' | 'forgot'>(
    'login'
  )

  return (
    <>
      <Button
        onClick={modal.onOpen}
        aria-label="sign-in-button"
        variant="contained"
        style={{
          backgroundColor: '#4285F4'
        }}
      >
        Ingresar
      </Button>
      <Modal {...modal}>
        <Box className="sm:flex ">
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
        </Box>
      </Modal>
    </>
  )
}

export default LoginButton
