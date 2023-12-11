'use client'
import ForgotPasswordForm from '@/components/ForgotPasswordForm'
import { useRouter } from 'next/navigation'
const Page = () => {
  const router = useRouter()
  return (
    <div>
      <ForgotPasswordForm
        onSignIn={() => {
          router.push('/login')
        }}
      />
    </div>
  )
}

export default Page
