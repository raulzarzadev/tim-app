import { Button } from '@mui/material'
import StaffList from './StaffList'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import StaffSpan from './StaffSpan'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { groupBy } from 'lodash'
import AccordionSections from './AccordionSections'
import { Order } from '@/types/order'
import { addDays, getDay, isSameDay, isToday, isTomorrow } from 'date-fns'
import forceAsDate from '@/lib/forceAsDate'
import { dateFormat } from '@/lib/utils-date'
import { orderStatus } from '@/lib/orderStatus'
import { Timestamp } from 'firebase/firestore'

const AssignForm = ({
  assignTo,
  assignedTo,
  assignedAt,
  handleAssign
}: {
  assignTo?: (email: string) => void | Promise<any>
  assignedTo?: string
  assignedAt?: Date | Timestamp
  handleAssign?: (email: string, date?: Date) => void
}) => {
  const modal = useModal({ title: 'Asignar responsable' })

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
        <DeliveryStaffList
          assignedAt={assignedAt}
          assignedTo={assignedTo}
          handleAssign={(email, date) => {
            handleAssign?.(email, date)
            modal.onClose()
          }}
        />
      </Modal>
    </>
  )
}

const DeliveryStaffList = ({
  handleAssign,
  assignedAt,
  assignedTo
}: {
  handleAssign?: (email: string, date?: Date) => void
  assignedTo?: string
  assignedAt?: Date | Timestamp
}) => {
  const { currentCompany, orders } = useUserCompaniesContext()
  const staff = currentCompany?.staff
  const staffOrders =
    staff?.map((staff) => {
      const staffOrders = orders
        ?.filter((order) => order?.shipping?.assignedToEmail === staff?.email)
        .filter((order) => orderStatus(order) === 'pending')
      return { ...staff, orders: staffOrders }
    }) || []
  const indexStaffSelected = staffOrders?.findIndex(
    (staff) => staff?.email === assignedTo
  )
  return (
    <>
      <div>
        <AccordionSections
          expands={indexStaffSelected}
          sections={[
            ...staffOrders?.map((staff) => ({
              title: staff?.name || '',
              subTitle: `staff?.email (${staff.orders?.length})` || '',
              content: (
                <OrdersByDays
                  orders={staff.orders || []}
                  onClickDay={(date) => {
                    handleAssign?.(staff.email || '', date)
                  }}
                  assignedAt={
                    assignedTo === staff.email ? assignedAt : undefined
                  }
                />
              )
            }))
          ]}
        />
      </div>
    </>
  )
}

const OrdersByDays = ({
  orders,
  onClickDay,
  assignedAt
}: {
  orders: Order[]
  onClickDay?: (date: Date) => void
  assignedAt?: Date | Timestamp
}) => {
  return (
    <div className=" grid  gap-2 grid-cols-4 place-content-end">
      <Day days={-1} onClickDay={onClickDay} assignedAt={assignedAt} />
      <Day
        days={0}
        label="Hoy"
        onClickDay={onClickDay}
        assignedAt={assignedAt}
      />
      <Day days={1} onClickDay={onClickDay} assignedAt={assignedAt} />
      <Day days={2} onClickDay={onClickDay} assignedAt={assignedAt} />
    </div>
  )
}
const Day = ({
  days,
  label,
  onClickDay,
  assignedAt
}: {
  days: number
  label?: string
  onClickDay?: (date: Date) => void
  assignedAt?: Date | Timestamp
}) => {
  const date = addDays(new Date(), days)
  return (
    <div>
      <button
        onClick={() => {
          onClickDay?.(date)
        }}
        className="flex flex-col justify-center items-center cursor-pointer hover:font-bold h-10"
      >
        {label && <span className="font-bold">{`(${label})`} </span>}
        {dateFormat(date, 'EEEE')}{' '}
      </button>
      {assignedAt && isSameDay(date, forceAsDate(assignedAt)) && (
        <div className="h-10 w-full bg-blue-300 "> </div>
      )}
    </div>
  )
}

export default AssignForm
