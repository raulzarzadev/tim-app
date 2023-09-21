'use client'
import { ArticleType } from '@/types/article'
import { Box, Button, Typography } from '@mui/material'
import Modal from './Modal'
import Select from './Select'
import AppIcon from './AppIcon'
import useModal from '@/hooks/useModal'
import { useContext, useEffect, useState } from 'react'
import NumberInput from './NumberInput'
import { PriceType } from './PricesForm'
import ModalConfirm from './ModalConfirm'
import { CategoryType } from '@/types/category'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import asNumber from '@/lib/asNumber'
import { CheckoutContext } from './Checkout'
import { CashboxContext } from './CompanyCashbox'

const Checkout = ({
  items,
  categories
}: {
  items?: (ArticleType | null)[]
  categories?: CategoryType[]
}) => {
  const { setArticles } = useContext(CashboxContext)

  const modal = useModal({ title: 'Lista de articulos' })
  const { get } = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const selectedItems = JSON.parse(get('items') || '[]')
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
  const handleClearSearch = () => {
    router.replace(pathname)
    setArticles?.([])
  }

  return (
    <>
      <Box className="flex-col-reverse  sm:flex-row flex w-full justify-between sticky bottom-12 bg-blue-300 mt-4 p-2 items-center  rounded-md shadow-md rounded-b-none">
        <Button
          variant="outlined"
          onClick={() => {
            handleClearSearch()
          }}
        >
          Limpiar
        </Button>
        <Box>
          <Typography className="text-center">
            Articulos: {fullItems?.length || 0} <AppIcon icon="eye" />
          </Typography>
          <Typography className="text-xl font-bold my-4">
            Total: ${asNumber(total)?.toFixed(2) || 0}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => modal.onOpen()}
        >
          Lista de Articulos
        </Button>
      </Box>
      <Modal {...modal}>
        <ItemsList items={fullItems} />
        <Typography className="text-xl font-bold my-4 text-end">
          Total: ${asNumber(total)?.toFixed(2)}
        </Typography>
      </Modal>
    </>
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
  const defaultPrice = pricesList?.[0]

  if (!unit || !qty)
    return {
      total:
        asNumber(defaultPrice?.price) * asNumber(defaultPrice?.quantity) || 0,
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
  const foundItem = itemsFromParams.find(
    (i: { itemId: string }) => i.itemId == item.id
  )
  const [qty, setQty] = useState(
    foundItem.qty || item.prices?.[0].quantity || 1
  )
  const [unit, setUnit] = useState(foundItem.unit || item.prices?.[0].unit)
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

  useEffect(() => {
    //* update url with new item values {qty & unit}
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

  const handleRemoveItem = () => {
    //* return handleRemoveArticle?.(item.id)

    //* remove item
    const newItems = itemsFromParams?.filter((i) => i.itemId != item.id)
    //* set items
    const params = new URLSearchParams()
    params.set('items', JSON.stringify(newItems))
    router.replace(pathname + '?' + params)
  }
  const handleSelectPrice = (p: PriceType) => {
    setUnit(p.unit)
    setQty(p.quantity)
  }
  const isSelectedPrice = (p: PriceType) => {
    return (
      priceSelected?.unit === p.unit && priceSelected?.quantity === p.quantity
    )
  }
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
                  component={Button}
                  onClick={() => handleSelectPrice(p)}
                  key={i}
                  className={`${
                    isSelectedPrice(p) ? 'bg-blue-300' : ''
                  } shadow-md rounded-md p-2 text-center flex flex-col justify-center`}
                >
                  <p>
                    {p?.quantity} {p?.unit}
                  </p>
                  <p>${asNumber(p.price).toFixed(2)}</p>
                </Box>
              ))}
            </Box>
            <Typography variant="body2" className="text-center">
              Origen del precio:{' '}
              <span className="font-bold">
                {item.ownPrice ? 'Articulo' : 'Categoria'}*
              </span>
            </Typography>

            <Box className="flex justify-center my-4">
              <ModalConfirm
                handleConfirm={handleRemoveItem}
                color="warning"
                label="Descartar"
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
        value={qty}
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
