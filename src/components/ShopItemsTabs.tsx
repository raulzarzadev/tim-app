import { Button } from '@mui/material'
import Link from 'next/link'
import AppIcon from './AppIcon'
import BasicTabs from './BasicTabs'
import ItemsTable from './ItemsTable'
import { ArticleType } from '@/types/article'
import { CategoryType } from '@/types/category'
import ShopCategoriesTable from './ShopCategoriesTable'
import ShopItemsTable from './ShopItemsTable'

const ShopItemsTabs = ({
  hiddenActions,
  items,
  categories,
  showItemActions
}: {
  items: Partial<ArticleType>[]
  categories: CategoryType[]
  hiddenActions?: boolean
  showItemActions?: boolean
}) => {
  // const categories = currentCompany?.categories
  const takenItems = items.filter((i) => i.rentStatus === 'taken') || []
  const expiredItems = items.filter((i) => i.rentStatus === 'expired') || []
  const availableItems = items.filter((i) => i.rentStatus === 'available') || []

  return (
    <div>
      <div>
        {!hiddenActions && (
          <div className="flex justify-evenly">
            <Button
              LinkComponent={Link}
              href="/new-category"
              endIcon={<AppIcon icon="add" />}
            >
              Nueva categoria
            </Button>
            <Button
              LinkComponent={Link}
              href="/new-item"
              endIcon={<AppIcon icon="add" />}
            >
              Nueva unidad
            </Button>
          </div>
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
                />
              )
            },
            {
              label: `En uso (${takenItems.length || 0})`,
              content: (
                <ShopItemsTable
                  items={takenItems || []}
                  itemActions={showItemActions}
                />
              )
            },
            {
              label: `Vencidas (${expiredItems?.length || 0})`,
              content: (
                <ShopItemsTable
                  items={expiredItems}
                  itemActions={showItemActions}
                />
              )
            },
            {
              label: `Disponibles (${availableItems?.length || 0})`,
              content: (
                <ShopItemsTable
                  items={availableItems}
                  itemActions={showItemActions}
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
