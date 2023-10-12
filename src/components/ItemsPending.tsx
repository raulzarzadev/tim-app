import {
  ItemOrder,
  useUserCompaniesContext
} from '@/context/userCompaniesContext2'
import ItemsStatusTable from './ItemsStatusTable2'
import asDate from '@/lib/asDate'

const ItemsPending = () => {
  const {
    ordersItems: { pending }
  } = useUserCompaniesContext()
  const sortByStartAt = (a: ItemOrder, b: ItemOrder) => {
    if (!a.rentFinishAt && !b.rentFinishAt) return 0
    return (
      (asDate(a.rentStartAt)?.getTime() || 0) -
      (asDate(b.rentStartAt)?.getTime() || 0)
    )
  }
  return <ItemsStatusTable items={pending.sort(sortByStartAt) || []} />
}

export default ItemsPending
