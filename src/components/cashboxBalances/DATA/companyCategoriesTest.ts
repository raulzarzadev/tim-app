import { CategoryBase, CategoryType } from '@/types/category'

export const companyCategoriesTest: CategoryBase[] = [
  {
    name: 'bici',
    prices: [
      {
        unit: 'hour',
        qty: 1,
        price: 100
      },
      {
        unit: 'day',
        qty: 1,
        price: 300
      }
    ]
  },
  {
    name: 'lavadora',
    prices: [
      {
        unit: 'month',
        qty: 1,
        price: 600
      },
      {
        unit: 'week',
        qty: 1,
        price: 300
      }
    ]
  }
]
