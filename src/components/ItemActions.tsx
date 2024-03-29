import { Button, Typography } from '@mui/material'
import ModalConfirm from './ModalConfirm'
import {
  removeArticle,
  toggleVisibleItem,
  updateArticle
} from '@/firebase/articles'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import Link from 'next/link'
import AppIcon from './AppIcon'
import { useState } from 'react'

const ItemActions = ({ itemId }: { itemId: string }) => {
  const { currentCompany } = useUserCompaniesContext()
  const handleDeleteItem = async (itemId: string) => {
    setLoading(true)
    return await removeArticle(currentCompany?.id || '', itemId)
      .then(console.log)
      .catch(console.error)
      .finally(() => {
        setLoading(false)
      })
  }
  const item = currentCompany?.articles?.find((item) => item.id === itemId)
  const toggleStoreVisible = async () => {
    setLoading(true)
    const res = await toggleVisibleItem({
      companyId: currentCompany?.id || '',
      itemId
    })
      .then(console.log)
      .catch(console.error)
    setLoading(false)
    //console.log({ res })
  }
  const [loading, setLoading] = useState(false)
  const itemDonNotHaveImage = !item?.image
  const disableShowInStore = loading || itemDonNotHaveImage
  return (
    <>
      <div className="flex justify-evenly my-4">
        {!!item?.storeVisible ? (
          <Button
            disabled={loading}
            onClick={toggleStoreVisible}
            endIcon={<AppIcon icon="store" />}
          >
            Ocultar en tienda
          </Button>
        ) : (
          <Button
            disabled={disableShowInStore}
            onClick={toggleStoreVisible}
            endIcon={<AppIcon icon="store" />}
          >
            {itemDonNotHaveImage && ' *'} Mostrar en tienda
          </Button>
        )}

        <Button
          disabled={loading}
          LinkComponent={Link}
          href={`/dashboard/${currentCompany?.id}/articles/${itemId}/edit`}
        >
          Editar
        </Button>
        <ModalConfirm
          disabled={loading}
          label="Eliminar"
          color="error"
          handleConfirm={() => {
            return handleDeleteItem(itemId)
          }}
        />
      </div>
      <div>
        {itemDonNotHaveImage && (
          <Typography variant="caption" color="error">
            *Item debe tener una imagen para ser mostrado en tienda
          </Typography>
        )}
      </div>
    </>
  )
}

export default ItemActions
