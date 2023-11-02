import { Button } from '@mui/material'
import StaffList from './StaffList'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import StaffSpan from './StaffSpan'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { groupBy } from 'lodash'
import AccordionSections from './AccordionSections'
import { Order } from '@/types/order'
import { addDays, getDay, isToday, isTomorrow } from 'date-fns'
import forceAsDate from '@/lib/forceAsDate'
import { dateFormat } from '@/lib/utils-date'
import { orderStatus } from '@/lib/orderStatus'

const AssignForm = ({
  assignTo,
  assignedTo
}: {
  assignTo: (email: string) => void | Promise<any>
  assignedTo?: string
}) => {
  const modal = useModal({ title: 'Asignar responsable' })
  const handleAssign = async (email: string) => {
    assignTo(email)
    modal.onClose()
  }

  return (
    <>
      <Button onClick={modal.onOpen}>
        {assignedTo ? (
          <span>
            Asignado a: <StaffSpan email={assignedTo || ''} />
          </span>
        ) : (
          'Asignar'
        )}
      </Button>

      <Modal {...modal}>
        {/* <StaffList simple onClick={(staffEmail) => handleAssign(staffEmail)} /> */}
        <DeliveryStaffList />
      </Modal>
    </>
  )
}

const DeliveryStaffList = () => {
  const { currentCompany, orders } = useUserCompaniesContext()
  const staff = currentCompany?.staff
  const staffOrders =
    staff?.map((staff) => {
      const staffOrders = orders
        ?.filter((order) => order?.shipping?.assignedToEmail === staff?.email)
        .filter((order) => orderStatus(order) === 'pending')
      return { ...staff, orders: staffOrders }
    }) || []
  console.log({ staffOrders })
  return (
    <>
      <div>
        <AccordionSections
          sections={[
            ...staffOrders?.map((staff) => ({
              title: staff?.name || '',
              subTitle: `staff?.email (${staff.orders?.length})` || '',
              content: <OrdersByDays orders={staff.orders || []} />
            }))
          ]}
        />
      </div>
    </>
  )
}

const OrdersByDays = ({
  orders,
  onClickDay
}: {
  orders: Order[]
  onClickDay?: (date: Date) => void
}) => {
  const ordersForToday = orders.filter((order) =>
    isToday(forceAsDate(order?.shipping?.date))
  )
  const ordersForTomorrow = orders.filter((order) =>
    isTomorrow(forceAsDate(order?.shipping?.date))
  )
  console.log({ ordersForToday, ordersForTomorrow })

  return (
    <div className=" flex place-items-end justify-between">
      <Day days={-1} onClickDay={onClickDay} />
      <Day days={0} label="Hoy" onClickDay={onClickDay} />
      <Day days={1} onClickDay={onClickDay} />
      <Day days={2} onClickDay={onClickDay} />
    </div>
  )
}
const Day = ({
  days,
  label,
  onClickDay
}: {
  days: number
  label?: string
  onClickDay?: (date: Date) => void
}) => {
  const date = addDays(new Date(), days)
  return (
    <button
      onClick={() => {
        onClickDay?.(date)
      }}
      className="flex flex-col justify-center items-center cursor-pointer hover:font-bold"
    >
      {label && <span className="font-bold">{`(${label})`} </span>}
      {dateFormat(date, 'EEEE')}{' '}
    </button>
  )
}

export default AssignForm
