'use client'
import { ArticleType } from '@/types/article'
import { Box, Button, Typography } from '@mui/material'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import { useContext } from 'react'
import { CategoryType } from '@/types/category'
import asNumber from '@/lib/asNumber'
import { CashboxContext } from './CompanyCashbox'
import ModalPayment from './ModalPayment2'
import ModalClientInfo from './ModalClientInfo'
import CheckoutItemsList from './CheckoutItemsList'
import { calculateFullTotal } from '@/lib/calculateTotalItem'
import { dateFormat } from '@/lib/utils-date'
import rentTime from '@/lib/rentTime'
import { addMinutes } from 'date-fns'

const Checkout = ({
  items,
  categories
}: {
  items?: (ArticleType | null)[]
  categories?: CategoryType[]
}) => {
  const {
    setItems,
    items: selectedItems = [],
    client
  } = useContext(CashboxContext)
  const modal = useModal({ title: 'Lista de articulos' })

  const fullItems: Partial<ArticleType>[] = selectedItems?.map(
    (searchItem: { itemId?: string }) => {
      const fullItem = items?.find((item) => item?.id == searchItem.itemId)
      if (fullItem?.ownPrice) return fullItem
      const categoryPrices = categories?.find(
        (c) => c.name === fullItem?.category
      )?.prices
      return { ...fullItem, prices: categoryPrices }
    }
  )
  const total = calculateFullTotal(selectedItems, fullItems)
  const handleClearSearch = () => {
    setItems?.([])
  }
  const returnBack = (): Date => {
    const qty = selectedItems[0].qty
    const unit = selectedItems[0].unit
    const time = rentTime(qty, unit)
    return addMinutes(new Date(), time)
  }

  if (fullItems.length === 0) return <></>
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
            Articulos: {fullItems?.length || 0}
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
        <CheckoutItemsList items={fullItems} />
        {/* <ItemsList items={fullItems} /> */}
        <Typography className="text-end mt-4">
          Regreso:
          {dateFormat(returnBack(), ' dd-MMM HH:mm')}
        </Typography>
        <Typography className="text-xl font-bold mb-4 text-end">
          Total: ${asNumber(total)?.toFixed(2)}
        </Typography>
        <Box className="my-4">
          <ModalClientInfo />
        </Box>
        <Box className="flex w-full justify-center">
          <ModalPayment
            amount={total}
            disabled={!client?.name}
            onCloseParent={() => modal.onClose()}
          />
        </Box>
      </Modal>
    </>
  )
}

export default Checkout
