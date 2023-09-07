'use client'

import { authStateChanged, getCurrentUser } from '@/firebase/auth'
import { UserType } from '@/types/user'
import {
  ReactNode,
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
  useEffect(() => {
    authStateChanged((user) => {
      setUser(user)
    })
  }, [])

  const value = useMemo(() => ({ user, setUser }), [user, setUser])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuthContext() {
  return useContext(AuthContext)
}
