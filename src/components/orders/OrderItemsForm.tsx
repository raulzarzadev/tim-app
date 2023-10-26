import { Button } from '@mui/material'
import Modal from '../Modal'
import useModal from '@/hooks/useModal'
import SelectCompanyItem from './SelectCompanyItem'
import { useState } from 'react'
import CheckoutItems from '../CheckoutItems'
import { ItemSelected } from '@/context/useCompanyCashbox'

const OrderItemsForm = ({
  items,
  setItems
}: {
  items?: ItemSelected[]
  setItems?: (items: ItemSelected[]) => void
}) => {
  const modalAddItem = useModal({ title: 'Agregar unidades' })
  // const [_items, _setItems] = useState<ArticleType['id'][]>(items || [])
  const [itemsSelected, setItemsSelected] = useState<ItemSelected[]>(
    items || []
  )

  const handleSetItems = (items: ItemSelected[]) => {
    setItemsSelected(items)
  }
  return (
    <div className="grid gap-4">
      <Button onClick={modalAddItem.onOpen}>Seleccionar unidades</Button>
      <Modal {...modalAddItem}>
        <SelectCompanyItem
          multiple
          itemsSelected={itemsSelected.map((i) => i.itemId || '') || []}
          setItems={(items) => {
            setItemsSelected?.(items.map((itemId) => ({ itemId })))
            modalAddItem.onClose()
          }}
        />
      </Modal>
      <CheckoutItems
        itemsSelected={itemsSelected}
        setItemsSelected={handleSetItems}
      />
      <div className="flex justify-center">
        <Button
          onClick={() => {
            //setItemsSelected?.()
            setItems?.(itemsSelected)
            modalAddItem.onClose()
          }}
        >
          Listo
        </Button>
      </div>
    </div>
  )
}

export default OrderItemsForm
