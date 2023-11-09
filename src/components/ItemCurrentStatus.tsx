import { useUserCompaniesContext } from '@/context/userCompaniesContext2'

const ItemCurrentStatus = ({ itemId }: { itemId: string }) => {
  const {
    ordersItems: { inUse, pending }
  } = useUserCompaniesContext()

  const itemInUse = inUse?.find((i) => i?.itemId === itemId)
  const isPending = pending?.find((i) => i?.itemId === itemId)

  if (itemInUse)
    return (
      <span className="truncate bg-green-400 rounded-full p-1 py-0.5">
        En uso
      </span>
    )
  if (isPending)
    return (
      <span className=" truncate bg-blue-400 rounded-full p-1 py-0.5">
        Pendiente
      </span>
    )
  return (
    <span className=" truncate bg-gray-400 rounded-full p-1 py-0.5">
      Disponible
    </span>
  )
}
// const color = {
//   inUse: 'bg-green-400',
//   pending: 'bg-blue-400',
//   available: 'bg-gray-400'
// }

// const ChipStatus =(status)=>{
//   return (
//     <span className={` ${i} rounded-full p-1 py-0.5`}>
//       {status}
//     </span>
//   )
// }

export default ItemCurrentStatus
