import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import ItemsStatusTable from './ItemsStatusTable'

const ItemsFinished = () => {
  const { itemsFinished } = useUserCompaniesContext()

  return <ItemsStatusTable items={itemsFinished || []} />
}

export default ItemsFinished
