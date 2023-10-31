import { Button } from '@mui/material'
import ModalConfirm from './ModalConfirm'
import { removeArticle } from '@/firebase/articles'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import Link from 'next/link'

const ItemActions = ({ itemId }: { itemId: string }) => {
  const { currentCompany } = useUserCompaniesContext()
  const handleDeleteItem = async (itemId: string) => {
    try {
      const res = await removeArticle(currentCompany?.id || '', itemId)
      console.log({ res })
      return res
    } catch (error) {
      console.error(error)
    } finally {
    }
  }
  return (
    <div className="flex justify-evenly my-4">
      <Button
        LinkComponent={Link}
        href={`/dashboard/${currentCompany?.id}/articles/${itemId}/edit`}
      >
        Editar
      </Button>
      <ModalConfirm
        label="Eliminar"
        color="error"
        handleConfirm={() => {
          handleDeleteItem(itemId)
        }}
      />
    </div>
  )
}

export default ItemActions
