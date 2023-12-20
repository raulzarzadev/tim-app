import { Button, Typography } from '@mui/material'
import ModalConfirm from './ModalConfirm'
import AppIcon from './AppIcon'
import { useEffect, useState } from 'react'
import ShopItemForm from './ShopItemForm'
import { ArticleType } from '@/types/article'
import { CategoryType } from '@/types/category'
import { deleteItem, listenItem, updateItem } from '@/firebase/items'

const ShopItemActions = ({
  item: shopItem,
  shopCategories
}: {
  item: Partial<ArticleType>
  shopCategories?: Partial<CategoryType>[]
}) => {
  const itemId = shopItem?.id || ''

  const [item, setItem] = useState<Partial<ArticleType>>()
  useEffect(() => {
    if (itemId)
      listenItem(itemId, (res: Partial<ArticleType>) => {
        setItem(res)
      })
  }, [itemId])
  const handleDeleteItem = async (itemId: string) => {
    setLoading(true)
    await deleteItem(itemId).then(console.log).catch(console.error)
    setLoading(false)
  }

  const handleUpdateItem = async (data: Partial<ArticleType>) => {
    setLoading(true)
    await updateItem(itemId || '', data)
      .then(console.log)
      .catch(console.error)
    setLoading(false)
  }

  const toggleStoreVisible = async () => {
    setLoading(true)
    await updateItem(itemId || '', {
      storeVisible: !item?.storeVisible
    })
      .then(console.log)
      .catch(console.error)
    setLoading(false)
  }
  const [loading, setLoading] = useState(false)
  const itemDonNotHaveImage = !item?.image
  const disableShowInStore = loading || itemDonNotHaveImage

  return (
    <>
      <div className="flex justify-evenly my-4">
        <ModalConfirm
          disabled={loading}
          label="Eliminar"
          color="error"
          handleConfirm={() => {
            return handleDeleteItem(itemId)
          }}
        />
        <ModalConfirm
          label="Editar"
          openIcon="edit"
          disabled={loading}
          modalTitle="Editar artículo"
        >
          <ShopItemForm
            item={item}
            shopCategories={shopCategories || []}
            onSubmit={handleUpdateItem}
          />
        </ModalConfirm>
        {!!item?.storeVisible ? (
          <Button
            disabled={loading}
            variant="contained"
            onClick={toggleStoreVisible}
            endIcon={<AppIcon icon="eyeClose" />}
          >
            Ocultar en tienda
          </Button>
        ) : (
          <Button
            disabled={disableShowInStore}
            onClick={toggleStoreVisible}
            endIcon={<AppIcon icon="eyeOpen" />}
          >
            {itemDonNotHaveImage && ' *'} Mostrar en tienda
          </Button>
        )}
      </div>
      <div>
        {itemDonNotHaveImage && (
          <Typography variant="caption" color="error">
            * Item debe tener una imagen para ser mostrado en tienda
          </Typography>
        )}
      </div>
    </>
  )
}

export default ShopItemActions
