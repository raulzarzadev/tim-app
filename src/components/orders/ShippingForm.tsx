import { Order } from '@/types/order'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
  setShipping?: Dispatch<SetStateAction<Order['shipping']>>
  handleSave?: (shipping: Order['shipping']) => Promise<void> | void
}) => {
  const defaultShipping: Order['shipping'] = {
    address: '',
    date: null,
    assignedToEmail: '',
    ...shipping
  }
  const [shippingMenu, setShippingMenu] = useState({
    inStore: shipping?.address == 'store' || !shipping?.address ? true : false,
    pickupNow: !shipping?.date,
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
    value: string | Date | number | null
  ) => {
    //const shippingCopy = { ..._shipping, [field]: value }
    _setShipping((shipping) => ({ ...shipping, [field]: value }))
    setShipping?.((shipping) => ({ ...shipping, [field]: value }))
  }
  console.log(shipping?.date)

  return (
    <Box className="flex flex-col items-center my-4">
      {/******   SHIPPING STAFF  */}

      <div className="my-4">
        <AssignForm
          handleAssign={(email, date) => {
            if (date) {
              handleChangeShipping('date', date)
              handleChangeShippingMenu('pickupNow', false)
            }
            handleChangeShipping('assignedToEmail', email)
          }}
          assignedTo={_shipping?.assignedToEmail}
          assignedAt={_shipping?.date}
        />
      </div>

      {/******   SHIPPING LOCATION  */}
      <CheckboxLabel
        test-id="shipping-in-store"
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
          test-id="shipping-now"
          label="Entregar ahora"
          checked={shippingMenu.pickupNow}
          onChange={(e) => {
            handleChangeShippingMenu('pickupNow', e.target.checked)
            if (e.target.checked) {
              handleChangeShipping('date', null)
            } else {
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
          test-id="shipping-free-cost"
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

      <div className="flex justify-evenly w-full ">
        <Button onClick={() => setShipping?.(defaultShipping)}>Limpiar</Button>
        <SaveButton
          test-id="save-shipping"
          type="submit"
          onClick={() => handleSave?.(_shipping)}
        />
      </div>
    </Box>
  )
}

export default ShippingForm
