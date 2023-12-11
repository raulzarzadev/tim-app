import { getVisibleCompanies } from '@/firebase/companies'
import { getVisibleItems } from '@/firebase/items'
import { ArticleType } from '@/types/article'
import { CompanyType } from '@/types/company'
import { createContext, useContext, useEffect, useState } from 'react'

export type MarketContextType = {
  items: Partial<ArticleType>[]
  companies: Partial<CompanyType>[]
}
export const MarketContext = createContext<MarketContextType>({
  items: [],
  companies: []
})

export default function useMarketContext() {
  return useContext(MarketContext)
}

export const MarketProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Partial<ArticleType>[]>([])
  const [companies, setCompanies] = useState<Partial<CompanyType>[]>([])
  useEffect(() => {
    getVisibleItems()
      .then((res) => {
        setItems(res)
      })
      .catch(console.error)

    getVisibleCompanies()
      .then((res) => {
        setCompanies(res)
      })
      .catch(console.error)
  }, [])
  return (
    <MarketContext.Provider value={{ companies, items }}>
      {children}
    </MarketContext.Provider>
  )
}
