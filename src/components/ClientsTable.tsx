import { Client } from '@/types/client'
import MyTable from './MyTable'
import ClientInfo from './ClientInfo'

const ClientsTable = ({ clients }: { clients: Client[] }) => {
  return (
    <div>
      <MyTable
        search
        modalChildren={(value) => <ClientInfo client={value} />}
        modalTitle="Detalle de cliente"
        data={{
          headers: [
            { label: 'Nombre', key: 'name' },
            { label: 'Teléfono', key: 'phone' },
            { label: 'Email', key: 'email' },
            { label: 'Dirección', key: 'address' }
          ],
          body: clients || []
        }}
      />
    </div>
  )
}

export default ClientsTable
