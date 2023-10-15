import {
  ItemOrder,
  useUserCompaniesContext
} from '@/context/userCompaniesContext2'
import ItemsStatusTable from './ItemsStatusTable2'
import asDate from '@/lib/asDate'
import { Typography } from '@mui/material'

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

  if (finished.length === 0)
    return (
      <Typography className="text-center text-xl my-4">
        No hay terminadas
      </Typography>
    )
  return <ItemsStatusTable items={finished.sort(sortByFinishRent) || []} />
}

export default ItemsFinished
