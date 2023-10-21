import {
  ItemOrder,
  useUserCompaniesContext
} from '@/context/userCompaniesContext2'
import MyTable from './MyTable'
import ErrorBoundary from './ErrorBoundary'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { ArticleType } from '@/types/article'
import ArticleDetails from './ArticleDetails'
import AppIcon from './AppIcon'
import ModalFixItem from './ModalFixItem'

const CategoryItems = ({ categoryName }: { categoryName: string }) => {
  const { currentCompany, ordersItems } = useUserCompaniesContext()
  const items = currentCompany?.articles
    ?.filter((i) => i.category === categoryName)
    .map((i) => ({
      ...i,
      inUse: ordersItems.inUse.some((o) => o.itemId === i.id)
    }))
  const [item, setItem] = useState<
    (ArticleType & { inUse: boolean }) | undefined
  >(undefined)
  const modal = useModal({
    title: `Detalle de ${categoryName}-${item?.serialNumber || item?.name}`
  })
  const onRowClick = (id: string) => {
    modal.onOpen()
    setItem(items?.find((i) => i.id === id))
  }
  return (
    <div>
      <ErrorBoundary componentName="CategoryItems">
        <MyTable
          data={{
            headers: [
              { label: 'Serie', key: 'serialNumber' },
              { label: 'Nombre', key: 'name' },
              { label: 'Color', key: 'color' },
              {
                label: 'En uso',
                key: 'inUse',
                format(value) {
                  return value && 'En uso'
                }
              }
            ],
            body: items || []
          }}
          onRowClick={onRowClick}
        ></MyTable>
        <Modal {...modal}>
          <ArticleDetails article={item} />
          <ModalFixItem
            companyId={currentCompany?.id || ''}
            itemId={item?.id || ''}
          />
        </Modal>
      </ErrorBoundary>
    </div>
  )
}

export default CategoryItems
