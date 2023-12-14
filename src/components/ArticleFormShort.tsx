'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, TextField, Typography } from '@mui/material'
import ModalConfirm from './ModalConfirm'
import { useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { ArticleType } from '@/types/article'
import { addArticle, updateArticle } from '@/firebase/articles'
import InputUploadFile from './InputUploadFile'
import PreviewImage from './PreviewImage'
import TagsInput from './TagsInput'
import { createItem, updateItem } from '@/firebase/items'

interface IFormInput {
  name: string
  companyId?: string
}

const ArticleFormShort = ({
  article,
  goBack = true,
  companyId
}: {
  article?: ArticleType | null
  goBack?: boolean
  companyId: string
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
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const itemId = article?.id
    if (!companyId) return console.error('no company id')
    if (itemId) {
      //* update company article (in company collection)

      await updateArticle(companyId, article?.id, data)
        .then(console.log)
        .catch(console.error)
      //* update item(in item collection)
      await updateItem(itemId, data)
        .then(console.log)
        .catch(console.error)
        .finally(() => {
          setDone(true)
          goBack && router.back()
          reset()
          setTimeout(() => {
            setDone(false)
          }, 1000)
        })
    } else {
      data.companyId = companyId
      //* create company article (in company collection)
      await addArticle(companyId, data).then(console.log).catch(console.error)

      //* create item(in item collection)
      await createItem(data)
        .then(console.log)
        .catch(console.error)
        .finally(() => {
          setDone(true)
          goBack && router.back()

          reset()
          setTimeout(() => {
            setDone(false)
          }, 1000)
        })
    }
  }

  return (
    <form className="grid gap-4">
      {article?.image && (
        <PreviewImage src={article?.image || ''} alt="item image description" />
      )}

      <InputUploadFile
        label="Imagen"
        setURL={(url) => {
          setValue('image' || '', url)
        }}
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
          {formValues.serialNumber && (
            <Typography>
              Serie:{' '}
              <strong className="font-bold"> {formValues.serialNumber}</strong>
            </Typography>
          )}
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

export default ArticleFormShort
