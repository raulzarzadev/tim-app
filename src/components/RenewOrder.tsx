import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import useModal from '@/hooks/useModal'
import { Button } from '@mui/material'
import Modal from './Modal'

import CheckoutItems from './CheckoutItems'
import ModalPayment from './ModalPayment2'
import { useState } from 'react'

const RenewOrder = ({ orderId }: { orderId: string }) => {
  const modal = useModal({ title: 'Renovar orden' })
  const { orders } = useUserCompaniesContext()
  const order = orders?.find((o) => o.id === orderId)
  const [total, setTotal] = useState(0)
  return (
    <div>
      <Button onClick={modal.onOpen}>Renovar</Button>
      <Modal {...modal}>
        {/* <CheckoutItemsList items={fullItems} onSelectPrice={onSelectPrice} /> */}
        <CheckoutItems itemsSelected={order?.items || []} setTotal={setTotal} />
        <ModalPayment
          amount={total}
          //disabled={!client?.name}
          orderId={orderId}
          onCloseParent={() => modal.onClose()}
        />
        {/* <PaymentForm amount={total} usdPrice={currentCompany?.usdPrice || 1} /> */}
      </Modal>
    </div>
  )
}

export default RenewOrder
