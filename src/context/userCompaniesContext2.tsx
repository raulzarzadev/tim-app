'use client'

import { listenStaffCompanies, listenUserCompanies } from '@/firebase/companies'
import { CompanyType } from '@/types/company'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './authContext'
import { StaffPermission } from '@/types/staff'

import { PriceType } from '@/components/PricesForm'
import { Timestamp } from 'firebase/firestore'
import rentTime from '@/lib/rentTime'
import { addMinutes, isAfter } from 'date-fns'
import asDate from '@/lib/asDate'
import { Order } from '@/types/order'
import { listenCompanyOrders } from '@/firebase/orders'
import { ItemSelected } from '@/components/CompanyCashbox'
import { CompanyItem } from '@/types/article'

export type ContextItem = ItemSelected & {
  order: Order
}

export type UserCompaniesContextType = {
  companySelected: CompanyType['id']
  setCompanySelected: (id: CompanyType['id']) => void
  currentCompany: CompanyType | undefined
  userCompanies: CompanyType[]
  companyItems: CompanyItem[]
  ordersItems: {
    all: ContextItem[]
    inUse: ContextItem[]
    finished: ContextItem[]
    pending: ContextItem[]
  }
  orders?: Order[]
}

export const UserCompaniesContext = createContext<UserCompaniesContextType>({
  companySelected: '',
  setCompanySelected: function (id: string): void {
    throw new Error('Function not implemented.')
  },
  currentCompany: undefined,
  userCompanies: [],
  orders: [],
  companyItems: [],
  ordersItems: {
    all: [],
    inUse: [],
    finished: [],
    pending: []
  }
})

export function useUserCompaniesContext() {
  return useContext(UserCompaniesContext)
}

export function UserCompaniesProvider({
  children
}: {
  children: React.ReactNode
}) {
  const { user } = useAuthContext()
  const [companySelected, setCompanySelected] = useState('')
  const [userOwnCompanies, setUserOwnCompanies] = useState<CompanyType[]>([])
  const [staffCompanies, setStaffCompanies] = useState<CompanyType[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const bajaRent: { selectedCompany: CompanyType['id'] } = JSON.parse(
      localStorage.getItem('baja-rent') || '{}'
    )
    setCompanySelected(bajaRent.selectedCompany)
  }, [])

  useEffect(() => {
    if (user) {
      listenUserCompanies(user?.id, (res: CompanyType[]) => {
        setUserOwnCompanies(res)
      })
      listenStaffCompanies(user?.email, (res: CompanyType[]) => {
        setStaffCompanies(res)
      })
    }
  }, [user])

  const currentCompany = [...userOwnCompanies, ...staffCompanies].find(
    (company) => company?.id === companySelected
  )

  useEffect(() => {
    listenCompanyOrders(currentCompany?.id || '', setOrders)
  }, [currentCompany?.id])

  const companyItems = currentCompany?.articles || []
  const itemsFromOrders = orders
    .map((order) => order.items.map((item) => ({ ...item, order })))
    .flat()

  const handleSetCompanySelected = (companySelectedId: string) => {
    localStorage.setItem(
      'baja-rent',
      JSON.stringify({ selectedCompany: companySelectedId })
    )
    setCompanySelected(companySelectedId)
  }

  const itemsInUse = itemsFromOrders.filter(
    (i) =>
      i.inUse &&
      !isAfter(new Date(), asDate(i.order.shipping.date) || new Date())
  )
  const itemsFinished = itemsFromOrders.filter((i) => !i.inUse)
  const itemsPending = itemsFromOrders.filter(
    (i) =>
      i.inUse &&
      isAfter(new Date(), asDate(i.order.shipping.date) || new Date())
  )

  console.log({
    orders,
    itemsFromOrders,
    itemsInUse,
    itemsFinished,
    itemsPending
  })

  return (
    <UserCompaniesContext.Provider
      value={{
        userCompanies: [...userOwnCompanies, ...staffCompanies],
        companySelected,
        setCompanySelected: handleSetCompanySelected,
        currentCompany,
        companyItems,
        ordersItems: {
          all: itemsFromOrders,
          inUse: itemsInUse,
          finished: itemsFinished,
          pending: []
        },
        orders
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
