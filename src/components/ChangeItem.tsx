import {
  useCategoryArticles,
  useUserCompaniesContext
} from '@/context/userCompaniesContext'
import { useEffect, useState } from 'react'
import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import { ArticleType } from '@/types/article'
import Select from './Select'
import { ItemInUse } from './ItemsInUse'
import { calculateTotal } from './Checkout2'
import CurrencySpan from './CurrencySpan'
import asNumber from '@/lib/asNumber'
import { PriceType } from './PricesForm'
import { changeItem, updatePayment } from '@/firebase/payments'
import ButtonLoadingAsync from './ButtonLoadingAsync'

const ChangeItem = ({ item }: { item: Partial<ItemInUse> }) => {
  const { itemsInUse, currentCompany } = useUserCompaniesContext()

  const [_categoryName, _setCategoryName] = useState(item.category)
  const [_items, _setItems] = useState<ArticleType[]>([])
  const [_selected, _setSelected] = useState<string>()
  const categoryItems = useCategoryArticles({ categoryName: _categoryName })
  const handleClick = (itemId: ArticleType['id']) => {
    _setSelected(itemId)
  }

  useEffect(() => {
    return _setItems(categoryItems || [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_categoryName])

  const categories =
    currentCompany?.categories?.map((category) => ({
      label: category.name,
      value: category.name
    })) || []

  const differences = (): { amount: number; newPrice?: PriceType } => {
    const oldItem = calculateItemPrice(item.id, item.qty, item.unit)
    const newItem = calculateItemPrice(_selected, item.qty, item.unit)
    return {
      amount: asNumber((newItem.total - oldItem.total).toFixed(2) || 0),
      newPrice: newItem.price
    }
  }

  const calculateItemPrice = (
    itemId?: string,
    qty?: number,
    unit?: PriceType['unit']
  ) => {
    const item = currentCompany?.articles?.find((item) => item.id === itemId)
    const categoryPrices = currentCompany?.categories?.find(
      (c: { name: string }) => c.name === item?.category
    )?.prices
    const itemPrices = item?.ownPrice ? item.prices : categoryPrices
    const itemPrice = calculateTotal(unit, qty, itemPrices || [])
    return itemPrice
  }

  const [diff, setDiff] = useState<{ amount: number; newPrice?: PriceType }>({
    amount: 0
  })

  useEffect(() => {
    setDiff(differences())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_selected])

  const handleChange = () => {
    const { amount: amountDiff, newPrice } = diff

    if (!item.paymentId) return console.error('no payment id')

    return changeItem(item.paymentId, {
      amount: amountDiff,
      newPrice: newPrice || null,
      newItemId: _selected || '',
      oldItemId: item.id || ''
    })
      .then((res) => console.log(res))
      .catch(console.error)
  }

  return (
    <Box>
      <Typography className="my-4 text-center ">
        Articulo:{' '}
        <span className="font-bold">
          {item.category} - {item.serialNumber || item.name}
        </span>
      </Typography>
      <Select
        options={categories}
        onSelect={(_categoryName) => _setCategoryName(_categoryName)}
        selected={_categoryName}
        label="Categorias"
        fullWidth
        variant="outlined"
      />
      <div className="mt-8" />
      {!!diff.newPrice && (
        <Typography className="text-center my-4 ">
          Cambiar por:{' '}
          <span className="font-bold">
            {diff.newPrice?.quantity}x {diff.newPrice?.unit}
          </span>
        </Typography>
      )}
      <Stack direction="row" flexWrap={'wrap'} className="justify-center ">
        {_items?.map((item) => (
          <Chip
            disabled={!!itemsInUse?.find(({ itemId }) => itemId === item.id)}
            color={_selected === item.id ? 'primary' : 'default'}
            className="p-1 m-1"
            key={item.id}
            label={item.serialNumber || item.name}
            onClick={() => handleClick(item.id)}
          />
        ))}
      </Stack>
      {_selected && (
        <>
          <Typography className="text-center my-4 ">
            {diff?.amount < 0 ? 'Devolver' : 'Cobrar'}
            {': '}
            <CurrencySpan quantity={diff?.amount} />
          </Typography>
          <div className="flex justify-center mt-8">
            <ButtonLoadingAsync
              onClick={() => {
                return handleChange()
              }}
              label="Cambiar"
              loadingLabel="Cambiando..."
            ></ButtonLoadingAsync>
          </div>
        </>
      )}
    </Box>
  )
}

export default ChangeItem
