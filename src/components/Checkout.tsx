'use client'
import { ArticleType } from '@/types/article'
import { CategoryType } from '@/types/category'
import { Box, Button, Typography } from '@mui/material'
import Modal from './Modal'
import Select from './Select'
import AppIcon from './AppIcon'
import useModal from '@/hooks/useModal'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import NumberInput from './NumberInput'
import { PriceType } from './PricesForm'
import ModalConfirm from './ModalConfirm'

export type CheckoutContext = {
  setItemPayment?: (
    itemId: string,
    { qty, unit }: { qty: number; unit: PriceType['unit'] }
  ) => void
  fullArticlesSelected?: (ArticleType | null)[]
  articlesSelected?: ArticleType['id'][]
  setArticlesSelected?: (articles: ArticleType['id'][]) => void
  companyCategories?: CategoryType[]
  companyArticles?: ArticleType[]
  handleRemoveArticle?: (articleId: ArticleType['id']) => void
  total?: number
  setTotal?: Dispatch<SetStateAction<number>>
}
export const CheckoutContext = createContext<CheckoutContext>({})
export type CheckoutProviderProps = {
  children: ReactNode
  selected?: ArticleType['id'][]
  categories?: CategoryType[]
  articles?: ArticleType[]
}
export type Payment = {
  itemId: ArticleType['id']
  qty: number
  unit: PriceType['unit']
}
export const CheckoutContextProvider = ({
  selected,
  categories,
  articles,
  children
}: CheckoutProviderProps) => {
  const [paymentData, setPaymentData] = useState<Payment[]>([])
  const [total, setTotal] = useState(0)
  const [articlesSelected, _setArticlesSelected] = useState<
    ArticleType['id'][]
  >(selected || [])
  const [companyArticles] = useState<ArticleType[]>(articles || [])
  const [companyCategories] = useState<CategoryType[]>(categories || [])
  const [fullArticlesSelected, setFullArticlesSelected] = useState<
    (ArticleType | null)[]
  >([])

  useEffect(() => {
    const itemsDetails =
      articlesSelected?.map((articleId) => {
        const fullArt = companyArticles?.find(
          (article) => article.id === articleId
        )
        if (!fullArt) return null
        if (fullArt?.ownPrice) return fullArt
        const categoryPrice =
          companyCategories?.find(
            (category) => category.name === fullArt.category
          )?.prices || []
        return { ...fullArt, prices: categoryPrice }
      }) || []

    setFullArticlesSelected(itemsDetails || [])
  }, [articlesSelected, companyArticles, companyCategories])
  const setArticlesSelected = (articles: ArticleType['id'][]) => {
    _setArticlesSelected(articles)
  }
  const handleRemoveArticle = (articleId: ArticleType['id']) => {
    setArticlesSelected(
      articlesSelected?.filter((id) => id !== articleId) || []
    )
  }
  return (
    <CheckoutContext.Provider
      value={{
        fullArticlesSelected,
        articlesSelected,
        companyCategories,
        companyArticles,
        total,
        setTotal,
        setArticlesSelected,
        handleRemoveArticle,
        setItemPayment(itemId, { qty, unit }) {
          // setPaymentData(
          // )
        }
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}
const Checkout = () => {
  const modal = useModal({ title: 'Checkout' })
  const {
    articlesSelected,
    total,
    fullArticlesSelected: fullArticles
  } = useContext(CheckoutContext)
  if (articlesSelected?.length === 0) return null

  return (
    <Box className="flex w-full justify-between sticky bottom-12 bg-blue-300 mt-4 p-1 ">
      <Modal {...modal}>
        <ItemsList items={fullArticles || []} />
        <Typography className="text-xl font-bold my-4 text-end">
          Total: ${total?.toFixed(2)}
        </Typography>
      </Modal>

      <Typography>
        Articulos: {articlesSelected?.length || 0} <AppIcon icon="eye" />
      </Typography>
      <Typography className="text-xl font-bold my-4">
        Total: ${total?.toFixed(2) || 0}
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
const ItemsList = ({
  items
}: //payment
{
  items: (ArticleType | null)[]
  //payment: { qty: number; unit: string }
}) => {
  const sortByCat = (
    a: { category: string } | null,
    b: { category: any } | null
  ): number => a?.category.localeCompare(b?.category || '') || 0

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

export const ItemRow = ({ item }: { item: ArticleType }) => {
  const { handleRemoveArticle, setItemPayment } = useContext(CheckoutContext)
  const calculateTotal = (
    unit: PriceType['unit'] | undefined,
    qty: PriceType['quantity'],
    pricesList: PriceType[]
  ): { total: number; price?: PriceType } => {
    let total = 0
    let price = undefined
    if (!unit || !qty) return { total: 0 }
    const fullMatch = pricesList.find(
      (p) => p.unit === unit && p.quantity === qty
    )
    if (fullMatch) {
      total = fullMatch.price
      price = fullMatch
      return { total, price }
    } else {
      const unitMatch = pricesList.find((p) => {
        return p.unit === unit
      })
      const prePrice = (unitMatch?.price || 0) / (unitMatch?.quantity || 1)
      total = unitMatch ? prePrice * qty : 0
      price = unitMatch
    }

    return { total: Number(total.toFixed(2)), price }
  }

  const [qty, setQty] = useState(item.prices?.[0].quantity || 1)
  const [unit, setUnit] = useState(item.prices?.[0].unit || '')
  const [priceSelected, setPriceSelected] = useState<PriceType | undefined>(
    undefined
  )

  const { total: itemTotal, price } = calculateTotal(
    unit,
    qty,
    item.prices || []
  )

  useEffect(() => {
    setItemPayment?.(item.id, { qty, unit })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setPriceSelected(price)
  }, [price])

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
    return handleRemoveArticle?.(item.id)
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
                  key={i}
                  className={`${
                    isSelectedPrice(p) ? 'bg-blue-300' : ''
                  } shadow-md rounded-md p-2 text-center`}
                >
                  <p>
                    {p.quantity} {p.unit}
                  </p>
                  ${p.price.toFixed(2)}
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

export const CheckoutWithContext = ({
  articles,
  categories,
  selected
}: Omit<CheckoutProviderProps, 'children'>) => {
  return (
    <CheckoutContextProvider
      articles={articles}
      categories={categories}
      selected={selected}
    >
      <Checkout />
    </CheckoutContextProvider>
  )
}

export default Checkout
