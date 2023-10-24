import { useUserCompaniesContext } from '@/context/userCompaniesContext2'

const ItemCurrentStatus = ({ itemId }: { itemId: string }) => {
  const {
    ordersItems: { inUse, pending }
  } = useUserCompaniesContext()

  const itemInUse = inUse?.find((i) => i?.itemId === itemId)
  const isPending = pending?.find((i) => i?.itemId === itemId)
  return (
    <div>
      {itemInUse && (
        <span className="bg-green-400 rounded-full p-1 py-0.5">En uso</span>
      )}
      {isPending && (
        <span className="bg-green-400 rounded-full p-1 py-0.5">Pendiete</span>
      )}
    </div>
  )
}

export default ItemCurrentStatus
