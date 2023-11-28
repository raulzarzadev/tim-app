import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import ModalOrderForm from './orders/ModalOrderForm'
import { createOrder, updateOrder } from '@/firebase/orders'
import OrdersTabs from './OrdersTabs'

const CompanyOrders = () => {
  const { orders, currentCompany } = useUserCompaniesContext()
  // console.log({ orders })
  // if (orders?.length === 0) return <div>Cargando ordenes</div>
  return (
    <div>
      <div className="flex justify-center">
        <ModalOrderForm
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
          label="Nueva orden"
          icon="order"
        />
      </div>
      <OrdersTabs orders={orders || []} />
    </div>
  )
}

export default CompanyOrders
