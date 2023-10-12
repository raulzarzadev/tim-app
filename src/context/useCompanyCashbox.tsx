'use client'
import { ArticleType } from '@/types/article'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createOrder, onPayOrder } from '@/firebase/orders'
import { Order, Shipping } from '@/types/order'
import { PriceType } from '@/components/PricesForm'
import { Payment } from '@/types/order'
import { useUserCompaniesContext } from './userCompaniesContext2'

export type CashboxContext = {
  itemsSelected?: ItemSelected[]
  setItemsSelected?: Dispatch<SetStateAction<ItemSelected[]>>
  addItem?: (item: ItemSelected) => void
  removeItem?: (itemId: ArticleType['id']) => void
  updateItem?: (
    itemId: ItemSelected['itemId'],
    { qty, unit }: { qty: number; unit: PriceType['unit'] }
  ) => void
  handleOrder?: (order: { companyId: string }) => void | Promise<unknown>
  handlePay?: (payment: Partial<Payment>) => void | Promise<any>
  onClearOrder?: () => void
  setClient?: (client: Partial<Order['client']>) => void
  client?: Partial<Order['client']>
  shipping?: Partial<Order['shipping']>
  setShipping?: Dispatch<SetStateAction<Shipping>>
  orderSaved?: boolean | string
  setOrderSaved?: Dispatch<SetStateAction<boolean | string>>
}
export const CashboxContext = createContext<CashboxContext>({})
export type ItemSelected = {
  itemId?: ArticleType['id']
  qty?: number
  unit?: PriceType['unit']
  inUse?: boolean
  rentStatus?: 'pending' | 'taken' | 'finished'
}

export const CashboxContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { currentCompany } = useUserCompaniesContext()

  const [itemsSelected, setItemsSelected] = useState<ItemSelected[]>([])
  const [client, setClient] = useState<Partial<Order['client']>>({
    phone: '',
    email: '',
    name: ''
  })
  const [shipping, setShipping] = useState<Shipping>({
    address: 'store',
    date: new Date()
  })

  useEffect(() => {
    searchParams.get('items') &&
      setItemsSelected(JSON.parse(searchParams.get('items') || '[]'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    params.set('items', JSON.stringify(itemsSelected))
    router.replace(pathname + '?' + params, { scroll: false })
  }, [itemsSelected, pathname, router])

  const removeItem = (articleId: ArticleType['id']) => {
    setItemsSelected((items) =>
      items.filter((item) => item.itemId !== articleId)
    )
  }

  const addItem = (item: ItemSelected) => {
    const newItem = {
      ...item,
      qty: item.qty ?? 0,
      unit: item.unit ?? ''
    }
    setItemsSelected((items) => [...items, newItem])
  }

  const updateItem = (
    itemId: ItemSelected['itemId'],
    { qty, unit = '' }: { qty: number; unit: PriceType['unit'] }
  ) => {
    setItemsSelected((items) =>
      items.map((item) =>
        item.itemId === itemId ? { ...item, qty, unit } : item
      )
    )
  }

  const handlePay = async (payment: Partial<Payment>) => {
    if (typeof orderSaved === 'string') {
      return await onPayOrder(orderSaved, payment)
    } else {
      const order = await handleOrder({
        companyId: currentCompany?.id || ''
      })
      if (order?.res.id) {
        return await onPayOrder(order?.res.id, payment)
      }
    }
  }
  const handleOrder = async (order: { companyId: string }) => {
    return await createOrder({
      ...order,
      items: itemsSelected,
      client,
      shipping
    })
  }
  const [orderSaved, setOrderSaved] = useState<boolean | string>(false)
  const onClearOrder = () => {
    setItemsSelected([])
    setClient({})
    setShipping({})
    setOrderSaved(false)
  }
  return (
    <CashboxContext.Provider
      value={{
        itemsSelected,
        setItemsSelected,
        removeItem,
        addItem,
        updateItem,
        handlePay,
        client,
        setClient,
        handleOrder,
        onClearOrder,
        shipping,
        setShipping,
        orderSaved,
        setOrderSaved
      }}
    >
      {children}
    </CashboxContext.Provider>
  )
}

export default function useCashboxContext() {
  const cashboxContext = useContext(CashboxContext)
  return cashboxContext
}
