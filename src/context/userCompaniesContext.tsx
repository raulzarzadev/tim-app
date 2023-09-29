'use client'

import { getUserCompanies } from '@/firebase/companies'
import { CompanyType } from '@/types/company'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './authContext'
import { StaffPermission } from '@/types/staff'
import { listenCompanyActivePayments } from '@/firebase/payments'
import { Payment } from '@/types/payment'
import { ArticleType } from '@/types/article'

import { ItemInUse } from '@/components/ItemsInUse'
import { PriceType } from '@/components/PricesForm'
import { Timestamp } from 'firebase/firestore'
import rentTime from '@/lib/rentTime'
import { addMinutes } from 'date-fns'
import asDate from '@/lib/asDate'

export type UserCompaniesContextType = {
  companies: CompanyType[]
  setCompanies: (companies: CompanyType[]) => void
  selected: CompanyType['id']
  setSelected: (id: CompanyType['id']) => void
  currentCompany: CompanyType | undefined
  setUserCompanies: () => void
  resetCompanies?: () => void
  itemsInUse: Partial<ItemInUse>[]
  items: ArticleType[]
  payments?: Payment[]
}

export const UserCompaniesContext = createContext<UserCompaniesContextType>({
  companies: [],
  setCompanies: (companies: CompanyType[]) => {},
  selected: '',
  setSelected: (id: CompanyType['id']) => {},
  currentCompany: undefined,
  setUserCompanies: () => {},
  resetCompanies: () => {},
  itemsInUse: [],
  items: [],
  payments: []
})

export function UserCompaniesProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [companies, setCompanies] = useState<CompanyType[]>([])
  const [selected, setSelected] = useState<CompanyType['id']>('')

  const { user } = useAuthContext()
  useEffect(() => {
    setUserCompanies()
    if (user === null) {
      setCompanies([])
      setSelected('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  const setUserCompanies = () => {
    getUserCompanies({ userId: user?.id || '' })
      .then((res) => {
        setCompanies(res || [])
        setSelected(res?.[0]?.id)
      })
      .catch(console.error)
  }
  const resetCompanies = () => {
    setUserCompanies()
  }

  const currentCompany = companies.find((company) => company?.id === selected)

  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    listenCompanyActivePayments(currentCompany?.id || '', setPayments)
  }, [currentCompany?.id])

  const items = currentCompany?.articles || []

  const itemsInUse = (): Partial<ItemInUse>[] => {
    const itemsInUseFromPayments = payments
      .map((payment) => {
        const inUseItems = payment.items.filter((item) => item.inUse ?? true)
        return inUseItems.map((item) => ({
          ...items?.find(({ id }) => id === item.itemId),
          ...item,
          startAt: payment.startAt,
          paymentId: payment.id,
          rentFinishAt: rentFinishAt(item.qty || 0, item.unit, payment.startAt),
          rentTime: rentTime(item.qty, item.unit)
        }))
      })
      .flat()
    return itemsInUseFromPayments.flat()
  }

  return (
    <UserCompaniesContext.Provider
      value={{
        setCompanies,
        setSelected,
        selected,
        companies,
        currentCompany,
        setUserCompanies,
        itemsInUse: itemsInUse(),
        items,
        payments,
        resetCompanies
      }}
    >
      {children}
    </UserCompaniesContext.Provider>
  )
}

const rentFinishAt = (
  qty: number,
  unit: PriceType['unit'],
  startAt?: Date | Timestamp
) => {
  if (!startAt) return null
  const rentMinutes = rentTime(qty, unit)
  return addMinutes(asDate(startAt) as Date, rentMinutes)
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

export function useCompanyCategories() {
  const { currentCompany } = useUserCompaniesContext()
  return currentCompany?.categories
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
