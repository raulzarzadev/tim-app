'use client'
import { PaymentMethods, paymentMethods } from '@/CONST/paymentMethods'
import useModal from '@/hooks/useModal'
import useUser from '@/hooks/useUser'
import { Friend, NewClient } from '@/types/user'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import Modal from './Modal'
import CurrencySpan from './CurrencySpan'
import {
  cancelClientPayment,
  deleteClient,
  getClient,
  updateClient
} from '@/firebase/clients'

import ModalConfirm from './ModalConfirm'

const activityRequireInsurance = async (activityId?: string) => {
  if (activityId)
    return await getActivity(activityId).then((activity) => {
      return !!activity.requiresInsurance
    })
}

const assignInsurancePolicy = async (
  user: NewClient | Friend,
  currentPolicyNumber: number
) => {
  const activityRequiresInsurance = await activityRequireInsurance(
    user.activity?.id
  )
  return {
    ...user,
    insurancePolicyNumber: activityRequiresInsurance
      ? currentPolicyNumber + 1
      : 'n/a'
  }
}

const ModalPayment = ({ client }: { client: NewClient }) => {
  const { user } = useUser()
  const { parkConfig } = useParkConfig()
  const USD_PRICE = asNumber(parkConfig?.dollarPrice)
  const subtotal = subtotalFromClient(client)

  const parkUserCount = parkConfig?.usersCount || 0
  const handlePay = async () => {
    if (!client?.id) return
    try {
      const clientId = client.id || ''

      //* update payment client
      const payment: NewClient['payment'] = {
        amount: subtotal,
        date: new Date(),
        method: paymentMethod,
        discount,
        created: {
          by: user?.id,
          at: new Date()
        },
        dollarPrice: USD_PRICE
      }
      const res = await updateClient(clientId, { payment })

      //* Update client userNumber and friends user number
      const awaitingClient = await getClient(clientId)
      const { friends } = awaitingClient

      const newFriends = await Promise.all(
        friends.map(async (friend: any) => {
          //* Update park user count
          if (parkConfig?.id) await incrementUsersCount(parkConfig?.id)

          return { ...friend, userNumber: parkUserCount + 2 }
        })
      )
      const countData = {
        friends: newFriends,
        userNumber: parkUserCount + 1
      }
      await updateClient(clientId, countData)
      //* Update park user count
      if (parkConfig?.id) await incrementUsersCount(parkConfig?.id)
    } catch (error) {
      console.error(error)
    }

    return
  }

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>('cash')
  const [discount, setDiscount] = useState<number>(0)
  const [amount, setAmount] = useState(0)
  const modalDetails = useModal()
  const total = subtotal - subtotal * (asNumber(discount) / 100)
  const showDiscountInput = user?.isAdmin || user?.rol === USER_ROL.COORDINATOR
  const showCortesia = user?.isAdmin || user?.rol === USER_ROL.COORDINATOR
  const handleOpenEdit = () => {
    modalDetails.handleOpen()
  }
  const handleSetAmount = (amount: number) => {
    setAmount(amount)
  }

  const amountInMXN = paymentMethod === 'usd' ? amount * USD_PRICE : amount

  const handleSetAsCortesia = (isFree: boolean) => {
    setDiscount(isFree ? 100 : 0)
  }
  const confirmPaymentModal = useModal()
  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault()
          handleOpenEdit()
        }}
        size="small"
      >
        {client.payment ? 'Detalles' : 'Pagar'}
      </Button>
      <Modal {...modalDetails} title={`Detalle de cliente: ${client.name}`}>
        <PaymentClientTable client={client} />
        <Box className="flex flex-col w-full justify-evenly mb-4">
          {!!client.payment ? (
            <>
              <AmountInfo payment={client.payment} />
              <ModalCancelPayment clientId={client.id || ''} />
              <ModalEditPayment payment={client.payment} />
              <ModalDeletePayment
                clientId={client.id || ''}
                usersCount={(client.friends?.length || 0) + 1}
              />
            </>
          ) : (
            <>
              <AmountInfo
                discount={discount}
                subtotal={subtotal}
                dollarPrice={USD_PRICE}
              />

              {showDiscountInput && (
                <Box className="flex w-full justify-end items-baseline my-2">
                  <TextField
                    inputProps={{
                      inputMode: 'numeric',
                      // pattern: '[0-9]*',
                      min: 0,
                      max: 100,
                      step: 5
                    }}
                    className="w-24 "
                    name="discount"
                    label="Descuento"
                    size="small"
                    type="number"
                    value={discount || ''}
                    onChange={(e) => {
                      setDiscount(asNumber(e.target.value))
                    }}
                  />
                </Box>
              )}
              <Box>
                <Typography variant="h5" className="text-center">
                  Total: <CurrencySpan quantity={total} />
                </Typography>
              </Box>
              {showCortesia && (
                <Box className="justify-end flex w-full">
                  <FormControlLabel
                    onChange={(e) => {
                      //@ts-ignore
                      handleSetAsCortesia(e.target?.checked as boolean)
                    }}
                    label="Es cortesia"
                    control={<Checkbox />}
                  />
                </Box>
              )}

              <Box className="flex w-full justify-center">
                <FormControl className="">
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Metodo de pago
                  </FormLabel>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value as PaymentMethods)
                    }}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="cash"
                      control={<Radio />}
                      label="Efectivo"
                    />
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label="Tarjeta"
                    />
                    <FormControlLabel
                      value="usd"
                      control={<Radio />}
                      label="Dolares"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box className="flex w-full justify-evenly items-center my-4">
                <TextField
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    min: 0
                  }}
                  className=" "
                  name="amount"
                  label="Recibido"
                  type="number"
                  value={asNumber(amount) || ''}
                  onChange={(e) => {
                    handleSetAmount(asNumber(e.target.value))
                  }}
                  helperText={
                    amountInMXN < total
                      ? `Faltan $${asNumber(total - amountInMXN).toFixed(2)}`
                      : `Sobran $${asNumber(amountInMXN - total).toFixed(2)}`
                  }
                />
                <LoadingButton
                  disabled={amountInMXN < total}
                  variant="contained"
                  color="success"
                  onClick={() => {
                    // return handlePay()
                    confirmPaymentModal.handleOpen()
                  }}
                  label="Pagar"
                  icon={'money'}
                />
                <ModalConfirm
                  buttonConfirmProps={{
                    onClick: () => handlePay(),
                    color: 'success',
                    label: 'Pagar'
                  }}
                  {...confirmPaymentModal}
                  title="Confirmar pago"
                >
                  <Box className="text-center">
                    <Typography className="text-center my-8" variant="h5">
                      Confirmar pago
                    </Typography>
                    <Typography>
                      Metodo:{' '}
                      {
                        paymentMethods.find((m) => m.key === paymentMethod)
                          ?.label
                      }
                    </Typography>
                    <Typography>
                      Recibido (mxn) : <CurrencySpan quantity={amountInMXN} />
                    </Typography>
                    <Typography>
                      Cambio (mxn) :{' '}
                      <CurrencySpan quantity={amountInMXN - total} />
                    </Typography>
                  </Box>
                </ModalConfirm>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  )
}

