'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import MyTable from './MyTable'
import ModalItemDetails from './ModalItemDetails'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import { useState } from 'react'
import ServiceCard from './ServiceCard'
import { Service } from '@/types/service'

const CompanyMaintenance = () => {
  return (
    <div>
      <ServicesList />
    </div>
  )
}

const ServicesList = () => {
  const { services } = useUserCompaniesContext()
  const modal = useModal({ title: 'Detalle de servicio' })
  const [service, setService] = useState<Service | undefined>(undefined)
  const onRowClick = (id: string) => {
    modal.onOpen()
    setService(services?.find((s) => s.id === id))
  }
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
            { label: 'Status ', key: 'status' }
          ],
          body: services || []
        }}
      />
    </>
  )
}

export default validatePermissions(CompanyMaintenance, 'MAINTENANCE')
