import { CompanyType } from '@/types/company'
import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import ModalConfirm from './ModalConfirm'
import { deleteCompany, updateCompany } from '@/firebase/companies'
import AppIcon from './AppIcon'
import { createItem, deleteCompanyItems } from '@/firebase/items'
import { deleteCompanyOrders } from '@/firebase/orders'
import ShopForm from './ShopForm'
import ArticleForm from './ArticleForm'
import ShopItemForm from './ShopItemForm'
import CategoryForm from './CategoryForm'
import ShopCategoryForm from './ShopCategoryForm'
import { CategoryType } from '@/types/category'

const ShopActions = ({
  shopId,
  shop
}: {
  shopId: Partial<CompanyType>['id']
  shop: Partial<CompanyType>
}) => {
  const handleDelete = async (companyId: string) => {
    await deleteCompanyItems(companyId).then(console.log).catch(console.error)
    await deleteCompany(companyId).then(console.log).catch(console.error)
    await deleteCompanyOrders(companyId).then(console.log).catch(console.error)
    window.location.reload()
    return true
  }

  const handleUpdate = async (data: Partial<CompanyType>) => {
    await updateCompany(shopId || '', data)
      .then(console.log)
      .catch(console.error)
  }

  const handleCreateCategory = async (data: Partial<CategoryType>) => {
    console.log('category', { data })
  }

  return (
    <div>
      <div className="flex w-full justify-evenly mt-10">
        <ModalConfirm
          modalTitle="Eliminar tienda"
          openIcon="trash"
          label="Eliminar"
          color="error"
          handleConfirm={() => {
            return handleDelete(shopId || '')
          }}
          acceptColor="error"
          acceptLabel="Eliminar"
        >
          <div className="text-center">
            <Typography className="text-center">
              ¿Esta seguro que desea eliminar esta tienda?
            </Typography>
            <Typography className="text-center " variant="caption">
              Articulos, categorias y ordenes tambien se eliminaran
            </Typography>
            <div>
              <Typography className="text-center " variant="caption">
                Esta accion no es reversible
              </Typography>
            </div>
          </div>
        </ModalConfirm>
        <ModalConfirm label="Editar" openIcon="edit">
          <ShopForm
            company={shop}
            onSubmit={(data) => {
              handleUpdate(data)
            }}
          />
        </ModalConfirm>
      </div>
      <div>
        <div className="flex justify-evenly mt-10">
          <ModalConfirm
            label="Articulo"
            modalTitle="Crear articulo"
            openIcon="add"
          >
            <ShopItemForm
              shopCategories={shop?.categories || []}
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

export default ShopActions
