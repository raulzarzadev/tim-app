'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography
} from '@mui/material'
import ModalConfirm from './ModalConfirm'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { ArticleType } from '@/types/article'
import Select from './Select'
import { addArticle, updateArticle } from '@/firebase/articles'
import PricesForm from './PricesForm'

interface IFormInput {
  name: string
}

const ArticleForm = ({
  article,
  goBack = true
}: {
  article?: ArticleType | null
  goBack?: boolean
}) => {
  const router = useRouter()
  const params = useSearchParams()

  const { currentCompany } = useUserCompaniesContext()
  const { handleSubmit, register, watch, setValue, reset } = useForm({
    defaultValues: article || {
      name: '',
      category: params.get('category') || ''
    }
  })

  const formValues = watch()
  const [done, setDone] = useState(false)
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!currentCompany?.id) return console.error('no company id')
    try {
      if (article?.id) {
        const res = await updateArticle(currentCompany?.id, article?.id, data)
        console.log({ res })
        return res
      }
      const res = await addArticle(currentCompany?.id, data)
      console.log({ res })
      return res
    } catch (e) {
      console.error(e)
    } finally {
      setDone(true)
      goBack && router.back()

      reset()
      setTimeout(() => {
        setDone(false)
      }, 1000)
    }
  }

  return (
    <form className="grid gap-4">
      <Select
        label="Categoria"
        options={
          currentCompany?.categories?.map((c) => ({
            value: c.name,
            label: c.name
          })) || []
        }
        selected={formValues.category || ''}
        onSelect={(value) => setValue('category', value)}
      />
      <TextField
        id="outlined-basic"
        label="Serie:"
        variant="outlined"
        fullWidth
        {...register('serialNumber')}
      />
      <TextField
        id="outlined-basic"
        label="Nombre"
        variant="outlined"
        fullWidth
        {...register('name')}
      />
      <TextField
        id="outlined-basic"
        label="Color"
        fullWidth
        {...register('color')}
      />
      <Box>
        <FormControlLabel
          {...register('ownPrice')}
          control={<Checkbox />}
          label="Precio propio"
        />
        {formValues.ownPrice && (
          <PricesForm
            setPrices={(formValues) => setValue('prices', formValues)}
            prices={formValues.prices}
          />
        )}
      </Box>

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
          <Typography>Se creara el siguiente articulo: </Typography>
          {formValues.name && (
            <Typography>
              Nombre: <strong className="font-bold"> {formValues.name}</strong>
            </Typography>
          )}
          <Typography>
            Serie:{' '}
            <strong className="font-bold"> {formValues.serialNumber}</strong>
          </Typography>
          {formValues.category && (
            <Typography>
              Categoria:{' '}
              <strong className="font-bold">{formValues.category}</strong>{' '}
            </Typography>
          )}
          <Typography>
            Empresa{' '}
            <strong className="font-bold">{currentCompany?.name}.</strong>
          </Typography>
        </ModalConfirm>
      </div>
    </form>
  )
}

export default ArticleForm
