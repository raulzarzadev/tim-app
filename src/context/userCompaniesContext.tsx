'use client'

import { getUserCompanies } from '@/firebase/companies'
import { CompanyType } from '@/types/company'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './authContext'
import { StaffPermission } from '@/types/staff'

export type UserCompaniesContextType = {
  companies: CompanyType[]
  setCompanies: (companies: CompanyType[]) => void
  selected: CompanyType['id']
  setSelected: (id: CompanyType['id']) => void
  currentCompany: CompanyType | undefined
  setUserCompanies: () => void
}
export const UserCompaniesContext = createContext<UserCompaniesContextType>({
  companies: [],
  setCompanies: (companies: CompanyType[]) => {},
  selected: '',
  setSelected: (id: CompanyType['id']) => {},
  currentCompany: undefined,
  setUserCompanies: () => {}
})

export function UserCompaniesProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [companies, setCompanies] = useState<CompanyType[]>([])
  const [selected, setSelected] = useState<CompanyType['id']>('')
  useEffect(() => {
    setUserCompanies()
  }, [])
  const setUserCompanies = () => {
    getUserCompanies()
      .then((res) => {
        setCompanies(res || [])
        setSelected(res?.[0]?.id)
      })
      .catch(console.error)
  }

  const currentCompany = companies.find((company) => company?.id === selected)
  // useEffect(() => {
  //   router.push('?company=' + selected)
  // }, [router, selected])

  return (
    <UserCompaniesContext.Provider
      value={{
        setCompanies,
        setSelected,
        selected,
        companies,
        currentCompany,
        setUserCompanies
      }}
    >
      {children}
    </UserCompaniesContext.Provider>
  )
}

export function useUserCompaniesContext() {
  return useContext(UserCompaniesContext)
}

type UseArticleProps = { articleId?: string }
export const useCompanyArticles = () => {
  const { currentCompany } = useUserCompaniesContext()
  const articles = currentCompany?.articles
  return articles
}
export function useArticle(props: UseArticleProps) {
  const { currentCompany } = useUserCompaniesContext()

  const article = props.articleId
    ? currentCompany?.articles?.find((a) => a.id === props.articleId)
    : undefined
  return article
}
type UseArticlesProps = { categoryName?: string }

export function useCategoryArticles(props: UseArticlesProps) {
  const { currentCompany } = useUserCompaniesContext()

  const articles = props.categoryName
    ? currentCompany?.articles?.filter((a) => a.category === props.categoryName)
    : undefined
  return articles
}

type UseCategoryProps = { categoryName?: string }

export function useCategory(props: UseCategoryProps) {
  const { currentCompany } = useUserCompaniesContext()

  const article = props.categoryName
    ? currentCompany?.categories?.find((a) => a.name === props.categoryName)
    : undefined
  return article
}

export function useUserPermissions({ area }: { area: StaffPermission }) {
  const { currentCompany } = useUserCompaniesContext()
  const { user } = useAuthContext()

  const userPermissions = currentCompany?.staff?.find(
    (s) => s.email === user?.email
  )?.permissions
  if (userPermissions?.ADMIN) return true
  return userPermissions?.[area]
}
