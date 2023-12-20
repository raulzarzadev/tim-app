import { ArticleType } from '@/types/article'
import MyTable, { MyTableHeaders } from './MyTable'
import ArticleDetails from './ArticleDetails'
import dictionary from '@/CONSTS/dictionary'
import ShopItemActions from './ShopItemActions'
import { CategoryType } from '@/types/category'

type ItemColumn =
  | 'category'
  | 'serialNumber'
  | 'color'
  | 'rentStatus'
  | 'storeVisible'
  | 'name'
const ShopItemsTable = ({
  items,
  itemActions,
  columns,
  shopCategories
}: {
  items: Partial<ArticleType>[]
  itemActions?: boolean
  columns?: ItemColumn[]
  shopCategories?: Partial<CategoryType>[]
}) => {
  const headers: MyTableHeaders = [
    {
      label: 'Nombre',
      key: 'name'
    },
    {
      label: 'Categoria',
      key: 'category'
    },
    {
      label: 'No Serie',
      key: 'serialNumber'
    },
    {
      label: 'Color',
      key: 'color'
    },
    {
      label: 'Status',
      key: 'rentStatus',
      format: (value) => <span className="capitalize">{dictionary(value)}</span>
    },
    {
      label: 'En tienda',
      key: 'storeVisible',
      format: (value) => (!!value ? 'Visible' : 'Oculto')
    }
  ]

  const showHeaders = () => {
    if (!columns?.length) return headers
    return headers.filter((h) => columns?.includes(h.key as ItemColumn))
  }

  return (
    <div className=" mx-auto w-full">
      <MyTable
        modalTitle="Detalles de artículo"
        modalChildren={(value) => (
          <>
            <ArticleDetails article={value} />
            {itemActions && (
              <ShopItemActions item={value} shopCategories={shopCategories} />
            )}
          </>
        )}
        data={{
          headers: showHeaders(),
          body: items || []
        }}
      />
    </div>
  )
}

export default ShopItemsTable