const ModalDeletePayment = ({
  clientId,
  usersCount
}: {
  clientId: string
  usersCount: number
}) => {
  const modal = useModal()
  const { parkConfig } = useParkConfig()
  const handleDeleteClient = async (clientId: string) => {
    try {
      await deleteClient(clientId)
      //** You should not reduce the user count */
      // await incrementUsersCount(parkConfig?.id || '', -usersCount)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Button
        color="error"
        variant="outlined"
        onClick={(e) => {
          modal.handleOpen()
        }}
      >
        Eliminar cliente
      </Button>
      <ModalConfirm
        {...modal}
        title="Eliminar cliente"
        buttonConfirmProps={{
          onClick: () => handleDeleteClient(clientId),
          label: 'Eliminar',
          color: 'error'
        }}
      >
        <Typography>
          ¿Estas seguro de que desas eliminar este cliente?
        </Typography>
      </ModalConfirm>
    </>
  )
}

const PaymentClientTable = ({ client }: { client: NewClient }) => {
  const users = [client, ...(client.friends || [])]
  return (
    <Box className="my-4">
      <Typography className="text-end">
        {client?.created?.at &&
          dateFormat(client?.created?.at, 'dd/MMM HH:mm ')}{' '}
      </Typography>
      <UsersList users={users} />
      <Box className="flex w-full justify-evenly text-center items-center my-4"></Box>
    </Box>
  )
}

const AmountInfo = ({
  subtotal = 0,
  discount = 0,
  dollarPrice = 0,
  payment
}: {
  subtotal?: number
  discount?: number
  dollarPrice?: number
  payment?: NewClient['payment']
}) => {
  const total = addDiscount(subtotal, discount)
  const { collaborators } = useCollaborators()
  return (
    <>
      {payment ? (
        <Box className="text-center">
          <Typography>Pagado</Typography>
          <Typography variant="h5">
            <CurrencySpan
              quantity={addDiscount(payment.amount, payment.discount)}
            />
          </Typography>
          {payment.discount > 0 && (
            <p>
              <span>Descuento:</span>
              <Typography color={'green'} component={'span'}>
                -{payment.discount}%
              </Typography>
            </p>
          )}
          <span className="text-sm font-normal">
            Metodo de pago:{' '}
            {paymentMethods.find((p) => p.key === payment.method)?.label}
            {payment.method === 'usd' && ` ($${payment.dollarPrice})`}
          </span>
          <Typography>
            {dateFormat(
              asDate(payment.created.at || payment.date),
              'dd/MMM HH:mm'
            )}
          </Typography>
          <Typography>
            Cobrado por:{' '}
            {payment.created.by &&
              collaborators?.find((c) => c.id === payment.created.by)?.name}
          </Typography>
        </Box>
      ) : (
        <Box className="text-end">
          {!!discount && (
            <>
              <Typography>
                Subtotal:
                <CurrencySpan quantity={subtotal} />{' '}
              </Typography>
              <Typography>
                Descuento:
                <Typography component={'span'}> %{discount}</Typography>
              </Typography>
            </>
          )}
          <Typography>
            <Typography component={'span'}>
              <CurrencySpan quantity={total} />
              {'mxn'}
            </Typography>
          </Typography>
          <Typography>
            <Typography component={'span'} className="text-xs">
              (<CurrencySpan quantity={dollarPrice} />)
            </Typography>
            <Typography component={'span'}>
              <CurrencySpan quantity={total / dollarPrice} />
              {'usd'}
            </Typography>
          </Typography>
        </Box>
      )}
    </>
  )
}

const ModalCancelPayment = ({ clientId }: { clientId: string }) => {
  const modal = useModal()
  const handleCanclePayment = (clientId: string) => {
    console.log('cancel', clientId)
    //updateClient(clientId,{payment})
    return cancelClientPayment({ clientId })
  }
  return (
    <Box>
      <Button
        fullWidth
        variant="outlined"
        onClick={(e) => {
          e.preventDefault()
          modal.handleOpen()
        }}
      >
        Cancelar Pago
      </Button>
      <ModalConfirm
        {...modal}
        title="Cancelar pago"
        buttonConfirmProps={{
          onClick: () => handleCanclePayment(clientId),
          color: 'success',
          label: 'Cancelar Pago'
        }}
      >
        <Typography className="text-center my-6">
          ¿Estas seguro de que desas cancelar este pago?
        </Typography>
      </ModalConfirm>
    </Box>
  )
}

const ModalEditPayment = ({ payment }: { payment: NewClient['payment'] }) => {
  const modalEdit = useModal()
  const handleOpenEdit = () => {
    modalEdit.handleOpen()
  }

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={(e) => {
          e.preventDefault()
          handleOpenEdit()
        }}
      >
        Editar
      </Button>
      <Modal {...modalEdit} title="Editar pago">
        <AmountInfo payment={payment} />
      </Modal>
    </>
  )
}
export default ModalPayment
