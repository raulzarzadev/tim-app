import { Order } from '@/types/order'
import { Dispatch, useEffect, useState } from 'react'
import CheckboxLabel from '../Checkbox'
import { Box, TextField } from '@mui/material'
import { inputDateFormat } from '@/lib/utils-date'
import AssignForm from '../AssignForm'
import forceAsDate from '@/lib/forceAsDate'

const ShippingForm = ({
  shipping,
  setShipping
}: {
  shipping?: Order['shipping']
  setShipping?: Dispatch<Order['shipping']>
}) => {
  const [shippingMenu, setShippingMenu] = useState({
    inStore: shipping?.address == 'store' || !shipping?.address ? true : false,
    pickupNow:
      forceAsDate(shipping?.date).getTime() < new Date().getTime()
        ? false
        : true,
    freeShipping: !shipping?.amount
  })

  const [_shipping, _setShipping] = useState(
    shipping || {
      address: '',
      date: new Date(),
      assignedToEmail: ''
    }
  )

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
          onChange={(e) =>
            handleChangeShippingMenu('pickupNow', e.target.checked)
          }
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
    </Box>
  )
}

export default ShippingForm
