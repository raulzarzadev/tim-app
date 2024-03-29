'use client'
import { CompanyItem } from '@/types/article'
import { Box, Button, Fab, TextField, Typography } from '@mui/material'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import { useEffect, useState } from 'react'
import ModalPayment from './ModalPayment2'
import ModalClientInfo from './ModalClientInfo'
import { calculateFullTotal } from '@/lib/calculateTotalItem'
import { inputDateFormat } from '@/lib/utils-date'
import CheckboxLabel from './Checkbox'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import asDate from '@/lib/asDate'
import ModalConfirm from './ModalConfirm'
import useCashboxContext from '@/context/useCompanyCashbox'
import AppIcon from './AppIcon'
import AssignForm from './AssignForm'
import CheckoutItems from './CheckoutItems'

const Checkout = () => {
  const { currentCompany } = useUserCompaniesContext()
  const {
    client,
    itemsSelected = [],
    onClearOrder,
    setItemsSelected
  } = useCashboxContext()
  const categories = currentCompany?.categories
  const items = currentCompany?.articles

  const modal = useModal({ title: 'Lista de articulos' })

  const fullItems: (CompanyItem | null)[] = itemsSelected?.map(
    (searchItem: { itemId?: string }) => {
      const fullItem = items?.find((item) => item?.id == searchItem.itemId)
      if (!fullItem) return null
      if (fullItem?.ownPrice) return fullItem
      const categoryPrices = categories?.find(
        (c) => c.name === fullItem?.category
      )?.prices

      return { ...fullItem, prices: categoryPrices }
    }
  )

  const total = calculateFullTotal(itemsSelected, fullItems)
  const handleClearSearch = () => {
    onClearOrder?.()
  }

  if (fullItems?.length === 0) return <></>
  return (
    <>
      <Fab
        color="primary"
        className="fixed bottom-24 right-5 bg-blue-400"
        aria-label="add"
        sx={{ bottom: 88, right: 22, position: 'fixed' }}
        onClick={() => modal.onOpen()}
      >
        <AppIcon icon="cashbox" />
      </Fab>
      <Modal {...modal}>
        <CheckoutItems
          itemsSelected={itemsSelected}
          setItemsSelected={setItemsSelected}
        />
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
        <Box className="flex w-full justify-evenly">
          <Button
            variant="outlined"
            onClick={() => {
              handleClearSearch()
            }}
          >
            Limpiar
          </Button>
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
  const {
    handleOrder,
    setItemsSelected,
    setClient,
    setShipping,
    shipping,
    client,
    setOrderSaved,
    orderSaved
  } = useCashboxContext()

  const handleSaveOrder = async () => {
    const res = await handleOrder?.({
      companyId: currentCompany?.id || ''
    })
    //@ts-ignore
    setOrderSaved?.(res?.res?.id)

    //* omit onClear()
  }

  const [shippingMenu, setShippingMenu] = useState({
    inStore: true,
    pickupNow: true
  })

  useEffect(() => {
    isPickupNow(shippingMenu.pickupNow)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingMenu.pickupNow])

  const isPickupNow = (isPickupNow: boolean) => {
    setItemsSelected?.((items) =>
      items.map((item) => ({
        ...item,
        inUse: isPickupNow,
        rentStatus: isPickupNow ? 'taken' : 'pending'
      }))
    )
  }
  return (
    <Box className="flex flex-col items-center my-4">
      <CheckboxLabel
        label="Entregar en tienda"
        checked={shippingMenu.inStore}
        onChange={(e) => {
          setShippingMenu((order) => ({
            ...order,
            inStore: e.target.checked
          }))
        }}
      />
      {!shippingMenu.inStore && (
        <Box>
          <TextField
            label="Dirección"
            value={shipping?.address || client?.address}
            onChange={(e) => {
              setShipping?.((shipping) => ({
                ...shipping,
                address: e.target.value
              }))
            }}
          />
        </Box>
      )}
      <Box className="flex justify-start ">
        <CheckboxLabel
          label="Entregar ahora"
          checked={shippingMenu.pickupNow}
          onChange={(e) =>
            setShippingMenu((order) => ({
              ...order,
              pickupNow: e.target.checked
            }))
          }
        />
      </Box>
      {!shippingMenu.pickupNow && (
        <Box className="mb-4">
          <TextField
            type="datetime-local"
            label=""
            onChange={(e) => {
              setShipping?.((shipping) => ({
                ...shipping,
                date: asDate(e.target.value) || new Date()
              }))
            }}
            value={inputDateFormat(shipping?.date || new Date())}
          />
        </Box>
      )}
      {(!shippingMenu.inStore || !shippingMenu.pickupNow) && (
        <ModalConfirm
          disabled={!client?.name || !!orderSaved}
          label={`${orderSaved ? 'Orden guardada' : 'Guardar orden'}`}
          handleConfirm={handleSaveOrder}
          color="secondary"
        >
          <Typography>
            Guardar orden. Podras pagarla ahora o en la sección
            recepción-pendientes
          </Typography>
        </ModalConfirm>
      )}
      <div className="my-4">
        <AssignForm
          assignTo={(e) => {
            setShipping?.((shipping) => ({
              ...shipping,
              assignedToEmail: e
            }))
          }}
          assignedTo={shipping?.assignedToEmail}
        />
      </div>
    </Box>
  )
}

export default Checkout
