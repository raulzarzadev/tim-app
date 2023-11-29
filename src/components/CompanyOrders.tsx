import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import ModalOrderForm from './orders/ModalOrderForm'
import { createOrder, updateOrder } from '@/firebase/orders'
import OrdersTabs from './OrdersTabs'

const CompanyOrders = () => {
  const { orders, currentCompany } = useUserCompaniesContext()

  return (
    <div>
      <div className="flex justify-center">
        <ModalOrderForm
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
                  companyId: currentCompany?.id || ''
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
      <OrdersTabs orders={orders || []} />
    </div>
  )
}

export default CompanyOrders
