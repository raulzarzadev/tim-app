'use client'

import { authStateChanged } from '@/firebase/auth'
import { UserType } from '@/types/user'
import { useRouter, usePathname, useParams } from 'next/navigation'
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
  const params = useParams()
  useEffect(() => {
    authStateChanged((user: SetStateAction<UserType | null | undefined>) => {
      const alowVisitPages = ['/components', '/market', '/login']
      const isAStorePage = !!params.companyName
      if (
        user === null &&
        !alowVisitPages.includes(pathname) &&
        !isAStorePage
      ) {
        router.replace('/')
      }

      setUser(user)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onceLoginAvoidPages = ['/login', '/signup']
    if (onceLoginAvoidPages.includes(pathname) && user) {
      router.replace('/')
    }
  }, [pathname, router, user])

  const value = useMemo(() => ({ user, setUser }), [user, setUser])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuthContext() {
  return useContext(AuthContext)
}
