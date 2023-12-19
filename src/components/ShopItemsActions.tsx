import { createItem } from '@/firebase/items'
import ModalConfirm from './ModalConfirm'
import ShopItemForm from './ShopItemForm'
import { CategoryType } from '@/types/category'
import ShopCategoryForm from './ShopCategoryForm'
import { createCategoryShop } from '@/firebase/categories'

const ShopItemsActions = ({
  shopCategories,
  shopId
}: {
  shopCategories: CategoryType[]
  shopId: string
}) => {
  const handleCreateCategory = async (data: Partial<CategoryType>) => {
    data.companyId = shopId
    return await createCategoryShop(data).then(console.log).catch(console.error)
  }
  return (
    <div>
      <div>
        <div className="flex justify-evenly my-4">
          <ModalConfirm
            label="Articulo"
            modalTitle="Crear articulo"
            openIcon="add"
          >
            <ShopItemForm
              shopCategories={shopCategories || []}
              // shopId={shopId || ''}
              onSubmit={async (newItem) => {
                newItem.companyId = shopId
                return await createItem(newItem)
                  .then(console.log)
                  .catch(console.error)
              }}
            />
          </ModalConfirm>
          <ModalConfirm
            label="Categoria"
            modalTitle="Crear categoria"
            openIcon="add"
          >
            <ShopCategoryForm
              onSubmit={async (newCategory) => {
                newCategory.companyId = shopId
                return await handleCreateCategory(newCategory)
                  .then(console.log)
                  .catch(console.error)
              }}
            />
          </ModalConfirm>
        </div>
      </div>
    </div>
  )
}

export default ShopItemsActions
