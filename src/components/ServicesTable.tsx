import { Service, serviceStatusLabels } from '@/types/service'
import Modal from './Modal'
import ServiceCard from './ServiceCard'
import MyTable from './MyTable'
import ModalItemDetails from './ModalItemDetails'
import { useEffect, useState } from 'react'
import useModal from '@/hooks/useModal'

const ServicesTable = ({ services }: { services: Service[] }) => {
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
  }, [
    serviceSelected?.assignedToEmail,
    serviceSelected?.status,
    serviceSelected?.comments?.length
  ])

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
                return <ModalItemDetails itemId={value} showCat />
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
export default ServicesTable
