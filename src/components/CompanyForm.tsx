'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Input, TextField, Typography } from '@mui/material'
import ModalConfirm from './ModalConfirm'
import { createCompany } from '@/firebase/companies'
import { useAuthContext } from '@/context/authContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface IFormInput {
  name: string
}

const CompanyForm = () => {
  const { user } = useAuthContext()
  const router = useRouter()
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      name: ''
    }
  })

  const formValues = watch()
  const [done, setDone] = useState(false)
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data)
    try {
      const res = await createCompany({
        name: data?.name,
        userId: user?.id || ''
      })
      setDone(true)
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
      <div className="flex w-full justify-evenly my-4">
        <Button
          onClick={(e) => {
            e.preventDefault()
            router.back()
          }}
        >
          Atras
        </Button>
        <ModalConfirm handleConfirm={handleSubmit(onSubmit)} disabled={done}>
          <Typography>Se creara la siguiente compañia: </Typography>
          <Typography>{formValues.name}</Typography>
        </ModalConfirm>
      </div>
    </form>
  )
}

export default CompanyForm
