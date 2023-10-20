'use client'

import { listenStaffCompanies, listenUserCompanies } from '@/firebase/companies'
import { CompanyType } from '@/types/company'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { useAuthContext } from './authContext'
import { StaffPermission } from '@/types/staff'

import { PriceType } from '@/components/PricesForm'
import { Timestamp } from 'firebase/firestore'
import rentTime from '@/lib/rentTime'
import { addMinutes, isAfter } from 'date-fns'
import asDate from '@/lib/asDate'
import { Order } from '@/types/order'
import { listenCompanyOrders } from '@/firebase/orders'
import { CompanyItem } from '@/types/article'
import asNumber from '@/lib/asNumber'
import { ItemSelected } from './useCompanyCashbox'
import forceAsDate from '@/lib/forceAsDate'

export type ContextItem = ItemSelected & {
  order: Order
}

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

  ordersItems: {
    all: ItemOrder[]
    inUse: ItemOrder[]
    finished: ItemOrder[]
    pending: ItemOrder[]
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
  const handleSetCompanySelected = (companySelectedId: string) => {
    localStorage.setItem(
      'baja-rent',
      JSON.stringify({ selectedCompany: companySelectedId })
    )
    setCompanySelected(companySelectedId)
  }
  const companyItems =
    currentCompany?.articles?.map((i) => ({
      ...i,
      prices: i.ownPrice
        ? i.prices
        : currentCompany?.categories?.find((c) => c.name === i.category)?.prices
    })) || []

  const calculateFinishRentDate = (
    rentDate: Date | null,
    qty?: number | string,
    unit?: PriceType['unit']
  ): Date | null => {
    if (!rentDate) {
      return null
    }
    const rentMinutes = rentTime(asNumber(qty), unit)
    return addMinutes(rentDate, rentMinutes)
  }

  const itemsFromOrders: ItemOrder[] = orders
    .map((order) =>
      order.items.map((orderItem) => {
        const fullItem = companyItems.find((i) => i.id === orderItem?.itemId)
        const prices = fullItem?.ownPrice
          ? fullItem.prices
          : currentCompany?.categories?.find(
              (c) => c.name === fullItem?.category
            )?.prices
        const shippingDate = forceAsDate(order.shipping.date)
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
    .flat()

  const itemsInUse = itemsFromOrders.filter(
    (i) => i.inUse || i.rentStatus === 'taken'
  )

  const itemsFinished = itemsFromOrders.filter(
    (i) => i.rentStatus === 'finished'
  )

  const itemsPending = itemsFromOrders.filter((i) => i.rentStatus === 'pending')

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
          pending: itemsPending
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
