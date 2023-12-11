import { ArticleType } from '@/types/article'
import MyTable from './MyTable'
import ArticleDetails from './ArticleDetails'
import dictionary from '@/CONSTS/dictionary'
import ItemActions from './ItemActions'

const ItemsTable = ({
  items,
  itemActions
}: {
  items: ArticleType[]
  itemActions?: boolean
}) => {
  return (
    <div className="max-w-md mx-auto">
      <MyTable
        modalTitle="Detalles de Item"
        modalChildren={(value) => (
          <>
            <ArticleDetails article={value} />
            {itemActions && <ItemActions itemId={value?.id} />}
          </>
        )}
        data={{
          headers: [
            {
              label: 'Categoria',
              key: 'category'
              // format: (value) => (
              //   <ModalItemDetails itemId={value} showCat hiddenCurrentStatus />
              // )
            },
            {
              label: 'No Serie',
              key: 'serialNumber'
              // format: (value) => (
              //   <ModalItemDetails itemId={value} showCat hiddenCurrentStatus />
              // )
            },
            {
              label: 'Color',
              key: 'color'
            },
            {
              label: 'Status',
              key: 'rentStatus',
              format: (value) => (
                <span className="capitalize">{dictionary(value)}</span>
              )
            },

            {
              label: 'Tienda',
              key: 'storeVisible',
              format: (value) => (!!value ? 'Visible' : 'Oculto')
            }
          ],
          body: items || []
        }}
      />
    </div>
  )
}

export default ItemsTable
