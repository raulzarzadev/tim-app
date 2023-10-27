'use client'

import { authStateChanged } from '@/firebase/auth'
import { UserType } from '@/types/user'
import { useRouter, usePathname } from 'next/navigation'
import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  setUser: () => {}
})

export type AuthContextType = {
  user: UserType | null | undefined
  setUser: (newUser: UserType | null) => void
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null | undefined>(undefined)
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    authStateChanged((user: SetStateAction<UserType | null | undefined>) => {
      if (user === null && !(pathname === '/components')) {
        router.replace('/')
      }
      setUser(user)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(() => ({ user, setUser }), [user, setUser])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuthContext() {
  return useContext(AuthContext)
}
