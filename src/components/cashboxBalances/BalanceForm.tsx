import { Box, Button, TextField } from '@mui/material'
import Select from '../Select'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { useForm } from 'react-hook-form'
import { dateFormat, inputDateFormat } from '@/lib/utils-date'
import { Balance } from '@/types/balance'

const nowDate = new Date()
const defaultBalance: Balance = {
  from: nowDate,
  to: nowDate,
  cashier: 'all'
}

const BalanceForm = ({
  onCalculateBalance
}: {
  onCalculateBalance: (balance: Balance) => void
}) => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: defaultBalance
  })
  const formValues = watch()
  const onSubmit = (data: any) => {
    onCalculateBalance(data)
  }
  const { currentCompany } = useUserCompaniesContext()
  const staff =
    currentCompany?.staff?.map((staff) => ({
      label: staff.name,
      value: staff.email
    })) || []

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="grid grid-cols-2 gap-4">
          <TextField
            {...register('from', { valueAsDate: true })}
            value={inputDateFormat(formValues.from || nowDate)}
            type="datetime-local"
            label="Desde"
            inputProps={{
              max: dateFormat(formValues.to, "yyyy-MM-dd'T'HH:mm")
            }}
          />
          <TextField
            value={inputDateFormat(formValues.to || nowDate)}
            {...register('to', { valueAsDate: true })}
            type="datetime-local"
            label="Hasta"
            // max={dateFormat(nowDate, "yyyy-MM-dd'T'HH:mm")}
            inputProps={{
              max: dateFormat(new Date(), "yyyy-MM-dd'T'HH:mm")
            }}
          />
        </Box>
        <Box className="my-4">
          <Select
            fullWidth
            variant="outlined"
            //{...register('cashier')}
            selected={formValues.cashier}
            onSelect={(data) => setValue('cashier', data)}
            label="Usuario"
            options={[
              {
                label: 'Todos',
                value: 'all'
              },
              ...staff
            ]}
          />
        </Box>
        <Button className="my-4" variant="outlined" fullWidth type="submit">
          Generar
        </Button>
      </form>
    </div>
  )
}

export default BalanceForm
