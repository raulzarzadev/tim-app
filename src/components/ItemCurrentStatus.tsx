import { useUserCompaniesContext } from '@/context/userCompaniesContext2'

const ItemCurrentStatus = ({ itemId }: { itemId: string }) => {
  const {
    ordersItems: { inUse, pending }
  } = useUserCompaniesContext()

  const itemInUse = inUse?.find((i) => i?.itemId === itemId)
  const isPending = pending?.find((i) => i?.itemId === itemId)
  if (itemInUse)
    return <span className="bg-green-400 rounded-full p-1 py-0.5">En uso</span>
  if (isPending)
    return (
      <span className="bg-blue-400 rounded-full p-1 py-0.5">Pendiente</span>
    )
  return <span className="bg-gray-400 rounded-full p-1 py-0.5">Disponible</span>
}

export default ItemCurrentStatus
