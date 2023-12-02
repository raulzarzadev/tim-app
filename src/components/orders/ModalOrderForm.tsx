import useModal from '@/hooks/useModal'
import { Button } from '@mui/material'
import Modal from '../Modal'
import OrderForm from './OrderForm'
import AppIcon, { IconName } from '../AppIcon'
import { Order } from '@/types/order'
import { ArticleType } from '@/types/article'
import { CategoryType } from '@/types/category'

const ModalOrderForm = ({
  label = 'Nueva orden',
  icon,
  handleSave,
  closeOnSave = true,
  order,
  shippingEnabled,
  companyItems,
  companyCategories
}: {
  label: string
  icon?: IconName
  handleSave?: (data: Partial<Order>) => Promise<any> | void
  closeOnSave?: boolean
  order?: Partial<Order>
  shippingEnabled?: boolean
  companyItems?: Partial<ArticleType>[]
  companyCategories?: Partial<CategoryType>[]
}) => {
  const modal = useModal({ title: 'Nueva orden' })
  return (
    <>
      <Button
        fullWidth
        onClick={modal.onOpen}
        endIcon={icon ? <AppIcon icon={icon} /> : undefined}
      >
        {label}
      </Button>
      <Modal {...modal}>
        <OrderForm
          companyItems={companyItems}
          companyCategories={companyCategories}
          shippingEnabled={shippingEnabled}
          defaultOrder={order}
          handleSave={async (data) => {
            const res = await handleSave?.(data)
            closeOnSave && modal.onClose()
            return res
          }}
        />
      </Modal>
    </>
  )
}

export default ModalOrderForm
