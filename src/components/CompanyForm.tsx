'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input, TextField, Typography } from '@mui/material'
import ModalConfirm from './ModalConfirm'
import { createCompany } from '@/firebase/companies'
import { useAuthContext } from '@/context/authContext'

interface IFormInput {
  name: string
}

const CompanyForm = () => {
  const { user } = useAuthContext()
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      name: ''
    }
  })

  const formValues = watch()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data)
    try {
      const res = await createCompany({
        name: data?.name,
        userId: user?.id || ''
      })
      console.log({ res })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form>
      <TextField
        id="outlined-basic"
        label="Nombre de la empresa"
        variant="outlined"
        fullWidth
        {...register('name')}
      />
      {/* <Controller
        name="iceCreamType"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' }
            ]}
          />
        )}
      /> */}
      <ModalConfirm handleConfirm={handleSubmit(onSubmit)}>
        <Typography>Se creara la siguiente compañia: </Typography>
        <Typography>{formValues.name}</Typography>
      </ModalConfirm>
    </form>
  )
}

export default CompanyForm
