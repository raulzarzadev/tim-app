import BasicTabs from './BasicTabs'
import { ArticleType } from '@/types/article'
import { CategoryType } from '@/types/category'
import ShopCategoriesTable from './ShopCategoriesTable'
import ShopItemsTable from './ShopItemsTable'
import ShopItemsActions from './ShopItemsActions'

const ShopItemsTabs = ({
  items,
  categories,
  showItemActions,
  showItemsActions,
  shopId
}: {
  items: Partial<ArticleType>[]
  categories: CategoryType[]
  showItemActions?: boolean
  showItemsActions?: boolean
  shopId: string
}) => {
  // const categories = currentCompany?.categories
  const takenItems = items.filter((i) => i.rentStatus === 'taken') || []
  const expiredItems = items.filter((i) => i.rentStatus === 'expired') || []
  const availableItems = items.filter((i) => i.rentStatus === 'available') || []

  return (
    <div>
      <div>
        {showItemsActions && (
          <ShopItemsActions shopCategories={categories} shopId={shopId} />
        )}
        <BasicTabs
          title="items"
          tabs={[
            {
              label: `Todas (${items?.length || 0})`,
              content: (
                <ShopItemsTable
                  items={items || []}
                  itemActions={showItemActions}
                  shopCategories={categories}
                />
              )
            },
            {
              label: `En uso (${takenItems.length || 0})`,
              content: (
                <ShopItemsTable
                  items={takenItems || []}
                  itemActions={showItemActions}
                  shopCategories={categories}
                />
              )
            },
            {
              label: `Vencidas (${expiredItems?.length || 0})`,
              content: (
                <ShopItemsTable
                  items={expiredItems}
                  itemActions={showItemActions}
                  shopCategories={categories}
                />
              )
            },
            {
              label: `Disponibles (${availableItems?.length || 0})`,
              content: (
                <ShopItemsTable
                  items={availableItems}
                  itemActions={showItemActions}
                  shopCategories={categories}
                />
              )
            },
            {
              label: `Por categorias (${categories?.length || 0})`,
              content: (
                <ShopCategoriesTable
                  categories={categories || []}
                  items={items}
                  showCategoryActions={showItemActions}
                />
              )
            }
            // { label: 'Pendientes', content: <ItemsPending /> },
            // { label: 'Terminados', content: <ItemsFinished /> },
            // { label: 'Todas', content: <CompanyArticles /> },
            // { label: 'En uso', content: <ItemsInUse /> }
            // { label: 'vencidas', content: <Items /> }
          ]}
        />
      </div>
    </div>
  )
}

export default ShopItemsTabs
