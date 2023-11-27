import { Button, Typography } from '@mui/material'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import StaffSpan from './StaffSpan'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import AccordionSections from './AccordionSections'
import { Order } from '@/types/order'
import { addDays, addHours, isSameDay } from 'date-fns'
import forceAsDate from '@/lib/forceAsDate'
import { dateFormat } from '@/lib/utils-date'
import { orderStatus } from '@/lib/orderStatus'
import { Timestamp } from 'firebase/firestore'
import { useState } from 'react'

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
    <div className="flex w-full justify-center ">
      <Button onClick={modal.onOpen} variant="contained" fullWidth>
        {assignedTo ? (
          <span>
            Asignado a: <StaffSpan email={assignedTo || ''} />
          </span>
        ) : (
          'Asignar'
        )}
      </Button>

      <Modal {...modal}>
        <DeliveryStaffList
          assignedAt={assignedAt}
          assignedTo={assignedTo}
          handleAssign={(email, date) => {
            handleAssign?.(email, date)
            // modal.onClose()
          }}
        />
        <div className="flex justify-center mt-6">
          <Button onClick={modal.onClose} variant="outlined">
            Listo
          </Button>
        </div>
      </Modal>
    </div>
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
        <Button onClick={() => handleAssign?.('')}>Sin responsable</Button>
        <AccordionSections
          expands={indexStaffSelected}
          sections={[
            ...staffOrders?.map((staff) => ({
              title: staff?.name || '',
              subTitle: `${staff?.email} (${staff.orders?.length})` || '',
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
  onClickDay?: (date?: Date) => void
  assignedAt?: Date | Timestamp
}) => {
  return (
    <div>
      <div className="flex justify-center">
        <Button onClick={() => onClickDay?.()}>asignar sin fecha</Button>
      </div>
      <div className=" grid  gap-2 grid-cols-3 sm:grid-cols-7 place-content-end">
        <Day
          days={-1}
          onClickDay={onClickDay}
          assignedAt={assignedAt}
          orders={orders}
        />
        <Day
          days={0}
          label="Hoy"
          onClickDay={(date) => {
            //* this extra hours avoid that item rent status sets to taken when order is saved
            onClickDay?.(addHours(date, 2))
          }}
          assignedAt={assignedAt}
          orders={orders}
        />
        <Day
          days={1}
          onClickDay={onClickDay}
          assignedAt={assignedAt}
          orders={orders}
        />
        <Day
          days={2}
          onClickDay={onClickDay}
          assignedAt={assignedAt}
          orders={orders}
        />
        <Day
          days={3}
          onClickDay={onClickDay}
          assignedAt={assignedAt}
          orders={orders}
        />
        <Day
          days={4}
          onClickDay={onClickDay}
          assignedAt={assignedAt}
          orders={orders}
        />
        <Day
          days={5}
          onClickDay={onClickDay}
          assignedAt={assignedAt}
          orders={orders}
        />
      </div>
    </div>
  )
}
const Day = ({
  days,
  label,
  onClickDay,
  assignedAt,
  orders
}: {
  days: number
  label?: string
  onClickDay?: (date: Date) => void
  assignedAt?: Date | Timestamp
  orders?: Order[]
}) => {
  const date = addDays(new Date(), days)
  // const assigning = <div>Asignando</div>
  const [assigning, setAssigning] = useState(false)
  const handleAssign = () => {
    onClickDay?.(date)
    setAssigning(true)
    setTimeout(() => {
      setAssigning(false)
    }, 500)
  }
  return (
    <div>
      <button
        onClick={() => {
          handleAssign()
        }}
        className="flex flex-col justify-center items-center cursor-pointer hover:font-bold h-10"
      >
        {label && <span className="font-bold">{`(${label})`} </span>}
        {dateFormat(date, 'EEEE')}{' '}
      </button>
      {assignedAt && isSameDay(date, forceAsDate(assignedAt)) && (
        <div className="h-10 w-full bg-blue-300 mt-2"></div>
      )}
      <div className="h-2  ">
        <span className="text-xs ">{assigning && 'Asingando...'}</span>
      </div>

      {orders?.map((order) => (
        <div key={order.id}>
          {isSameDay(date, forceAsDate(order.shipping.date)) && (
            <div className="h-10 w-full bg-green-800 mt-2 flex justify-center items-center p-1 text-white ">
              <Typography className="text-center truncate">
                {order.client.name}
              </Typography>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default AssignForm
