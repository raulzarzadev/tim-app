import ModalOrderForm from '../orders/ModalOrderForm'
import { createOrder, updateOrder } from '@/firebase/orders'
import { CompanyType } from '@/types/company'
import ShopOrdersTabs from './ShopOrdersTabs'

const ShopOrders = ({ shop }: { shop: Partial<CompanyType> }) => {
  const shippingEnabled = shop?.shippingEnabled
  const shopId = shop?.id
  const orders = shop?.orders
  return (
    <div>
      <div className="flex justify-center my-4">
        <ModalOrderForm
          shopClients={shop?.clients || []}
          companyId={shopId || ''}
          shippingEnabled={shippingEnabled}
          label={`Nueva orden `}
          icon="order"
          closeOnSave={false}
          handleSave={async (order) => {
            console.log({ order })
            if (order.id) {
              await updateOrder(order.id, order)
                .then(console.log)
                .catch(console.error)
            } else {
              await createOrder({
                ...order,
                companyId: shopId || ''
              })
                .then(console.log)
                .catch(console.error)
            }
          }}
        />
      </div>
      <ShopOrdersTabs orders={orders || []} />
    </div>
  )
}

export default ShopOrders
