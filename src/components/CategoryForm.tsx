'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Input, TextField, Typography } from '@mui/material'
import ModalConfirm from './ModalConfirm'
import { addCategory, createCompany, updateCompany } from '@/firebase/companies'
import { useAuthContext } from '@/context/authContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { CategoryType } from '@/types/category'

interface IFormInput {
  name: string
}

const CategoryForm = ({ category }: { category?: CategoryType }) => {
  const router = useRouter()
  const { currentCompany } = useUserCompaniesContext()
  const { handleSubmit, register, watch } = useForm({
    defaultValues: category || {
      name: ''
    }
  })

  const formValues = watch()
  const [done, setDone] = useState(false)
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log({ data })
    if (!currentCompany?.id) return console.error('no company id')
    try {
      await addCategory(currentCompany?.id || '', data)
      setDone(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className="grid gap-4">
      <TextField
        id="outlined-basic"
        label="Nombre de la categoria"
        variant="outlined"
        fullWidth
        {...register('name')}
      />
      <TextField
        id="outlined-basic"
        label="Descripción"
        fullWidth
        multiline
        placeholder="Breve descrición de la categoria"
        rows={3}
        {...register('description')}
      />

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
          <Typography>Se creara la siguiente categoria: </Typography>
          <Typography>{formValues.name}</Typography>
          <Typography>
            en <strong className="font-bold">{currentCompany?.name}.</strong>
          </Typography>
        </ModalConfirm>
      </div>
    </form>
  )
}

export default CategoryForm
