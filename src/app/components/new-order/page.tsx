'use client'
import ModalOrderForm from '@/components/orders/ModalOrderForm'

const Page = () => {
  return (
    <div>
      <ModalOrderForm label="Nueva orden" shippingEnabled />
    </div>
  )
}

export default Page
