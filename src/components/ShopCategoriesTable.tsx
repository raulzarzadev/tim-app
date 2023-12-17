import { ArticleType } from '@/types/article'
import CategoryDetails from './CategoryDetails'
import MyTable from './MyTable'
import { CategoryType } from '@/types/category'
import ShopCategoryDetails from './ShopCategoryDetails'
import ShopCategoryActions from './ShopCategoryActions'

const ShopCategoriesTable = ({
  items,
  categories,
  showCategoryActions
}: {
  items: Partial<ArticleType>[]
  categories: CategoryType[]
  showCategoryActions?: boolean
}) => {
  const categoryItems = (categoryName: string) => {
    return items?.filter((article) => article.category === categoryName)
  }

  return (
    <div>
      <div>
        <MyTable
          modalTitle="Categoria"
          modalChildren={(value) => {
            if (value) {
              value.items = categoryItems(value?.name)
            }
            return (
              <>
                <ShopCategoryDetails category={value} />
                {showCategoryActions && (
                  <ShopCategoryActions category={value} />
                )}
              </>
            )
          }}
          data={{
            headers: [
              {
                label: 'Nombre',
                key: 'name'
              },
              // {
              //   label: 'Descripción',
              //   key: 'description'
              // },
              {
                label: 'Articulos',
                key: 'name',
                format: (value) => `${categoryItems(value)?.length || 0}`
              },
              {
                label: 'En uso',
                key: 'name',
                format: (value) =>
                  `${
                    categoryItems(value)?.filter(
                      (i) => i.rentStatus === 'taken'
                    )?.length || 0
                  }`
              },
              {
                label: 'Vencidos',
                key: 'name',
                format: (value) =>
                  `${
                    categoryItems(value)?.filter(
                      (i) => i.rentStatus === 'expired'
                    )?.length || 0
                  }`
              },

              {
                label: 'Disponibles',
                key: 'name',
                format: (value) =>
                  `${
                    categoryItems(value)?.filter(
                      (i) => i.rentStatus === 'available'
                    )?.length || 0
                  }`
              }
            ],
            body: categories || []
          }}
        />
      </div>
    </div>
  )
}

export default ShopCategoriesTable
