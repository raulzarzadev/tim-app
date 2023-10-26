import { Order } from '@/types/order'
import { Dispatch, useState } from 'react'
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
    inStore: true,
    pickupNow: true
  })

  const [_shipping, _setShipping] = useState(
    shipping || {
      address: '',
      date: new Date(),
      assignedToEmail: ''
    }
  )

  const handleChangeShipping = (field: string, value: string | Date) => {
    const shippingCopy = { ..._shipping, [field]: value }
    _setShipping(shippingCopy)
    setShipping?.(shippingCopy)
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
            value={_shipping?.address}
            onChange={(e) => {
              handleChangeShipping('address', e.target.value)
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
              handleChangeShipping('date', forceAsDate(e.target.value))
            }}
            value={inputDateFormat(_shipping?.date || new Date())}
          />
        </Box>
      )}

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
