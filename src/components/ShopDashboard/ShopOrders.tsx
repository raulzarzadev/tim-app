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
      <div className="flex justify-center">
        <ModalOrderForm
          shippingEnabled={shippingEnabled}
          label="Nueva orden"
          icon="order"
          closeOnSave={false}
          handleSave={async (order) => {
            try {
              if (order.id) {
                const res = await updateOrder(order.id, order)
                console.log({ res })
                return res
              } else {
                const res = await createOrder({
                  ...order,
                  companyId: shopId || ''
                })
                console.log({ res })
                return res
              }
            } catch (e) {
              console.error(e)
            }
          }}
        />
      </div>
      <ShopOrdersTabs orders={orders || []} />
    </div>
  )
}

export default ShopOrders
