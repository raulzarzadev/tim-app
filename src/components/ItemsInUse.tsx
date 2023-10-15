import {
  ItemOrder,
  useUserCompaniesContext
} from '@/context/userCompaniesContext2'

import ItemsStatusTable from './ItemsStatusTable2'
import asDate from '@/lib/asDate'
import { Typography } from '@mui/material'

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
  if (inUse.length === 0)
    return (
      <Typography className="text-center text-xl my-4">
        No hay unidades en uso
      </Typography>
    )
  return <ItemsStatusTable items={inUse.sort(sortByFinishRent) || []} />
}

export default ItemsInUse
