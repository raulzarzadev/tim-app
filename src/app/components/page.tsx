'use client'
import Checkout from '@/components/Checkout'
import { CashboxContext } from '@/components/CompanyCashbox'
import { ArticleType } from '@/types/article'
import { CategoryType } from '@/types/category'
import { useState } from 'react'

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
    ownPrice: true,
    prices: [
      { quantity: 1, price: 100, unit: 'hour' },
      { quantity: 1, price: 300, unit: 'day' },
      { quantity: 1, price: 1000, unit: 'week' }
    ]
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
      { quantity: 3, price: 300, unit: 'day' },
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
      { quantity: 30, price: 20, unit: 'min' },
      { quantity: 1, price: 40, unit: 'hour' },
      { quantity: 2, price: 80, unit: 'hour' }
    ]
  }
]
function Page() {
  return (
    <div>
      <div>
        <Checkout
          articlesSelected={['1', '2', '3', '4', '5']}
          companyArticles={items}
          companyCategories={categories}
        />
      </div>
    </div>
  )
}

export default Page
