import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import OrdersTable from './OrdersTable'
import BasicTabs from './BasicTabs'
import ModalOrderForm from './orders/ModalOrderForm'
import { createOrder } from '@/firebase/orders'
import { useAuthContext } from '@/context/authContext'

const StaffOrders = () => {
  const { user } = useAuthContext()
  const { orders, currentCompany } = useUserCompaniesContext()

  if (!user) return <div>Cargando...</div>
  const userOrders = orders?.filter(
    (o) => o?.shipping?.assignedToEmail === user?.email
  )
  const actives = userOrders?.filter((o) =>
    o?.items?.some((i) => i?.rentStatus === 'taken')
  )
  const pending = userOrders?.filter((o) =>
    o?.items?.some((i) => i?.rentStatus === 'pending' || !i.rentStatus)
  )
  const finished = userOrders?.filter((o) =>
    o?.items?.some((i) => i?.rentStatus === 'finished')
  )

  return (
    <div>
      <div className="flex justify-center">
        <ModalOrderForm
          handleSave={async (e) => {
            try {
              const res = await createOrder({
                ...e,
                companyId: currentCompany?.id || ''
              })
              console.log({ res })
              return res
            } catch (e) {
              console.error(e)
            }
          }}
          label="Nueva orden"
          icon="order"
        />
      </div>
      <BasicTabs
        tabs={[
          {
            label: `Pendientes ${pending?.length}`,
            content: <OrdersTable orders={pending || []} />
          },
          {
            label: `Activas ${actives?.length}`,
            content: <OrdersTable orders={actives || []} />
          },
          {
            label: `Terminadas ${finished?.length}`,
            content: <OrdersTable orders={finished || []} />
          },
          {
            label: `Todas ${userOrders?.length}`,
            content: <OrdersTable orders={userOrders || []} />
          }
        ]}
      />
    </div>
  )
}

export default StaffOrders
