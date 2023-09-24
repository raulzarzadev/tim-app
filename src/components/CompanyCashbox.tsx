'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { ArticleType } from '@/types/article'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState
} from 'react'
import Checkout from './Checkout2'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PriceType } from './PricesForm'
import Categories from './Categories'

export type CashboxContext = {
  items?: ItemSelected[]
  setItems?: Dispatch<SetStateAction<ItemSelected[]>>
  addItem?: (item: ItemSelected) => void
  removeItem?: (itemId: ArticleType['id']) => void
  updateItem?: (
    itemId: ItemSelected['itemId'],
    { qty, unit }: { qty: number; unit: PriceType['unit'] }
  ) => void
}
export const CashboxContext = createContext<CashboxContext>({})
export type ItemSelected = {
  itemId: ArticleType['id']
  qty?: number
  unit?: PriceType['unit']
}

export const CashboxContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [items, setItems] = useState<ItemSelected[]>([])

  useEffect(() => {
    searchParams.get('items') &&
      setItems(JSON.parse(searchParams.get('items') || '[]'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    params.set('items', JSON.stringify(items))
    router.replace(pathname + '?' + params, { scroll: false })
  }, [items, pathname, router])

  const removeItem = (articleId: ArticleType['id']) => {
    setItems((items) => items.filter((item) => item.itemId !== articleId))
  }

  const addItem = (item: ItemSelected) => {
    setItems((items) => [...items, item])
  }

  const updateItem = (
    itemId: ItemSelected['itemId'],
    { qty, unit }: { qty: number; unit: PriceType['unit'] }
  ) => {
    setItems((items) =>
      items.map((item) =>
        item.itemId === itemId ? { ...item, qty, unit } : item
      )
    )
  }

  return (
    <CashboxContext.Provider
      value={{ items, setItems, removeItem, addItem, updateItem }}
    >
      {children}
    </CashboxContext.Provider>
  )
}
const CompanyCashbox = () => {
  const { currentCompany } = useUserCompaniesContext()
  return (
    <div className="">
      <CashboxContextProvider>
        <Categories />
        <Checkout
          items={currentCompany?.articles}
          categories={currentCompany?.categories}
          // selected={articles}
        />
      </CashboxContextProvider>
    </div>
  )
}

export default validatePermissions(CompanyCashbox, 'CASHBOX')
