import { Service, serviceStatusLabels } from '@/types/service'
import ServiceDetails from './ServiceDetails'
import { Box, Button } from '@mui/material'
import ModalConfirm from './ModalConfirm'
import StaffList from './StaffList'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import { updateService } from '@/firebase/services'
import ServiceComments from './ServiceComments'

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <div>
      <ServiceDetails service={service} />
      <Box className="grid gap-2 sm:flex w-full justify-evenly my-6">
        <AssignService
          serviceId={service.id}
          assignedToEmail={service.assignedToEmail}
        />
        <ChangeStatus serviceId={service.id} status={service.status} />
      </Box>
      <ServiceComments serviceId={service.id} comments={service.comments} />
    </div>
  )
}

const ChangeStatus = ({
  serviceId,
  status
}: {
  serviceId: string
  status: Service['status']
}) => {
  const pending = status === 'pending'
  const inProgress = status === 'in-progress'
  const finished = status === 'finished'

  return (
    <>
      <ButtonChangeStatusTo
        newStatus="pending"
        serviceId={serviceId}
        selected={pending}
      />
      <ButtonChangeStatusTo
        newStatus="in-progress"
        serviceId={serviceId}
        selected={inProgress}
      />
      <ButtonChangeStatusTo
        newStatus="finished"
        serviceId={serviceId}
        selected={finished}
      />
    </>
  )
}

const ButtonChangeStatusTo = ({
  newStatus,
  serviceId,
  selected
}: {
  newStatus: Service['status']
  serviceId: string
  selected?: boolean
}) => {
  const setServiceStatus = async (
    serviceId: string,
    status: Service['status']
  ) => {
    const res = await updateService(serviceId, { status })
    console.log({ res })
  }
  return (
    <Button
      disabled={selected}
      variant={selected ? 'contained' : 'outlined'}
      onClick={() => setServiceStatus(serviceId, newStatus)}
    >
      {serviceStatusLabels[newStatus]}
    </Button>
  )
}

const AssignService = ({
  serviceId,
  assignedToEmail
}: {
  serviceId: string
  assignedToEmail?: string
}) => {
  const handleAssign = async (email: string) => {
    try {
      await updateService(serviceId, { assignedToEmail: email })
    } catch (error) {
      console.error(error)
    }
    modal.onClose()
  }
  const modal = useModal({ title: 'Asignar responsable' })
  return (
    <>
      <Button onClick={modal.onOpen}>
        {assignedToEmail ? 'Asiganado' : 'Asignar'}
      </Button>
      <Modal {...modal}>
        <StaffList simple onClick={handleAssign} />
      </Modal>
    </>
  )
}

export default ServiceCard
