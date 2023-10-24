import { ArticleType } from '@/types/article'
import MyTable from './MyTable'
import ModalItemDetails from './ModalItemDetails'

const ItemsTable = ({ items }: { items: ArticleType[] }) => {
  return (
    <div>
      <MyTable
        data={{
          headers: [
            {
              label: 'Serie - nombre',
              key: 'id',
              format: (value) => (
                <ModalItemDetails itemId={value} showCat hiddenCurrentStatus />
              )
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
