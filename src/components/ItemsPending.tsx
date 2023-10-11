import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import ItemsStatusTable from './ItemsStatusTable'

const ItemsPending = () => {
  const {
    ordersItems: { pending }
  } = useUserCompaniesContext()
  return <ItemsStatusTable items={pending || []} />
}

export default ItemsPending
