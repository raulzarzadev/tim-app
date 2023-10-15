import {
  ItemOrder,
  useUserCompaniesContext
} from '@/context/userCompaniesContext2'
import ItemsStatusTable from './ItemsStatusTable2'
import asDate from '@/lib/asDate'

const ItemsFinished = () => {
  const {
    ordersItems: { finished }
  } = useUserCompaniesContext()

  const sortByFinishRent = (a: ItemOrder, b: ItemOrder) => {
    if (!a.rentFinishAt && !b.rentFinishAt) return 0
    return (
      (asDate(b.rentFinishedAt)?.getTime() || 0) -
      (asDate(a.rentFinishedAt)?.getTime() || 0)
    )
  }
  return <ItemsStatusTable items={finished.sort(sortByFinishRent) || []} />
}

export default ItemsFinished
