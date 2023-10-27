import useModal from '@/hooks/useModal'
import { Button } from '@mui/material'
import Modal from '../Modal'
import OrderForm from './OrderForm'
import AppIcon, { IconName } from '../AppIcon'
import { Order } from '@/types/order'

const ModalOrderForm = ({
  label,
  icon,
  handleSave,
  closeOnSave = true
}: {
  label: 'Nueva orden'
  icon?: IconName
  handleSave?: (data: Partial<Order>) => Promise<any> | void
  closeOnSave?: boolean
}) => {
  const modal = useModal({ title: 'Nueva orden' })

  return (
    <div>
      <Button
        onClick={modal.onOpen}
        endIcon={icon ? <AppIcon icon={icon} /> : undefined}
      >
        {label}
      </Button>
      <Modal {...modal}>
        <OrderForm
          handleSave={async (data) => {
            const res = await handleSave?.(data)
            closeOnSave && modal.onClose()
            return res
          }}
        />
      </Modal>
    </div>
  )
}

export default ModalOrderForm
