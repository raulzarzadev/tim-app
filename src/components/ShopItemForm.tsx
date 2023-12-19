'use client'
import { useForm } from 'react-hook-form'
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography
} from '@mui/material'
import ModalConfirm from './ModalConfirm'
import { useParams, useSearchParams } from 'next/navigation'
import { ArticleType } from '@/types/article'
import Select from './Select'
import TagsInput from './TagsInput'
import { CategoryType } from '@/types/category'
import PricesForm from './PricesForm'
import PreviewImage from './PreviewImage'

const ShopItemForm = ({
  item: article,
  shopCategories,
  onSubmit
}: {
  item?: Partial<ArticleType> | null
  shopCategories: Partial<CategoryType>[]
  onSubmit?: (data: Partial<ArticleType>) => Promise<any>
}) => {
  const searchParams = useSearchParams()
  const params = useParams()

  const defaultCategoryName: string =
    searchParams.get('category') || params?.categoryName?.toString() || ''

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { isSubmitting, isDirty }
  } = useForm({
    defaultValues: article || {
      name: '',
      category: defaultCategoryName
    }
  })
  const formValues = watch()

  const _onSubmit = async (data: Partial<ArticleType>) => {
    await onSubmit?.(data).then(console.log).catch(console.error)
    reset(data)
  }
  const disableSave = isSubmitting || !isDirty

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
        onSelect={(value) => setValue('category', value, { shouldDirty: true })}
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
        value={formValues.tags || []}
        setTags={(tags) =>
          setValue(
            'tags',
            tags.map((t) => ({ title: t.title })),
            { shouldDirty: true }
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
            setPrices={(formValues) =>
              setValue('prices', formValues, {
                shouldDirty: true,
                shouldTouch: true
              })
            }
            prices={formValues.prices}
          />
        )}
      </Box>

      <div className="flex w-full justify-evenly my-4">
        <ModalConfirm
          handleConfirm={handleSubmit(_onSubmit)}
          disabled={disableSave}
        >
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
        </ModalConfirm>
      </div>
    </form>
  )
}

export default ShopItemForm
