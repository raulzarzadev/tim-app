import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import ItemsStatusTable from './ItemsStatusTable'

const ItemsFinished = () => {
  const {
    ordersItems: { finished }
  } = useUserCompaniesContext()

  return <ItemsStatusTable items={finished || []} />
}

export default ItemsFinished
