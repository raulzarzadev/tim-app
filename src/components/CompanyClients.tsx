import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import ClientsTable from './ClientsTable'

const CompanyClients = () => {
  const { clients } = useUserCompaniesContext()

  return (
    <div>
      <ClientsTable clients={clients || []} />
    </div>
  )
}

export default CompanyClients
