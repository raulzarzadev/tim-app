'use client'

import { listenStaffCompanies, listenUserCompanies } from '@/firebase/companies'
import { CompanyType } from '@/types/company'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './authContext'
import { StaffPermission } from '@/types/staff'

import { Timestamp } from 'firebase/firestore'
import { isAfter } from 'date-fns'
import { Order } from '@/types/order'
import { listenCompanyOrders } from '@/firebase/orders'
import { CompanyItem } from '@/types/article'
import { ItemSelected } from './useCompanyCashbox'
import forceAsDate from '@/lib/forceAsDate'
import { Service } from '@/types/service'
import { listenCompanyServices } from '@/firebase/services'
import { Client } from '@/types/client'
import { listenCompanyClients } from '@/firebase/clients'
import { calculateFinishRentDate } from './lib'
import { itemStatus } from '@/lib/itemStatus'
import { calculateOrderTotal } from '@/lib/calculateOrderTotal'
import { totalCharged } from '@/components/cashboxBalances/calculateBalance.lib'
import asNumber from '@/lib/asNumber'

/**
 *
 * @param startAt started date
 * @param qty number that will multiply the unit
 * @param unit unit of time minutes, hour
 * @returns
 */

export type ItemOrder = Partial<CompanyItem> &
  ItemSelected & {
    order: Order
    rentStartAt?: Date | Timestamp | null
    rentFinishAt?: Date | Timestamp | null
  }

export type UserCompaniesContextType = {
  companySelected: CompanyType['id']
  setCompanySelected: (id: CompanyType['id']) => void
  currentCompany: CompanyType | undefined
  userCompanies: CompanyType[]
  companyItems: CompanyItem[]
  services?: Service[]
  clients?: Client[]
  ordersItems: {
    all: ItemOrder[]
    inUse: ItemOrder[]
    finished: ItemOrder[]
    pending: ItemOrder[]
    expired: ItemOrder[]
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
  clients: [],
  companyItems: [],
  ordersItems: {
    all: [],
    inUse: [],
    finished: [],
    pending: [],
    expired: []
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
  const [services, setServices] = useState<Service[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const currentCompany = [...userOwnCompanies, ...staffCompanies].find(
    (company) => company?.id === companySelected
  )
  useEffect(() => {
    if (user) {
      if (companySelected) listenCompanyServices(companySelected, setServices)
    }
  }, [companySelected, user])

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

  useEffect(() => {
    if (user) {
      listenCompanyClients(currentCompany?.id || '', setClients)
    }
  }, [currentCompany?.id, user])

  useEffect(() => {
    if (user) {
      listenCompanyOrders(currentCompany?.id || '', setOrders)
    }
  }, [currentCompany?.id, user])

  const handleSetCompanySelected = (companySelectedId: string) => {
    localStorage.setItem(
      'baja-rent',
      JSON.stringify({ selectedCompany: companySelectedId })
    )
    setCompanySelected(companySelectedId)
  }
  const companyItems =
    currentCompany?.articles?.map((i) => {
      //* set STATUS for each item
      const status = itemStatus(i.id, { companyOrders: orders }).status
      i.rentStatus = status
      //* set PRICE for each item
      i.prices = i.ownPrice
        ? i.prices
        : currentCompany?.categories?.find((c) => c.name === i.category)?.prices
      return i
    }) || []

  const itemsFromOrders: ItemOrder[] =
    orders
      .map((order) =>
        order?.items?.map((orderItem) => {
          const fullItem = companyItems?.find(
            (i) => i?.id === orderItem?.itemId
          )
          const prices = fullItem?.ownPrice
            ? fullItem.prices
            : currentCompany?.categories?.find(
                (c) => c.name === fullItem?.category
              )?.prices
          const shippingDate = forceAsDate(order?.shipping?.date)

          return {
            ...fullItem,
            ...orderItem,
            prices,

            order,
            rentStartAt: shippingDate,
            rentFinishAt: calculateFinishRentDate(
              shippingDate,
              orderItem?.qty,
              orderItem.unit
            )
          }
        })
      )
      .flat() || []

  const itemsInUse = itemsFromOrders?.filter(
    (i) => i?.inUse || i?.rentStatus === 'taken'
  )

  const itemsFinished = itemsFromOrders?.filter(
    (i) => i?.rentStatus === 'finished'
  )

  const itemsPending = itemsFromOrders?.filter(
    (i) => i?.rentStatus === 'pending'
  )
  const itemsExpired = itemsFromOrders?.filter(
    (i) =>
      i?.rentStatus === 'taken' && isAfter(i?.rentFinishAt as Date, new Date())
  )

  //* get user companies but clear duplicates
  const userCompanies = [...userOwnCompanies, ...staffCompanies].filter(
    (o, i, self) => {
      return self.findIndex((t) => t.id === o.id) === i
    }
  )

  orders.map((o) => {
    o.itemsAmount = o.items.reduce(
      (acc, curr) => (acc += asNumber(curr.price)),
      0
    )
    o.paymentsAmount = totalCharged(o?.payments || [])
    return o
  })

  return (
    <UserCompaniesContext.Provider
      value={{
        userCompanies,
        companySelected,
        setCompanySelected: handleSetCompanySelected,
        currentCompany,
        companyItems,
        ordersItems: {
          all: itemsFromOrders,
          inUse: itemsInUse,
          finished: itemsFinished,
          pending: itemsPending,
          expired: itemsExpired
        },
        clients,
        orders,
        services
      }}
    >
      {children}
    </UserCompaniesContext.Provider>
  )
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
