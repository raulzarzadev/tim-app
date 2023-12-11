import { getVisibleCompanies } from '@/firebase/companies'
import { getVisibleItems } from '@/firebase/items'
import { ArticleType } from '@/types/article'
import { CompanyType } from '@/types/company'
import { createContext, useContext, useEffect, useState } from 'react'

export type MarketContextType = {
  items: Partial<ArticleType>[]
  companies: Partial<CompanyType>[]
  onFilterTag?: (title?: string) => void
  onFilterItems?: (value?: string) => void
  filterBy?: string
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
  const [filtered, setFiltered] = useState<Partial<ArticleType>[]>([])
  const [filterBy, setFilteredBy] = useState<undefined | string>()
  const onFilterItems = (value?: string) => {
    setFilteredBy(value)
    if (!value) return setFiltered(items)
    const foundItems = items.filter((i) => {
      const byCat = !!i.category?.toLowerCase().includes(value.toLowerCase())
      // TODO: impruve the search input
      // const byCompany = !!i.company.name
      //   ?.toLowerCase()
      //   .includes(value.toLowerCase())
      const byTags = !!i.tags?.find((t) =>
        t.title.toLocaleLowerCase().includes(value?.toLowerCase() || '')
      )
      return byCat || byTags
    })
    setFiltered(foundItems)
  }
  const onFilterTag = (title?: string) => {
    setFilteredBy(title)
    if (title === 'Todos') return setFiltered(items)
    setFiltered(
      items.filter((i) => {
        if (
          i.tags?.find((t) =>
            t.title.toLocaleLowerCase().includes(title?.toLowerCase() || '')
          )
        )
          return true
      })
    )
  }

  useEffect(() => {
    getVisibleItems()
      .then((res) => {
        setItems(res)
        setFiltered(res)
      })
      .catch(console.error)

    getVisibleCompanies()
      .then((res) => {
        setCompanies(res)
      })
      .catch(console.error)
  }, [])

  return (
    <MarketContext.Provider
      value={{
        companies,
        items: filtered,
        onFilterTag,
        filterBy,
        onFilterItems
      }}
    >
      {children}
    </MarketContext.Provider>
  )
}
