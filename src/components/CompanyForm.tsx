'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Input, TextField, Typography } from '@mui/material'
import ModalConfirm from './ModalConfirm'
import { createCompany, updateCompany } from '@/firebase/companies'
import { useAuthContext } from '@/context/authContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { CompanyType } from '@/types/company'

interface IFormInput {
  name: string
}

const CompanyForm = ({ company }: { company?: CompanyType }) => {
  const router = useRouter()
  const { user } = useAuthContext()
  const { resetCompanies } = useUserCompaniesContext()
  const { handleSubmit, register, watch } = useForm({
    defaultValues: company || {
      name: ''
    }
  })

  const formValues = watch()
  const [done, setDone] = useState(false)

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      if (company?.id) {
        await updateCompany(company?.id, data)
          .then((res) => {
            console.log(res)
          })
          .catch((err) => console.error(err))
      } else {
        await createCompany({
          name: data?.name,
          userId: user?.id || '',
          staff: [
            {
              id: user?.id || '',
              permissions: {
                ADMIN: true
              },
              name: user?.name || '',
              email: user?.email || ''
            }
          ]
        })
          .then((res) => {
            console.log(res)
            router.push('/dashboard')
          })
          .catch((err) => console.error(err))
      }
      setDone(true)
      resetCompanies?.()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className="grid gap-4">
      <TextField
        id="outlined-basic"
        label="Nombre de la empresa"
        variant="outlined"
        fullWidth
        {...register('name')}
      />
      <TextField
        id="outlined-basic"
        label="Descripción"
        fullWidth
        multiline
        placeholder="Describe brevemente los productos que tu empresa ofrece"
        rows={3}
        {...register('description')}
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
          <Typography>Se creara la siguiente empresa: </Typography>
          <Typography>{formValues.name}</Typography>
        </ModalConfirm>
      </div>
    </form>
  )
}

export default CompanyForm
