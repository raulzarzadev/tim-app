import { CompanyType } from '@/types/company'
import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import ModalConfirm from './ModalConfirm'
import { deleteCompany } from '@/firebase/companies'
import AppIcon from './AppIcon'

const CompanyActions = ({ company }: { company: Partial<CompanyType> }) => {
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
  )
}

export default CompanyActions
