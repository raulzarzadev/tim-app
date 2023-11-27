'use client'
import {
  createUserWithPassword,
  googleLogin,
  signInWithPassword
} from '@/firebase/auth'
import useModal from '@/hooks/useModal'
import { Box, Button, Divider } from '@mui/material'
import Modal from './Modal'
import LoginForm from './LoginForm'
import { useState } from 'react'
import SignUpForm from './SignUpForm'
import ForgotPasswordForm from './ForgotPasswordForm'
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
        <Box>
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

          <Divider className="my-6 truncate">
            O incia sesion con alguno de estos proveedores
          </Divider>
          <div className="flex justify-evenly my-6">
            <Button
              onClick={async (e) => {
                const res = await googleLogin()
              }}
              aria-label="sign-in-button"
              variant="contained"
              style={{
                backgroundColor: '#4285F4'
              }}
            >
              <span className="truncate">Google</span>
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default LoginButton
