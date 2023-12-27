import useModal from '@/hooks/useModal'
import { Button } from '@mui/material'
import Modal from '../Modal'
import AppIcon, { IconName } from '../AppIcon'
import { Order } from '@/types/order'
import OrderFormShort from './OrderFormShort'
import { Client } from '@/types/client'

const ModalOrderForm = ({
  label = 'Nueva orden',
  icon,
  handleSave,
  closeOnSave = true,
  order,
  shippingEnabled,
  disabled,
  companyId,
  shopClients
}: {
  label: string
  icon?: IconName
  handleSave?: (data: Partial<Order>) => Promise<any> | void
  closeOnSave?: boolean
  order?: Partial<Order>
  shippingEnabled?: boolean
  disabled?: boolean
  companyId: string
  shopClients: Partial<Client>[]
}) => {
  const modal = useModal({ title: 'Nueva orden' })
  return (
    <div className="">
      <Button
        fullWidth
        onClick={modal.onOpen}
        endIcon={icon ? <AppIcon icon={icon} /> : undefined}
        variant="outlined"
        disabled={disabled}
      >
        {label}
      </Button>
      <Modal {...modal}>
        <OrderFormShort
          shopClients={shopClients}
          companyId={companyId}
          shippingEnabled={shippingEnabled}
          defaultOrder={order}
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
