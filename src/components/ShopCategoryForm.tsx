'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TextField, Typography } from '@mui/material'
import ModalConfirm from './ModalConfirm'
import { useState } from 'react'
import { CategoryType } from '@/types/category'
import PricesForm from './PricesForm'
import InputUploadFile from './InputUploadFile'
import PreviewImage from './PreviewImage'

interface IFormInput {
  name: string
}

const ShopCategoryForm = ({
  category,
  onSubmit
}: {
  category?: CategoryType
  onSubmit: (data: Partial<CategoryType>) => Promise<any>
}) => {
  const { handleSubmit, register, watch, setValue } = useForm({
    defaultValues: category || {
      name: ''
    }
  })

  const formValues = watch()
  const [done, setDone] = useState(false)
  const _onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setDone(false)
    await onSubmit?.(data).then(console.log).catch(console.error)
    setDone(true)
  }
  console.log({ formValues })

  return (
    <form className="grid gap-4 max-w-md mx-auto">
      <InputUploadFile
        label="Imagen "
        setURL={(url) => setValue('image', url, { shouldDirty: true })}
      />
      {formValues?.image && (
        <PreviewImage
          fullWidth
          src={formValues?.image || ''}
          alt="Identificación de categoria"
        />
      )}
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
        <ModalConfirm handleConfirm={handleSubmit(_onSubmit)} disabled={done}>
          <Typography>Se creara la siguiente categoria: </Typography>
          <Typography>{formValues.name}</Typography>
        </ModalConfirm>
      </div>
    </form>
  )
}

export default ShopCategoryForm
