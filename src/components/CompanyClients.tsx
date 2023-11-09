import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import ClientsTable from './ClientsTable'
import ModalConfirm from './ModalConfirm'
import ClientForm from './orders/ClientForm'
import { useState } from 'react'
import { Client } from '@/types/client'
import { createClient } from '@/firebase/clients'

const CompanyClients = () => {
  const { clients, currentCompany } = useUserCompaniesContext()
  const [newClient, setNewClient] = useState<Partial<Client>>()
  return (
    <div>
      <div className="my-2 flex justify-center">
        <ModalConfirm
          label="Nuevo cliente"
          openIcon="add"
          disabledAccept={!newClient?.name}
          handleConfirm={async () => {
            // console.log('create', newClient)

            await createClient(
              { ...newClient, companyId: currentCompany?.id || '' } || {}
            )
              .then((res) => console.log(res))
              .catch((err) => console.error(err))
          }}
        >
          <ClientForm
            searchClient={false}
            setClient={(client) => {
              setNewClient(client)
            }}
          />
        </ModalConfirm>
      </div>
      <ClientsTable clients={clients || []} />
    </div>
  )
}

export default CompanyClients
