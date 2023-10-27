'use client'
import Checkout from '@/components/Checkout3'
import ModalPayment from '@/components/ModalPayment2'
import ModalOrderForm from '@/components/orders/ModalOrderForm'
import OrderForm from '@/components/orders/OrderForm'
import { CashboxContextProvider } from '@/context/useCompanyCashbox'
import { ArticleType } from '@/types/article'
import { CategoryType } from '@/types/category'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const items: ArticleType[] = [
  {
    id: '1',
    name: 'Article 1',
    serialNumber: 'SN-001',
    category: 'Category 1',
    color: 'Red',
    status: 'active',
    image: 'path/to/image1.jpg',
    ownPrice: true,
    prices: [
      { quantity: 1, price: 100, unit: 'hour' },
      { quantity: 1, price: 300, unit: 'day' },
      { quantity: 1, price: 1000, unit: 'week' }
    ]
  },
  {
    id: '2',
    name: 'Article 2',
    serialNumber: 'SN-002',
    category: 'Category 2',
    color: 'Blue',
    status: 'inactive',
    image: 'path/to/image2.jpg',
    ownPrice: false
  },
  {
    id: '3',
    name: 'Article 3',
    serialNumber: 'SN-003',
    category: 'Category 1',
    color: 'Green',
    status: 'active',
    image: 'path/to/image3.jpg',
    ownPrice: false
  },
  {
    id: '4',
    name: 'Article 3',
    serialNumber: 'SN-004',
    category: 'Category 2',
    color: 'Yellow',
    status: 'inactive',
    image: 'path/to/image4.jpg',
    ownPrice: false
  },
  {
    id: '5',
    name: 'Article 5',
    serialNumber: 'SN-005',
    category: 'Category 3',
    color: 'Purple',
    status: 'active',
    image: 'path/to/image5.jpg',
    ownPrice: false
  }
]
const categories: CategoryType[] = [
  {
    name: 'Category 1',
    description: 'Description 1',
    image: 'path/to/image1.jpg',
    prices: [
      { quantity: 1, price: 90, unit: 'hour' },
      { quantity: 3, price: 200, unit: 'hour' },
      { quantity: 1, price: 600, unit: 'day' }
    ]
  },
  {
    name: 'Category 2',
    description: 'Description 2',
    image: 'path/to/image2.jpg',
    prices: [
      { quantity: 1, price: 300, unit: 'day' },
      { quantity: 1, price: 1000, unit: 'week' }
    ]
  },
  {
    name: 'Category 3',
    description: 'Description 3',
    image: 'path/to/image3.jpg',
    prices: [
      { quantity: 30, price: 30, unit: 'minutes' },
      { quantity: 1, price: 40, unit: 'hour' },
      { quantity: 1, price: 290, unit: 'day' }
    ]
  }
]
function Page() {
  const pathname = usePathname()
  const router = useRouter()
  const selectedItems = [
    { itemId: 1, qty: 1, unit: 'hour' },
    { itemId: 2, qty: 1, unit: 'day' },
    { itemId: 3, qty: 1, unit: 'week' }
  ]

  useEffect(() => {
    const params = new URLSearchParams()
    params.set('items', JSON.stringify(selectedItems))
    router.push(pathname + '?' + params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div>
        Checkout
        <CashboxContextProvider>
          <Checkout />
        </CashboxContextProvider>
      </div>
      <div>
        Modal Payment
        <ModalPayment amount={200} />
      </div>
      <div>
        <ModalOrderForm />
      </div>
    </div>
  )
}

export default Page
