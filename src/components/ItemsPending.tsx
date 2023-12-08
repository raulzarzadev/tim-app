import {
  ItemOrder,
  useUserCompaniesContext
} from '@/context/userCompaniesContext2'
import ItemsStatusTable from './ItemsStatusTable2'
import asDate from '@/lib/asDate'
import { Typography } from '@mui/material'
import ItemsTable from './ItemsTable'

const ItemsPending = () => {
  // // const {
  // //   ordersItems: { pending }
  // // } = useUserCompaniesContext()
  // // const sortByStartAt = (a: ItemOrder, b: ItemOrder) => {
  // //   if (!a.rentFinishAt && !b.rentFinishAt) return 0
  // //   return (
  // //     (asDate(a.rentStartAt)?.getTime() || 0) -
  // //     (asDate(b.rentStartAt)?.getTime() || 0)
  // //   )
  // // }
  // // if (pending.length === 0)
  //   return (
  //     <Typography className="text-center text-xl my-4">
  //       No hay unidades pendientes
  //     </Typography>
  //   )

  const { companyItems } = useUserCompaniesContext()

  const pending = companyItems.filter((item) => item) || []
  console.log({ pending })
  return <ItemsTable items={pending} />
}

export default ItemsPending
