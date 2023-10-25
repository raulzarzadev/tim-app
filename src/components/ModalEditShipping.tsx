import useModal from '@/hooks/useModal'
import Modal from './Modal'
import { Button, IconButton, TextField, Typography } from '@mui/material'
import AppIcon from './AppIcon'
import { useState } from 'react'
import { Order } from '@/types/order'
import CheckboxLabel from './Checkbox'
import { inputDateFormat } from '@/lib/utils-date'
import forceAsDate from '@/lib/forceAsDate'
import { updateOrder } from '@/firebase/orders'
import AssignForm from './AssignForm'

const ModalEditShipping = ({ order }: { order: Order }) => {
  const [shipping, setShipping] = useState<Order['shipping']>(order.shipping)
  const modal = useModal({ title: 'Cambiar dirección' })

  const [loading, setLoading] = useState(false)
  const handleSave = async () => {
    try {
      setLoading(true)
      console.log({ shipping })
      await updateOrder(order.id, { shipping })
      setLoading(false)
      setTimeout(() => {
        modal.onClose()
      }, 300)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
  const nowDate = new Date()
  const itsNow = forceAsDate(shipping.date).getTime() === nowDate.getTime()

  return (
    <div className="flex justify-center  ">
      <Button
        color="primary"
        onClick={(e) => modal.onOpen()}
        disabled={loading}
        variant="outlined"
        fullWidth
      >
        Editar entrega <AppIcon icon="edit" />
      </Button>
      <Modal {...modal}>
        <div className="grid gap-4">
          <CheckboxLabel
            label="Entregar en tienda"
            checked={shipping.address === 'store'}
            onChange={(e) =>
              setShipping((shipping) => ({
                ...shipping,
                address: shipping.address === 'store' ? '' : 'store'
              }))
            }
          />
          {shipping.address !== 'store' && (
            <TextField
              value={shipping.address}
              onChange={(e) =>
                setShipping((shipping) => ({
                  ...shipping,
                  address: e.target.value
                }))
              }
            ></TextField>
          )}

          <CheckboxLabel
            label="Entregar ahora"
            checked={itsNow}
            onChange={(e) => {
              setShipping((shipping) => ({
                ...shipping,
                date: e.target.checked ? new Date() : order.shipping.date
              }))
            }}
          />

          {!itsNow && (
            <TextField
              type="datetime-local"
              value={inputDateFormat(shipping.date)}
              onChange={(e) =>
                setShipping((shipping) => ({
                  ...shipping,
                  date: forceAsDate(e.target.value)
                }))
              }
            ></TextField>
          )}

          <AssignForm
            assignTo={(email) =>
              setShipping((shipping) => ({
                ...shipping,
                assignedToEmail: email
              }))
            }
            assignedTo={shipping.assignedToEmail}
          />

          <Button onClick={() => handleSave()} variant="outlined" fullWidth>
            Guardar
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default ModalEditShipping
