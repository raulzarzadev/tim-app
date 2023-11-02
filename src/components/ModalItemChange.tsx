import useModal from '@/hooks/useModal'
import ChangeItem from './ChangeItem'
import Modal from './Modal'

const ModalItemChange = ({
  addItem,
  removeItem,
  item,
  priceSelected
}: {
  addItem?: (item: any) => void
  removeItem?: (itemId: string) => void
  item: any
  modalChangeItem: any
  priceSelected: any
}) => {
  const modalChangeItem = useModal({ title: 'Cambiar articulo' })

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault()
          modalChangeItem.onOpen()
        }}
      >
        {item?.serialNumber || item?.name}
      </button>
      <Modal {...modalChangeItem}>
        <ChangeItem
          item={item}
          cashboxChange={(newItem) => {
            addItem?.({
              inUse: true,
              qty: priceSelected?.quantity,
              unit: priceSelected?.unit,
              itemId: newItem,
              rentStatus: 'taken'
            })
            removeItem?.(item.id || '')
          }}
        />
      </Modal>
    </div>
  )
}

export default ModalItemChange
