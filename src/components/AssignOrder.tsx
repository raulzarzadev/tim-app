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
    } catch (error) {
      console.error(error)
    }
  }
  return <AssignForm assignTo={handleAssignTo} assignedTo={assignedTo} />
}

export default AssignOrder
