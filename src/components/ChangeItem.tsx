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

const ChangeItem = ({ item }: { item: ItemInUse }) => {
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

  const differences = () => {
    const oldItem = calculateItemPrice(item.id, item.qty, item.unit)
    const newItem = calculateItemPrice(_selected, item.qty, item.unit)
    console.log({ oldItem, newItem })
    return {
      amount: (newItem.total - oldItem.total).toFixed(2) || 0,
      newPrice: newItem.price
    }
  }

  const handleChange = () => {
    const { amount, newPrice } = differences()
    console.log('cambiar item', { item, amount, newPrice })
  }

  const calculateItemPrice = (itemId, qty, unit) => {
    const item = currentCompany?.articles?.find((item) => item.id === itemId)
    console.log({ item })
    const categoryPrices = currentCompany?.categories?.find(
      (c: { name: string }) => c.name === item?.category
    )?.prices
    const itemPrices = item?.ownPrice ? item.prices : categoryPrices
    const itemPrice = calculateTotal(unit, qty, itemPrices || [])
    return itemPrice
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
      <Stack direction="row" flexWrap={'wrap'} className="justify-center mt-8">
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
            Diferencia: <CurrencySpan quantity={differences().amount} />
          </Typography>
          <div className="flex justify-center mt-8">
            <Button
              className=""
              variant="outlined"
              onClick={(e) => {
                e.preventDefault()
                handleChange()
              }}
            >
              Cambiar
            </Button>
          </div>
        </>
      )}
    </Box>
  )
}

export default ChangeItem
