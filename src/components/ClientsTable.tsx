import { Client } from '@/types/client'
import MyTable from './MyTable'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import ClientInfo from './ClientInfo'
import { useState } from 'react'

const ClientsTable = ({ clients }: { clients: Client[] }) => {
  const modal = useModal({ title: 'Detalles de cliente' })
  const [client, setClient] = useState<Client | undefined>()
  const handleSelect = (clientId: string) => {
    setClient(clients.find((c) => c.id === clientId))
    modal.onOpen()
  }
  return (
    <div>
      <Modal {...modal}>
        <ClientInfo client={client} />
      </Modal>
      <MyTable
        onRowClick={handleSelect}
        data={{
          headers: [{ label: 'Nombre', key: 'name' }],
          body: clients || []
        }}
      />
    </div>
  )
}

export default ClientsTable
