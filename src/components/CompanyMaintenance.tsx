'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import MyTable from './MyTable'
import ModalItemDetails from './ModalItemDetails'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import { useEffect, useState } from 'react'
import ServiceCard from './ServiceCard'
import { Service, serviceStatusLabels } from '@/types/service'
import BasicTabs from './BasicTabs'

const CompanyMaintenance = () => {
  const { services } = useUserCompaniesContext()
  const pendingServices = services?.filter((s) => s.status === 'pending')
  const inProgressServices = services?.filter((s) => s.status === 'in-progress')
  const completedServices = services?.filter((s) => s.status === 'finished')

  return (
    <div>
      <BasicTabs
        tabs={[
          {
            label: `Pendientes (${pendingServices?.length})`,
            content: <ServicesList services={pendingServices || []} />
          },
          {
            label: `En proceso (${inProgressServices?.length})`,
            content: <ServicesList services={inProgressServices || []} />
          },
          {
            label: `Terminados (${completedServices?.length})`,
            content: <ServicesList services={completedServices || []} />
          },

          {
            label: `Todos (${services?.length})`,
            content: <ServicesList services={services || []} />
          }
        ]}
      />
    </div>
  )
}

const ServicesList = ({ services }: { services: Service[] }) => {
  const modal = useModal({ title: 'Detalle de servicio' })
  const [service, setService] = useState<Service | undefined>(undefined)
  const onRowClick = (id: string) => {
    modal.onOpen()
    setService(services?.find((s) => s.id === id))
  }

  //* update modal  just when the status inside the service selected changes
  const serviceSelected = services?.find((s) => s.id === service?.id)
  useEffect(() => {
    setService(services.find((s) => s.id === service?.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceSelected?.assignedToEmail, serviceSelected?.status])

  return (
    <>
      {service && (
        <Modal {...modal}>
          <ServiceCard service={service} />
        </Modal>
      )}
      <MyTable
        onRowClick={onRowClick}
        data={{
          headers: [
            {
              label: 'Unidad',
              key: 'itemId',
              format: (value) => {
                return <ModalItemDetails itemId={value} />
              }
            },
            { label: 'Razon', key: 'reason' },
            {
              label: 'Status ',
              key: 'status',
              format: (value: Service['status']) =>
                serviceStatusLabels?.[value] || '-'
            }
          ],
          body: services || []
        }}
      />
    </>
  )
}

export default validatePermissions(CompanyMaintenance, 'MAINTENANCE')
