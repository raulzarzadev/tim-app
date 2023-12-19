import ClientsTable from '../ClientsTable'
import ModalConfirm from '../ModalConfirm'
import ClientForm from '../orders/ClientForm'
import { Client } from '@/types/client'
import { createClient, updateClient } from '@/firebase/clients'

const ShopClients = ({
  clients,
  companyId
}: {
  clients: Partial<Client>[]
  companyId: string
}) => {
  // const { clients, currentCompany } = useUserCompaniesContext()
  // const [newClient, setNewClient] = useState<Partial<Client>>()
  return (
    <div>
      <div className="my-2 flex justify-center">
        <ModalConfirm
          label="Nuevo cliente"
          openIcon="add"
          modalTitle="Nuevo cliente"
          //disabledAccept={!newClient?.name}
        >
          <ClientForm
            searchClient={false}
            setClient={async (client) => {
              //setNewClient(client)
              if (client?.id) {
                return await updateClient(client.id, client)
                // .then(console.log)
                // .catch(console.error)
              } else {
                return await createClient({ ...client, companyId } || {})
                // .then(console.log)
                // .catch(console.error)
              }
            }}
          />
        </ModalConfirm>
      </div>
      <ClientsTable clients={clients || []} />
    </div>
  )
}

export default ShopClients
