'use client'

import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import CompanyPublicDetails from './CompanyPublicDetails'
import { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'
import MarketGrid from './MarketGrid'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import ItemsTable from './ItemsTable'
import { getCompanyMarketItems } from '@/firebase/items'
import { ArticleType } from '@/types/article'
import { MarketProvider } from '@/context/marketContext'

const CompanyStore = () => {
  const { currentCompany } = useUserCompaniesContext()
  if (!currentCompany) return <>Cargando ...</>
  return (
    <div>
      <CompanyPublicDetails company={currentCompany} />
      <CompanyStoreItems />
    </div>
  )
}

const CompanyStoreItems = () => {
  const { currentCompany } = useUserCompaniesContext()
  const [items, setItems] = useState<undefined | null | ArticleType[]>(
    undefined
  )
  useEffect(() => {
    getCompanyMarketItems(currentCompany?.id || '')
      .then((res) => {
        if (!res?.length) setItems(null)
        setItems(res)
      })
      .catch(console.error)
  }, [])

  const modal = useModal({ title: 'Mostrar items en tienda' })
  if (items === undefined) return <>Cargando ...</>

  return (
    <div>
      <div className="flex justify-center">
        <Button onClick={modal.onOpen}>Mostrar items</Button>
        <Modal {...modal}>
          <ItemsTable items={currentCompany?.articles || []} itemActions />
        </Modal>
      </div>
      {!items?.length ? (
        <Typography>No hay items en exhibición</Typography>
      ) : (
        <MarketGrid
          items={
            items.map((i) => ({
              ...i,
              title: i.category,
              img: i.image || '',
              companyId: currentCompany?.id || '',
              company: currentCompany
            })) || []
          }
        />
      )}
      {/* <MarketGrid items={items} /> */}
    </div>
  )
}

export default CompanyStore
