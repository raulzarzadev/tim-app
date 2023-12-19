import { ArticleType } from '@/types/article'
import CategoryDetails from './CategoryDetails'
import MyTable from './MyTable'
import { CategoryType } from '@/types/category'

const CategoriesTable = ({
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
          modalChildren={(value) => (
            <>
              <CategoryDetails category={value} />
              {showCategoryActions && <div>Category actions</div>}
            </>
          )}
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

export default CategoriesTable