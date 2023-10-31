import asNumber from '@/lib/asNumber'
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import ModalConfirm from './ModalConfirm'
import { useForm } from 'react-hook-form'
import { paymentMethods } from '@/CONSTS/paymentMethods'
import CurrencySpan from './CurrencySpan'

import AppIcon from './AppIcon'
import { Payment } from '@/types/order'

const PaymentForm = ({
  amount = 0,
  usdPrice = 1,
  onPay,
  exactAmount = true
}: {
  exactAmount?: boolean
  amount: number
  usdPrice: number
  onPay?: ({
    amount,
    usdPrice,
    method,
    charged
  }: Pick<
    Payment,
    'amount' | 'method' | 'usdPrice' | 'charged' | 'rest' | 'ref'
  >) => void | Promise<any>
}) => {
  const USD_PRICE = usdPrice
  const { register, watch } = useForm<{
    amount: number
    paymentMethod: Payment['method']
    ref?: string
  }>({
    defaultValues: {
      paymentMethod: 'mxn'
    }
  })
  const formValues = watch()
  const handlePay = () => {
    onPay?.({
      amount,
      method: formValues.paymentMethod,
      charged: asNumber(formValues.amount),
      usdPrice: USD_PRICE,
      rest: amountInMXN - amount > 0 ? amountInMXN - amount : 0
    })
  }
  const amountInMXN = asNumber(
    formValues.paymentMethod === 'usd'
      ? formValues.amount * USD_PRICE
      : formValues.amount
  )

  const disableOnPay = exactAmount && amountInMXN < amount

  return (
    <div>
      <Box className="flex w-full justify-center">
        <FormControl className="">
          <FormLabel id="demo-row-radio-buttons-group-label">
            Metodo de pago
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {paymentMethods.map((p) => (
              <FormControlLabel
                key={p.type}
                value={p.type}
                checked={formValues.paymentMethod === p.type}
                control={<Radio />}
                label={p.label}
                {...register('paymentMethod')}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
      <Box className="max-w-sm mx-auto">
        {formValues.paymentMethod === 'deposit' && (
          <TextField
            label="Referencia"
            {...register('ref')}
            fullWidth
            required
          />
        )}
      </Box>
      <Box className="flex w-full justify-evenly items-center my-4">
        <TextField
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            min: 0
          }}
          className=" "
          label="Recibido"
          type="number"
          {...register('amount')}
          helperText={
            amountInMXN < amount
              ? `Faltan $${asNumber(amount - amountInMXN).toFixed(2)}`
              : `Sobran $${asNumber(amountInMXN - amount).toFixed(2)}`
          }
        />

        <ModalConfirm
          disabled={disableOnPay}
          handleConfirm={async () => {
            return handlePay()
          }}
          color="success"
          label={
            <span className="flex items-center">
              Pagar <AppIcon icon="money" />
            </span>
          }
          modalTitle="Confirmar pago"
        >
          <Box className="text-center">
            <Typography>
              Metodo:{' '}
              {
                paymentMethods.find((m) => m.type === formValues.paymentMethod)
                  ?.label
              }
            </Typography>
            <Typography>
              Recibido (mxn) : <CurrencySpan quantity={amountInMXN} />
            </Typography>
            <Typography>
              {(amountInMXN - amount || 0) < 0 ? 'Faltan' : 'Sobran'}:{' '}
              <CurrencySpan quantity={Math.abs(amountInMXN - amount)} />
            </Typography>
          </Box>
        </ModalConfirm>
      </Box>{' '}
    </div>
  )
}

export default PaymentForm
