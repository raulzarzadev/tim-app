import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import MyTable from './MyTable'
import dictionary from '@/CONSTS/dictionary'
import { fromNow } from '@/lib/utils-date'
import ServiceDetails from './ServiceDetails'

const OrderReports = ({ orderId }: { orderId: string }) => {
  const { orders, services } = useUserCompaniesContext()
  const order = orders?.find((o) => o?.id === orderId)
  const reports = order?.reports?.map((r) => services?.find((s) => s?.id === r))
  return (
    <div>
      {reports?.length === 0 && <div>No hay reportes</div>}

      <MyTable
        modalChildren={(value) => <ServiceDetails service={value} />}
        data={{
          headers: [
            {
              label: 'Creado',
              key: 'created.at',
              format: (value) => fromNow(value)
            },
            {
              label: 'Status',
              key: 'status',
              format: (value) => dictionary(value)
            }
          ],
          body: reports || []
        }}
      />
    </div>
  )
}

export default OrderReports
