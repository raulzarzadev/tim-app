'use client'
import SignUpForm from '@/components/SignUpForm'
import { useRouter } from 'next/navigation'

const SingUp = () => {
  const router = useRouter()
  return (
    <div>
      <SignUpForm onLogin={() => router.push('/login')} />
    </div>
  )
}

export default SingUp
