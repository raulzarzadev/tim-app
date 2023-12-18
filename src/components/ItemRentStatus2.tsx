import dictionary from '@/CONSTS/dictionary'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import useModal from '@/hooks/useModal'
import { itemStatus } from '@/lib/itemStatus'
import Modal from './Modal'
import OrderDetails from './OrderDetails'

const ItemRentStatus = ({ itemId }: { itemId: string }) => {
  const { orders } = useUserCompaniesContext()
  const { status, order } = itemStatus(itemId, { companyOrders: orders })
  const modal = useModal({ title: 'Orden de item status ' })
  return (
    <div>
      {!order && dictionary(status)}
      {order && (
        <>
          <button onClick={modal.onOpen} className="capitalize">
            {dictionary(status)}
          </button>
          <Modal {...modal}>{order && <OrderDetails order={order} />}</Modal>
        </>
      )}
    </div>
  )
}

export default ItemRentStatus
