import { CategoryType } from '@/types/category'
import ModalConfirm from './ModalConfirm'
import { Typography } from '@mui/material'
import { deleteCategoryShop } from '@/firebase/categories'

const ShopCategoryActions = ({
  category
}: {
  category: Partial<CategoryType>
}) => {
  const handleDelete = async () => {
    await deleteCategoryShop(category.id || '')
      .then(console.log)
      .catch(console.error)
  }
  const handleUpdate = () => {}
  return (
    <div className="flex justify-evenly my-4">
      <ModalConfirm
        label="Eliminar"
        handleConfirm={() => {
          handleDelete()
        }}
        openIcon="trash"
        modalTitle="Eliminar categoria"
        color="error"
        acceptColor="error"
        acceptLabel="Eliminar"
        acceptIcon="trash"
      >
        <Typography>¿Desea eliminar esta cateogria?</Typography>
        <Typography>* No se eliminaran items</Typography>
      </ModalConfirm>
    </div>
  )
}

export default ShopCategoryActions
