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
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { ArticleType } from '@/types/article'
import Select from './Select'
import { addArticle, updateArticle } from '@/firebase/articles'
import PricesForm from './PricesForm'
import InputUploadFile from './InputUploadFile'
import PreviewImage from './PreviewImage'
import TagsInput from './TagsInput'
import { CategoryType } from '@/types/category'

interface IFormInput {
  name: string
}

const ShopItemForm = ({
  item: article,
  shopCategories,
  onSubmit
}: {
  item?: ArticleType | null
  shopCategories: Partial<CategoryType>[]
  onSubmit?: (data: Partial<ArticleType>) => Promise<any>
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()

  const defaultCategoryName: string =
    searchParams.get('category') || params?.categoryName?.toString() || ''

  const { handleSubmit, register, watch, setValue, reset } = useForm({
    defaultValues: article || {
      name: '',
      category: defaultCategoryName
    }
  })
  const formValues = watch()
  const [done, setDone] = useState(false)
  const _onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setDone(false)
    await onSubmit?.(data).then(console.log).catch(console.error)
    setDone(true)
  }

  return (
    <form className="grid gap-4">
      <Select
        label="Categoria"
        options={
          shopCategories?.map((c) => ({
            value: c.name,
            label: c.name
          })) || []
        }
        selected={formValues.category || ''}
        onSelect={(value) => setValue('category', value)}
      />
      {article?.image && (
        <PreviewImage src={article?.image || ''} alt="item image description" />
      )}
      {/* {shopId && article?.id && (
        <InputUploadFile
          label="Imagen"
          setURL={(url) => {
            updateArticle(shopId || '', article?.id || '', {
              image: url
            })
          }}
        />
      )} */}
      <TextField
        id="outlined-basic"
        label="No. de serie"
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
      <TextField
        id="outlined-basic"
        label="Descripción"
        fullWidth
        {...register('description')}
      />
      <TagsInput
        setTags={(tags) =>
          setValue(
            'tags',
            tags.map((t) => ({ title: t.title }))
          )
        }
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
        <ModalConfirm handleConfirm={handleSubmit(_onSubmit)} disabled={done}>
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
          {/* <Typography>
            Empresa{' '}
            <strong className="font-bold">{shop}.</strong>
          </Typography> */}
        </ModalConfirm>
      </div>
    </form>
  )
}

export default ShopItemForm
