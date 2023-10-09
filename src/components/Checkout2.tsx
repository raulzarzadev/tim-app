'use client'
import { ArticleType } from '@/types/article'
import { Box, Button, TextField, Typography } from '@mui/material'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import { useContext, useState } from 'react'
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
import CheckboxLabel from './Checkbox'
import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import asDate from '@/lib/asDate'
import ModalConfirm from './ModalConfirm'

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
        <Box className="my-4 text-center">
          <ModalClientInfo />
          {!client?.name && (
            <Typography
              variant="caption"
              className="text-center italic "
              color={'error'}
            >
              *Faltan datos de cliente
            </Typography>
          )}
        </Box>
        <OrderOptions onCloseParent={() => modal.onClose()} />
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

const OrderOptions = ({ onCloseParent }: { onCloseParent?: () => void }) => {
  const { currentCompany } = useUserCompaniesContext()
  const { client, handleOrder, items, setItems, setClient } =
    useContext(CashboxContext)

  const [orderForm, setOrderForm] = useState({
    pickupStore: true,
    pickupNow: true,
    shippingAddress: '',
    shippingPrice: 0,
    schedule: new Date()
  })
  const handleSaveOrder = async () => {
    const res = await handleOrder?.({
      startAt: orderForm.schedule,
      companyId: currentCompany?.id || '',
      items: items || [],
      order: {
        ...orderForm
      }
    })
    console.log({ res })
    onCloseParent?.()
    setItems?.([])
    setClient?.({})
    onCloseParent?.()
  }

  return (
    <Box className="flex flex-col items-center my-4">
      <CheckboxLabel
        label="Entregar en tienda"
        checked={!!orderForm.pickupStore}
        onChange={(e) =>
          setOrderForm((order) => ({ ...order, pickupStore: e.target.checked }))
        }
      />
      {!orderForm.pickupStore && (
        <Box>
          <TextField
            label="Dirección"
            onChange={(e) => {
              setOrderForm((order) => ({
                ...order,
                shippingAddress: e.target.value
              }))
            }}
          />
        </Box>
      )}
      <Box className="flex justify-start ">
        <CheckboxLabel
          label="Entregar ahora"
          checked={!!orderForm.pickupNow}
          onChange={(e) =>
            setOrderForm((order) => ({
              ...order,
              pickupNow: e.target.checked
            }))
          }
        />
      </Box>
      {!orderForm.pickupNow && (
        <Box>
          <TextField
            type="datetime-local"
            label=""
            onChange={(e) => {
              setOrderForm((order) => ({
                ...order,
                schedule: asDate(e.target.value) || new Date()
              }))
            }}
            value={dateFormat(asDate(orderForm.schedule), "yyyy-MM-dd'T'HH:mm")}
          />
        </Box>
      )}
      {(!orderForm.pickupStore || !orderForm.pickupNow) && (
        <ModalConfirm
          label="Guardar orden"
          handleConfirm={handleSaveOrder}
          color="secondary"
        >
          <Typography></Typography>
        </ModalConfirm>
        // <Button
        //   disabled={!client?.name}
        //   className="mt-4 "
        //   variant="outlined"
        //   color="secondary"
        //   onClick={(e) => {
        //     e.preventDefault()
        //     handleSaveOrder()
        //   }}
        // >
        //   Guardar orden
        // </Button>
      )}
    </Box>
  )
}

export default Checkout
