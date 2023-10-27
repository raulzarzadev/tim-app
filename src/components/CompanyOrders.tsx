import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import OrdersTable from './OrdersTable'
import BasicTabs from './BasicTabs'
import ModalOrderForm from './orders/ModalOrderForm'
import { createOrder } from '@/firebase/orders'

const CompanyOrders = () => {
  const { orders, currentCompany } = useUserCompaniesContext()
  const actives = orders?.filter((o) =>
    o?.items?.some((i) => i?.rentStatus === 'taken')
  )
  const pending = orders?.filter((o) =>
    o?.items?.some((i) => i?.rentStatus === 'pending' || !i.rentStatus)
  )
  const finished = orders?.filter((o) =>
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
            label: 'Pendientes',
            content: <OrdersTable orders={pending || []} />
          },
          { label: 'Activas', content: <OrdersTable orders={actives || []} /> },
          {
            label: 'Terminadas',
            content: <OrdersTable orders={finished || []} />
          },
          { label: 'Todas', content: <OrdersTable orders={orders || []} /> }
        ]}
      />
    </div>
  )
}

export default CompanyOrders
