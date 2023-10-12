import { Box, Button, TextField } from '@mui/material'
import Select from '../Select'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { useForm } from 'react-hook-form'
import { dateFormat, inputDateFormat } from '@/lib/utils-date'
import asDate from '@/lib/asDate'

const BalanceForm = () => {
  const nowDate = new Date()
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      from: nowDate,
      to: nowDate,
      cashier: 'all'
    }
  })
  const formValues = watch()
  const onSubmit = (data: any) => {
    console.log(data)
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
            {...register('from')}
            value={inputDateFormat(formValues.from || new Date())}
            type="datetime-local"
            label="Desde"
          />
          <TextField
            value={inputDateFormat(formValues.to)}
            {...register('to')}
            type="datetime-local"
            label="Hasta"
          />
        </Box>
        <Box className="my-4">
          <Select
            fullWidth
            variant="outlined"
            //{...register('cashier')}
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
