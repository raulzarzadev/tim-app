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

  const [shopSelected, setShopSelected] = useState('')
  const [userOwnCompanies, setUserOwnCompanies] = useState<CompanyType[]>([])
  const [userStaffCompanies, setUserStaffCompanies] = useState<CompanyType[]>(
    []
  )
  const [orders, setOrders] = useState<Order[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [items, setItems] = useState<Partial<ArticleType>[]>([])
  const [categories, setCategories] = useState<CategoryType[]>([])

  useEffect(() => {
    const bajaRent: { selectedCompany: CompanyType['id'] } = JSON.parse(
      localStorage.getItem('baja-rent') || '{}'
    )
    setShopSelected(bajaRent.selectedCompany)
  }, [])

  useEffect(() => {
    setUserShops([...userStaffCompanies, ...userOwnCompanies])
  }, [userStaffCompanies, userOwnCompanies])

  useEffect(() => {
    const shop = [...userStaffCompanies, ...userOwnCompanies].find(
      (s) => s?.id === shopSelected
    )

    if (!shop) {
      setShopSelected(userShops[0]?.id || '')
    } else {
      setUserShop(shop || null)
    }
  }, [userStaffCompanies, userOwnCompanies, userShops, shopSelected])

  useEffect(() => {
    if (userId && userEmail) {
      listenUserCompanies(userId, setUserOwnCompanies)
      listenStaffCompanies(userEmail, setUserStaffCompanies)
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

  const handleChangeShop = (shopId: string) => {
    setShopSelected(shopId)
    const shop = userShops.find((s) => s?.id === shopId)
    setUserShop(shop)
    localStorage.setItem(
      'baja-rent',
      JSON.stringify({ selectedCompany: shopId })
    )
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
