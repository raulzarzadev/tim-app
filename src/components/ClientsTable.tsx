import { Client } from '@/types/client'
import MyTable from './MyTable'
import ClientInfo from './ClientInfo'
import ClientOrders from './ClientOrders'
import AccordionSections from './AccordionSections'
import ClientActions from './Client/ClientActions'
import ClientComments from './Client/ClientComments'

const ClientsTable = ({ clients }: { clients: Partial<Client>[] }) => {
  return (
    <div>
      <MyTable
        search
        modalChildren={(value) => (
          <>
            <ClientActions clientId={value?.id} />
            <ClientInfo client={value} />
            <ClientComments clientId={value?.id} />
            <AccordionSections
              sections={[
                {
                  title: 'Historial de ordenes',
                  subTitle: '',
                  content: <ClientOrders clientId={value?.id} />
                }
              ]}
            />
          </>
        )}
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
