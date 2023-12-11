import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import ItemsTable from './ItemsTable'

const ItemsPending = () => {
  const { companyItems } = useUserCompaniesContext()

  const pending = companyItems.filter((item) => item) || []
  return <ItemsTable items={pending} />
}

export default ItemsPending
