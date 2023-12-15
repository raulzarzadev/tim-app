import { CompanyType } from '@/types/company'
import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import ModalConfirm from './ModalConfirm'
import { deleteCompany } from '@/firebase/companies'
import AppIcon from './AppIcon'
import { deleteCompanyItems } from '@/firebase/items'
import { deleteCompanyOrders } from '@/firebase/orders'

const ShopActions = ({ shopId }: { shopId: Partial<CompanyType>['id'] }) => {
  const handleDelete = async (companyId: string) => {
    await deleteCompanyItems(companyId).then(console.log).catch(console.error)
    await deleteCompany(companyId).then(console.log).catch(console.error)
    await deleteCompanyOrders(companyId).then(console.log).catch(console.error)
    window.location.reload()
    return true
    // const res = await deleteCompany(companyId)
    //   .then((res) => {
    //     console.log(res)
    //     window.location.reload()
    //   })
    //   .catch(console.error)

    //return res
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
        <Button
          variant="outlined"
          endIcon={<AppIcon icon="edit" />}
          LinkComponent={Link}
          href={`my-shop/edit`}
        >
          Editar
        </Button>
      </div>
      <div>
        <div className="flex justify-evenly mt-10">
          <Button
            endIcon={<AppIcon icon="add" />}
            variant="contained"
            LinkComponent={Link}
            href="/my-shop/new-item"
          >
            Articulo
          </Button>
          <Button
            endIcon={<AppIcon icon="add" />}
            variant="contained"
            LinkComponent={Link}
            href="/my-shop/new-category"
          >
            Categoria
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ShopActions
