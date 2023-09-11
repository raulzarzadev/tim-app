'use client'

import { getUserCompanies } from '@/firebase/companies'
import { CompanyType } from '@/types/company'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

export type UserCompaniesContextType = {
  companies: CompanyType[]
  setCompanies: (companies: CompanyType[]) => void
  selected: CompanyType['id']
  setSelected: (id: CompanyType['id']) => void
}
export const UserCompaniesContext = createContext<UserCompaniesContextType>({
  companies: [],
  setCompanies: (companies: CompanyType[]) => {},
  selected: '',
  setSelected: (id: CompanyType['id']) => {}
})

export function UserCompaniesProvider({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [companies, setCompanies] = useState<CompanyType[]>([])
  const [selected, setSelected] = useState<CompanyType['id']>('')
  useEffect(() => {
    getUserCompanies()
      .then((res) => {
        setCompanies(res || [])
        setSelected(res?.[0]?.id)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    router.push('?company=' + selected)
  }, [router, selected])

  return (
    <UserCompaniesContext.Provider
      value={{ setCompanies, setSelected, selected, companies }}
    >
      {children}
    </UserCompaniesContext.Provider>
  )
}

export function useUserCompaniesContext() {
  return useContext(UserCompaniesContext)
}
