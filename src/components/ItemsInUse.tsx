import {
  ItemOrder,
  useUserCompaniesContext
} from '@/context/userCompaniesContext2'

import ItemsStatusTable from './ItemsStatusTable2'
import asDate from '@/lib/asDate'

const ItemsInUse = () => {
  const {
    ordersItems: { inUse }
  } = useUserCompaniesContext()
  const sortByFinishRent = (a: ItemOrder, b: ItemOrder) => {
    if (!a.rentFinishAt && !b.rentFinishAt) return 0
    return (
      (asDate(a.rentFinishAt)?.getTime() || 0) -
      (asDate(b.rentFinishAt)?.getTime() || 0)
    )
  }
  return <ItemsStatusTable items={inUse.sort(sortByFinishRent) || []} />
}

export default ItemsInUse
