import { ArticleType } from '@/types/article'
import MyTable from './MyTable'
import ModalItemDetails from './ModalItemDetails'
import ArticleDetails, { ArticleInfo } from './ArticleDetails'

const ItemsTable = ({ items }: { items: ArticleType[] }) => {
  console.log({ items })
  return (
    <div className="max-w-md mx-auto">
      <MyTable
        modalTitle="Detalles de Item"
        modalChildren={(value) => <ArticleInfo article={value} />}
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
            }
          ],
          body: items || []
        }}
      />
    </div>
  )
}

export default ItemsTable
