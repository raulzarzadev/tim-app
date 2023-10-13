import {
  ItemOrder,
  useUserCompaniesContext
} from '@/context/userCompaniesContext2'
import asDate from '@/lib/asDate'
import { calculateFullTotal } from '@/lib/calculateTotalItem'
import { isAfter } from 'date-fns'

const ItemRentStatus = ({ item }: { item: ItemOrder }) => {
  const { companyItems } = useUserCompaniesContext()
  const pending = item.rentStatus === 'pending'
  const inUse = item.rentStatus === 'taken'
  const finished = item.rentStatus === 'finished'
  const onTime = isAfter(asDate(item.rentFinishAt) || new Date(), new Date())

  const orderTotal = calculateFullTotal(
    item.order.items,
    item.order.items?.map((i) => companyItems.find((c) => c.id === i.itemId))
  )
  //* changes are paid or pending to pay
  const changesAmount =
    item?.order?.changes
      ?.map((c) => (c?.resolved ? 0 : c?.amount))
      ?.reduce((a, b) => a + b, 0) || 0
  const paymentsAmount =
    item?.order?.payments?.reduce((a, b) => a + b?.amount, 0) || 0
  const total = orderTotal - paymentsAmount + changesAmount
  console.log({ total, paymentsAmount, orderTotal, changesAmount })
  return (
    <div className="grid">
      {changesAmount !== 0 && (
        <ItemStatus
          label={`Pago pendiente $${changesAmount.toFixed(2)}`}
          status="pending"
        />
      )}
      {pending && <ItemStatus label="Engrega pendiente" status="pending" />}
      {inUse && onTime && <ItemStatus label="En uso" status="success" />}
      {inUse && !onTime && (
        <ItemStatus label="Fuera de tiempo" status="error" />
      )}

      {finished && <ItemStatus label="Terminado" status="success" />}

      {!item?.order?.payments?.length && (
        <ItemStatus label="Sin pagos" status="warning" />
      )}
    </div>
  )
}
const ItemStatus = ({
  status,
  label = ''
}: {
  status: 'error' | 'success' | 'pending' | 'warning'
  label: string
}) => {
  const statusColor = {
    error: 'bg-red-400',
    success: 'bg-green-400',
    pending: 'bg-blue-400',
    warning: 'bg-yellow-400'
  }
  return (
    <div
      className={`${statusColor[status]} w-full m-0.5 rounded-md  truncate  items-center flex justify-center text-xs shadow-md whitespace-pre-line `}
    >
      <span className=" p-[4px]">{label}</span>
    </div>
  )
}

export default ItemRentStatus
