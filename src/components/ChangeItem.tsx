import {
  ItemOrder,
  useCategoryArticles,
  useUserCompaniesContext
} from '@/context/userCompaniesContext2'
import { useEffect, useState } from 'react'
import { Box, Chip, Stack, Typography } from '@mui/material'
import { ArticleType } from '@/types/article'
import Select from './Select'
import CurrencySpan from './CurrencySpan'
import asNumber from '@/lib/asNumber'
import { PriceType } from './PricesForm'
import ButtonLoadingAsync from './ButtonLoadingAsync'
import { calculateTotal } from '@/lib/calculateTotalItem'
import ErrorBoundary from './ErrorBoundary'
import { changeItem } from '@/firebase/orders'

const ChangeItem = ({
  item,
  cashboxChange
}: {
  item: Partial<ItemOrder>
  cashboxChange?: (newItem: ArticleType['id']) => void
}) => {
  const {
    ordersItems: { inUse: itemsInUse },
    currentCompany
  } = useUserCompaniesContext()
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
    // console.log('qty ', item.qty, item.unit, item.id, _selected)
    const oldItem = calculateItemPrice(item.id, item.qty, item.unit)
    const newItem = calculateItemPrice(_selected, item.qty, item.unit)
    // console.log({ oldItem, newItem })
    return {
      amount: asNumber((newItem.total - oldItem.total).toFixed(2) || 0),
      newPrice: newItem.price
    }
  }

  const calculateItemPrice = (
    itemId?: string,
    qty?: number,
    unit?: PriceType['unit']
  ): { total: number; price?: PriceType } => {
    const item = currentCompany?.articles?.find((item) => item.id === itemId)
    const categoryPrices = currentCompany?.categories?.find(
      (c: { name: string }) => c.name === item?.category
    )?.prices
    const itemPrices = item?.ownPrice ? item.prices : categoryPrices
    const itemPrice = calculateTotal(unit, qty, itemPrices || [])
    // console.log({ itemPrice: itemPrice.total, itemPrices, qty, unit })
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
    if (cashboxChange && _selected) {
      return cashboxChange(_selected)
    }
    if (item?.order?.id) {
      return changeItem(item?.order?.id, {
        amount: amountDiff,
        newPrice: newPrice || null,
        newItemId: _selected || '',
        oldItemId: item.id || ''
      })
        .then((res) => console.log(res))
        .catch(console.error)
    }
    console.error('no paymentId, no cashboxChange')
  }

  return (
    <ErrorBoundary>
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
              {diff.newPrice?.qty}x {diff.newPrice?.unit}{' '}
              <CurrencySpan quantity={diff.newPrice.price} />
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
    </ErrorBoundary>
  )
}

export default ChangeItem
