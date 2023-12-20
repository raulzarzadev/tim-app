import { CompanyType } from '@/types/company'
import { Typography } from '@mui/material'
import ModalConfirm from './ModalConfirm'
import { deleteCompany, updateCompany } from '@/firebase/companies'
import { deleteCompanyItems } from '@/firebase/items'
import { deleteCompanyOrders } from '@/firebase/orders'
import ShopForm from './ShopForm'

import ShopItemsActions from './ShopItemsActions'

const ShopActions = ({
  shopId,
  shop,
  showItemsActions
}: {
  shopId: Partial<CompanyType>['id']
  shop: Partial<CompanyType>
  showItemsActions?: boolean
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
        <ModalConfirm
          // test-id="edit-shop"
          label="Editar"
          openIcon="edit"
          modalTitle="Editar tienda"
        >
          <ShopForm
            company={shop}
            onSubmit={(data) => {
              handleUpdate(data)
            }}
          />
        </ModalConfirm>
      </div>
      {showItemsActions && (
        <ShopItemsActions
          shopCategories={shop.categories || []}
          shopId={shop.id || ''}
        />
      )}
    </div>
  )
}

export default ShopActions
