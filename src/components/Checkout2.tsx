'use client'
import { ArticleType } from '@/types/article'
import { Box, Button, Typography } from '@mui/material'
import Modal from './Modal'
import Select from './Select'
import AppIcon from './AppIcon'
import useModal from '@/hooks/useModal'
import { useEffect, useState } from 'react'
import NumberInput from './NumberInput'
import { PriceType } from './PricesForm'
import ModalConfirm from './ModalConfirm'
import { CategoryType } from '@/types/category'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import asNumber from '@/lib/asNumber'

const Checkout = ({
  items,
  categories
}: {
  items?: (ArticleType | null)[]
  categories?: CategoryType[]
}) => {
  const modal = useModal({ title: 'Checkout' })
  const { get } = useSearchParams()
  const selectedItems = JSON.parse(get('items') || '[]')
  console.log({ selectedItems })
  const fullItems = selectedItems?.map((searchItem: { itemId: string }) => {
    const fullItem = items?.find((item) => item?.id == searchItem.itemId)
    if (fullItem?.ownPrice) return fullItem
    const categoryPrices = categories?.find(
      (c) => c.name === fullItem?.category
    )?.prices
    return { ...fullItem, prices: categoryPrices }
  })
  const calculateFullTotal = (
    selectedItems: {
      itemId: ArticleType['id']
      qty: number
      unit: PriceType['unit']
    }[],
    fullItems: ArticleType[]
  ) => {
    let total = 0
    console.log({ selectedItems })
    selectedItems.forEach(({ qty, unit, itemId }) => {
      const pricesList = fullItems.find((item) => item.id == itemId)?.prices
      const { total: itemTotal, price } = calculateTotal(
        unit,
        asNumber(qty),
        pricesList || []
      )
      total += asNumber(itemTotal)
    })
    return total
  }
  const total = calculateFullTotal(selectedItems, fullItems)

  return (
    <Box className="flex w-full justify-between sticky bottom-12 bg-blue-300 mt-4 p-1 ">
      <Modal {...modal}>
        <ItemsList items={fullItems} />
        <Typography className="text-xl font-bold my-4 text-end">
          Total: ${asNumber(total)?.toFixed(2)}
        </Typography>
      </Modal>

      <Typography>
        Articulos: {fullItems?.length || 0} <AppIcon icon="eye" />
      </Typography>
      <Typography className="text-xl font-bold my-4">
        Total: ${asNumber(total)?.toFixed(2) || 0}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => modal.onOpen()}
      >
        Checkout
      </Button>
    </Box>
  )
}
const ItemsList = ({ items }: { items: (ArticleType | null)[] }) => {
  const sortByCat = (
    a: { category: string } | null,
    b: { category: any } | null
  ): number => a?.category?.localeCompare(b?.category || '') || 0

  return (
    <Box>
      <Box className={'grid grid-cols-5'}>
        <Box>Categoria</Box>
        <Box>No.Serie</Box>
        <Box>Cant</Box>
        <Box>Tiempo</Box>
        <Box>Precio</Box>
      </Box>
      {items
        .sort(sortByCat)
        .map((item, i) =>
          item ? (
            <ItemRow key={item.id} item={item} />
          ) : (
            <Typography key={i}>{`Articulo no encontrado`}</Typography>
          )
        )}
    </Box>
  )
}
const calculateTotal = (
  unit: PriceType['unit'] | undefined,
  qty: PriceType['quantity'],
  pricesList: PriceType[]
): { total: number; price?: PriceType } => {
  let total = 0
  let price = undefined
  const defaultPrice = pricesList[0]
  if (!unit || !qty)
    return {
      total:
        asNumber(defaultPrice.price) * asNumber(defaultPrice.quantity) || 0,
      price: defaultPrice
    }
  const fullMatch = pricesList?.find(
    (p) => p.unit === unit && p.quantity == qty
  )
  if (fullMatch) {
    total = asNumber(fullMatch.price)
    price = fullMatch
    return { total, price }
  }
  const unitMatch = pricesList?.find((p) => {
    return p.unit === unit
  })
  if (unitMatch) {
    const prePrice =
      (asNumber(unitMatch?.price) || 0) / (asNumber(unitMatch?.quantity) || 1)
    total = unitMatch ? asNumber(prePrice) * asNumber(qty) : 0
    price = unitMatch
    return { total, price }
  }

  total = asNumber(pricesList[0]?.price)
  price = pricesList[0]

  return { total: asNumber(asNumber(total).toFixed(2)), price }
}
export const ItemRow = ({ item }: { item: ArticleType }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const itemsFromParams = JSON.parse(searchParams.get('items') || '')

  const [qty, setQty] = useState(item.prices?.[0].quantity || 1)
  const [unit, setUnit] = useState(item.prices?.[0].unit)
  const [priceSelected, setPriceSelected] = useState<PriceType | undefined>(
    undefined
  )

  const { total: itemTotal, price } = calculateTotal(
    unit,
    qty,
    item.prices || []
  )

  useEffect(() => {
    setPriceSelected(price)
  }, [price])

  //* update url with new item values {qty & unit}
  useEffect(() => {
    //* find oldItem
    const oldItem = itemsFromParams?.find((i) => i.itemId == item.id)
    //* update data
    const newItem = { ...oldItem, qty, unit }
    //* replace item in array
    const newItems = [...itemsFromParams].map((i) => {
      return i.itemId == item.id ? newItem : i
    })
    //*set the new url
    const params = new URLSearchParams()
    params.set('items', JSON.stringify(newItems))
    router.replace(pathname + '?' + params)
  }, [item.id, itemsFromParams, pathname, qty, router, unit])

  const uniquePrices = [
    ...new Set(item.prices?.map((price) => price.unit))
  ].map((unit) => ({
    label: unit,
    value: unit
  }))

  const modal = useModal({ title: 'Detalles de articulo' })
  const isSelectedPrice = (p: PriceType) => {
    return (
      priceSelected?.unit === p.unit && priceSelected?.quantity === p.quantity
    )
  }
  const handleRemoveItem = () => {
    // return handleRemoveArticle?.(item.id)
    //* get items
    const itemsFromParams = JSON.parse(searchParams.get('items') || '')
    //* remove item
    const newItems = itemsFromParams?.filter((i) => i.itemId != item.id)
    //* set items
    const params = new URLSearchParams()
    params.set('items', JSON.stringify(newItems))
    router.replace(pathname + '?' + params)
  }
  console.log({ item })
  return (
    <Box
      key={item?.id}
      className={
        'grid grid-cols-5 items-center place-content-center my-2 shadow-md rounded-md p-2 text-center'
      }
    >
      <Box className="col-span-5 flex justify-end ">
        <button onClick={modal.onOpen}>
          <AppIcon icon="eye" />
        </button>
        <Modal {...modal}>
          <Box>
            <Box className="text-center mb-4">
              <p>Serie: {item.serialNumber}</p>
              <p>{item.name && 'Nombre: ' + item.name}</p>
              <p>Categoria: {item.category}</p>
            </Box>
            <Box className="grid gap-2 grid-flow-col">
              {item.prices?.map((p, i) => (
                <Box
                  key={i}
                  className={`${
                    isSelectedPrice(p) ? 'bg-blue-300' : ''
                  } shadow-md rounded-md p-2 text-center`}
                >
                  <p>
                    {p?.quantity} {p?.unit}
                  </p>
                  ${asNumber(p.price).toFixed(2)}
                </Box>
              ))}
            </Box>
            <Typography variant="body2" className="text-center">
              Origen del precio:{' '}
              <span className="font-bold">
                {item.ownPrice ? 'Articulo' : 'Categoria'}*
              </span>
            </Typography>

            <Box>
              <ModalConfirm
                handleConfirm={handleRemoveItem}
                color="error"
                label="Eliminar"
              >
                <Typography className="text-center text-xl ">
                  Remover articulo de la lista
                </Typography>
              </ModalConfirm>
            </Box>
          </Box>
        </Modal>
      </Box>
      <Typography>{item?.category}</Typography>
      <Typography>{item?.serialNumber || item?.name}</Typography>
      <NumberInput
        name="qty"
        defaultValue={qty}
        onChange={(value) => setQty(value)}
      />
      <Select
        onSelect={(value) => setUnit(value)}
        label="Unidad"
        selected={unit}
        options={uniquePrices}
      />
      <Box>
        <Typography className="text-center">{itemTotal}</Typography>
      </Box>
    </Box>
  )
}

export default Checkout
