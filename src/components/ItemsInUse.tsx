import {
  ItemOrder,
  useUserCompaniesContext
} from '@/context/userCompaniesContext2'

import ItemsStatusTable from './ItemsStatusTable2'
import asDate from '@/lib/asDate'
import { Typography } from '@mui/material'
import ItemsTable from './ItemsTable'

const ItemsInUse = () => {
  const { companyItems } = useUserCompaniesContext()
  // const sortByFinishRent = (a: ItemOrder, b: ItemOrder) => {
  //   if (!a.rentFinishAt && !b.rentFinishAt) return 0
  //   return (
  //     (asDate(a.rentFinishAt)?.getTime() || 0) -
  //     (asDate(b.rentFinishAt)?.getTime() || 0)
  //   )
  // }
  // if (inUse.length === 0)
  //   return (
  //     <Typography className="text-center text-xl my-4">
  //       No hay unidades en uso
  //     </Typography>
  //   )
  const inUse = companyItems.filter((item) => item.rentStatus === 'taken')
  //return <ItemsStatusTable items={inUse.sort(sortByFinishRent) || []} />
  return <ItemsTable items={inUse || []} />
}

export default ItemsInUse
