import { Order } from '@/types/order'
import { Dispatch, useEffect, useState } from 'react'
import CheckboxLabel from '../Checkbox'
import { Box, Button, TextField } from '@mui/material'
import { inputDateFormat } from '@/lib/utils-date'
import AssignForm from '../AssignForm'
import forceAsDate from '@/lib/forceAsDate'
import SaveButton from '../ButtonSave'
import { isBefore } from 'date-fns'

const ShippingForm = ({
  shipping,
  setShipping,
  handleSave
}: {
  shipping?: Order['shipping']
  setShipping?: Dispatch<Order['shipping']>
  handleSave?: (shipping: Order['shipping']) => Promise<void> | void
}) => {
  const defaultShipping = {
    address: '',
    date: new Date(),
    assignedToEmail: '',
    ...shipping
  }
  const [shippingMenu, setShippingMenu] = useState({
    inStore: shipping?.address == 'store' || !shipping?.address ? true : false,
    pickupNow: isBefore(forceAsDate(shipping?.date), new Date()),
    freeShipping: !shipping?.amount
  })

  const [_shipping, _setShipping] = useState(defaultShipping)

  const handleChangeShippingMenu = (field: string, value: boolean) => {
    setShippingMenu((menu) => ({
      ...menu,
      [field]: value
    }))
  }

  const handleChangeShipping = (
    field: string,
    value: string | Date | number
  ) => {
    const shippingCopy = { ..._shipping, [field]: value }
    _setShipping(shippingCopy)
    setShipping?.(shippingCopy)
  }

  return (
    <Box className="flex flex-col items-center my-4">
      {/******   SHIPPING LOCATION  */}
      <CheckboxLabel
        label="Entregar en tienda"
        checked={shippingMenu.inStore}
        onChange={(e) => {
          e.target.checked && handleChangeShipping('address', 'store')
          handleChangeShippingMenu('inStore', e.target.checked)
        }}
      />
      {!shippingMenu.inStore && (
        <Box>
          <TextField
            label="Dirección"
            value={_shipping?.address}
            onChange={(e) => {
              handleChangeShipping('address', e.target.value)
            }}
          />
        </Box>
      )}

      {/******   SHIPPING DATE  */}
      <Box className="flex justify-start ">
        <CheckboxLabel
          label="Entregar ahora"
          checked={shippingMenu.pickupNow}
          onChange={(e) => {
            handleChangeShippingMenu('pickupNow', e.target.checked)
            if (e.target.checked) {
              handleChangeShipping('date', new Date())
            }
          }}
        />
      </Box>
      {!shippingMenu.pickupNow && (
        <Box className="mb-4">
          <TextField
            type="datetime-local"
            label=""
            onChange={(e) => {
              handleChangeShipping('date', forceAsDate(e.target.value))
            }}
            value={inputDateFormat(_shipping?.date || new Date())}
          />
        </Box>
      )}

      {/******   SHIPPING AMOUNT  */}

      <Box className="flex justify-start ">
        <CheckboxLabel
          label="Sin costo $"
          checked={shippingMenu.freeShipping}
          onChange={(e) => {
            handleChangeShippingMenu('freeShipping', e.target.checked)
            if (!!e.target.checked) {
              console.log('checked')
              handleChangeShipping('amount', 0)
            }
          }}
        />
      </Box>
      {!shippingMenu.freeShipping && (
        <Box className="mb-4">
          <TextField
            type="number"
            label="Costo de envío"
            onChange={(e) => {
              handleChangeShipping('amount', e.target.value)
            }}
            value={_shipping?.amount}
          />
        </Box>
      )}

      {/******   SHIPPING STAFF  */}

      <div className="my-4">
        <AssignForm
          assignTo={(e) => {
            handleChangeShipping('assignedToEmail', e)
          }}
          assignedTo={_shipping?.assignedToEmail}
        />
      </div>

      <div className="flex justify-evenly w-full ">
        <Button onClick={() => setShipping?.(defaultShipping)}>Limpiar</Button>
        <SaveButton type="submit" onClick={() => handleSave?.(_shipping)} />
      </div>
    </Box>
  )
}

export default ShippingForm
