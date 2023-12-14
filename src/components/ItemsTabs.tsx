import { Button } from '@mui/material'
import Link from 'next/link'
import AppIcon from './AppIcon'
import BasicTabs from './BasicTabs'
import ItemsTable from './ItemsTable'
import { ArticleType } from '@/types/article'
import { CategoryType } from '@/types/category'
import CategoriesTable from './CategoriesTable'

const ItemsTabs = ({
  hiddenActions,
  items,
  categories
}: {
  items: ArticleType[]
  categories: CategoryType[]
  hiddenActions?: boolean
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
              content: <ItemsTable items={items || []} itemActions />
            },
            {
              label: `En uso (${takenItems.length || 0})`,
              content: <ItemsTable items={takenItems || []} />
            },
            {
              label: `Vencidas (${expiredItems?.length || 0})`,
              content: <ItemsTable items={expiredItems} />
            },
            {
              label: `Disponibles (${availableItems?.length || 0})`,
              content: <ItemsTable items={availableItems} />
            },
            {
              label: `Por categorias (${categories?.length || 0})`,
              content: (
                <CategoriesTable categories={categories || []} items={items} />
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

export default ItemsTabs
