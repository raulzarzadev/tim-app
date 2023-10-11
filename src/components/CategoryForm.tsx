'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Input, TextField, Typography } from '@mui/material'
import ModalConfirm from './ModalConfirm'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { CategoryType } from '@/types/category'
import { addCategory, updateCategory } from '@/firebase/categories'
import PricesForm from './PricesForm'

interface IFormInput {
  name: string
}

const CategoryForm = ({ category }: { category?: CategoryType }) => {
  const router = useRouter()
  const { currentCompany } = useUserCompaniesContext()
  const { handleSubmit, register, watch, setValue } = useForm({
    defaultValues: category || {
      name: ''
    }
  })

  const formValues = watch()
  const [done, setDone] = useState(false)
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!currentCompany?.id) return console.error('no company id')
    if (category?.name) {
      return await updateCategory(
        currentCompany?.id || '',
        category?.name || '',
        data
      )
        .then((res) => {
          router.back()
        })
        .catch(console.error)
        .finally(() => setDone(true))
    }
    addCategory(currentCompany?.id || '', data)
      .then((res) => {
        router.back()
      })
      .catch(console.error)
      .finally(() => setDone(true))
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

      <PricesForm
        prices={category?.prices}
        setPrices={(prices) => setValue('prices', prices)}
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
