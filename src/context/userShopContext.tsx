'use client'

import { CompanyType } from '@/types/company'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './authContext'
import { listenStaffCompanies, listenUserCompanies } from '@/firebase/companies'
import { CategoryType } from '@/types/category'
import { ArticleType } from '@/types/article'
import { Client } from '@/types/client'
import { Order } from '@/types/order'
import { listenCompanyCategoriesShop } from '@/firebase/categories'
import { listenCompanyItems } from '@/firebase/items'
import { itemStatus } from '@/lib/itemStatus'
import { listenCompanyClients } from '@/firebase/clients'
import { listenCompanyOrders } from '@/firebase/orders'

export type UserShopContext = {
  userShop?: Partial<CompanyType> | null
  handleChangeShop?: (shopId: string) => void
  userShops?: UserShopContext['userShop'][]
}

export const UserShopContext = createContext<Partial<UserShopContext>>({})

export function useUserShopContext() {
  return useContext(UserShopContext)
}

export function UserShopProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext()
  const userId = user?.id || ''
  const userEmail = user?.email || ''

  const [userShops, setUserShops] = useState<UserShopContext['userShop'][]>([])
  const [userShop, setUserShop] = useState<UserShopContext['userShop'] | null>(
    undefined
  )

  const [shopSelected, setShopSelected] = useState<string | null | undefined>()
  const [userOwnCompanies, setUserOwnCompanies] = useState<CompanyType[]>([])
  const [userStaffCompanies, setUserStaffCompanies] = useState<CompanyType[]>(
    []
  )
  const [orders, setOrders] = useState<Order[] | null>()
  const [clients, setClients] = useState<Client[] | null>()
  const [items, setItems] = useState<Partial<ArticleType>[] | null>()
  const [categories, setCategories] = useState<CategoryType[] | null>()

  useEffect(() => {
    if (userShops.length > 0) {
      const currentShopId = (): string | null | undefined => {
        const bajaRent: { selectedCompany?: CompanyType['id'] } = JSON.parse(
          localStorage.getItem('baja-rent') || '{}'
        )
        const localStorageShopId = bajaRent.selectedCompany || ''
        const ownCompany = userShops.find((s) => s?.userId === user?.id)
        const localStorageShop = userShops.find(
          (s) => s?.id === localStorageShopId
        )
        if (localStorageShop) {
          return localStorageShopId
        } else {
          if (ownCompany) {
            return ownCompany?.id
          } else {
            return null
          }
        }
      }
      const shopId = currentShopId()
      setShopSelected(shopId)
      handleChangeShop(shopId)
    } else {
      setShopSelected(null)
    }
    // const bajaRent: { selectedCompany: CompanyType['id'] } = JSON.parse(
    //   localStorage.getItem('baja-rent') || '{}'
    // )
    // const localStorageShopId = bajaRent.selectedCompany || ''
    // const ownCompany = userShops.find((s) => s?.userId === user?.id)
    // if (localStorageShopId) {
    //   const userShopExists = userShops.find((s) => s?.id === localStorageShopId)
    //   if (userShopExists) {
    //     setShopSelected(localStorageShopId)
    //   } else {
    //     if (ownCompany) {
    //       setShopSelected(ownCompany?.id ?? '')
    //     } else {
    //       setShopSelected(null)
    //     }
    //   }
    // } else {
    //   if (ownCompany) {
    //     setShopSelected(ownCompany?.id)
    //   } else {
    //     setShopSelected(null)
    //   }
    // }
    // setShopSelected(currentShopId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, userShops])

  useEffect(() => {
    setUserShops([...userStaffCompanies, ...userOwnCompanies])
  }, [userStaffCompanies, userOwnCompanies])

  // useEffect(() => {
  //   const shop = [...userStaffCompanies, ...userOwnCompanies].find(
  //     (s) => s?.id === shopSelected
  //   )

  //   if (!shop) {
  //     setShopSelected(userShops[0]?.id || '')
  //   } else {
  //     setUserShop(shop || null)
  //   }
  // }, [userStaffCompanies, userOwnCompanies, userShops, shopSelected])

  useEffect(() => {
    if (userId && userEmail) {
      listenUserCompanies(userId, setUserOwnCompanies)
      listenStaffCompanies(userEmail, (res: CompanyType[]) =>
        setUserStaffCompanies(res.filter((s) => s?.userId !== userId))
      )
    }
  }, [userId, userEmail])

  useEffect(() => {
    if (userId && shopSelected) {
      listenCompanyClients(shopSelected || '', setClients)
      listenCompanyOrders(shopSelected || '', setOrders)
      listenCompanyCategoriesShop(shopSelected || '', setCategories)
    }
  }, [userId, shopSelected])

  useEffect(() => {
    const formatItems = (items: ArticleType[]) => {
      return items.map((i) => {
        const status = itemStatus(i.id, { companyOrders: orders }).status
        i.rentStatus = status
        return i
      })
    }
    if (userId && shopSelected)
      listenCompanyItems(shopSelected || '', (items: ArticleType[]) => {
        setItems(formatItems(items))
      })
  }, [orders, shopSelected, userId])

  const handleChangeShop = (shopId?: string | null) => {
    const shop = userShops.find((s) => s?.id === shopId)
    localStorage.setItem(
      'baja-rent',
      JSON.stringify({ selectedCompany: shopId || '' })
    )
    setShopSelected(shopId)
    setUserShop(shop || null)
  }

  const fullUserShop = userShop && {
    ...userShop,
    clients,
    orders,
    items,
    categories
  }
  return (
    <UserShopContext.Provider
      value={{ userShop: fullUserShop, handleChangeShop, userShops }}
    >
      {children}
    </UserShopContext.Provider>
  )
}
