import { Button, Typography } from '@mui/material'
import Modal from '../Modal'
import useModal from '@/hooks/useModal'
import SelectCompanyItem from './SelectCompanyItem'
import { useState } from 'react'
import { ArticleType } from '@/types/article'

const OrderItemsForm = () => {
  const modalAddItem = useModal({ title: 'Agregar unidades' })
  const [items, setItems] = useState<ArticleType['id'][]>([])
  return (
    <div>
      <Button onClick={modalAddItem.onOpen}>Agregar unidades</Button>
      <Modal {...modalAddItem}>
        <SelectCompanyItem
          multiple
          itemsSelected={items}
          setItems={(items) => {
            setItems(items)
            modalAddItem.onClose()
          }}
        />
      </Modal>
      {items.map((item) => (
        <Typography key={item}>{item}</Typography>
      ))}
    </div>
  )
}

export default OrderItemsForm
