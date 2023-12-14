import { CompanyType } from '@/types/company'
import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import ModalConfirm from './ModalConfirm'
import { deleteCompany } from '@/firebase/companies'
import AppIcon from './AppIcon'

const ShopActions = ({ company }: { company: Partial<CompanyType> }) => {
  const handleDelete = async (companyId: string) => {
    const res = await deleteCompany(companyId)
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch(console.error)
    return res
  }
  return (
    <div>
      <div className="flex w-full justify-evenly mt-10">
        <ModalConfirm
          openIcon="trash"
          label="Eliminar"
          color="error"
          handleConfirm={() => {
            return handleDelete(company?.id || '')
          }}
        >
          <Typography className="text-center">
            ¿Esta seguro que desea eliminar esta tienda?
          </Typography>
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
