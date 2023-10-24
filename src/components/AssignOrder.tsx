import { updateOrder } from '@/firebase/orders'
import AssignForm from './AssignForm'

const AssignOrder = ({
  assignedTo,
  onAssignTo
}: {
  assignedTo?: string
  onAssignTo: (email: string) => void
}) => {
  const handleAssignTo = async (email: string) => {
    try {
      onAssignTo(email)
      // const res = await updateOrder(orderId, {
      //   'shipping.assignedToEmail': email
      // })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <AssignForm assignTo={handleAssignTo} assignedTo={assignedTo} />
    </div>
  )
}

export default AssignOrder
