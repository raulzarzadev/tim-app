import { CategoryBase, CategoryType } from '@/types/category'

export const companyCategoriesTest: CategoryBase[] = [
  {
    name: 'bici',
    prices: [
      {
        unit: 'hour',
        quantity: 1,
        price: 100
      },
      {
        unit: 'day',
        quantity: 1,
        price: 300
      }
    ]
  },
  {
    name: 'lavadora',
    prices: [
      {
        unit: 'month',
        quantity: 1,
        price: 600
      },
      {
        unit: 'week',
        quantity: 1,
        price: 300
      }
    ]
  }
]
