import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { listenCompanyClients } from '@/firebase/clients'
import { Client } from '@/types/client'
import { useEffect, useState } from 'react'
import ClientsTable from './ClientsTable'

const CompanyClients = () => {
  const { currentCompany } = useUserCompaniesContext()
  const [clients, setClients] = useState<Client[]>([])
  useEffect(() => {
    listenCompanyClients(currentCompany?.id || '', setClients)
  }, [])
  return (
    <div>
      <ClientsTable clients={clients || []} />
    </div>
  )
}

export default CompanyClients
