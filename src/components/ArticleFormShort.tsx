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
  onSaveArticle
}: {
  article?: ArticleType | null
  onSaveArticle: (data: Partial<ArticleType>) => Promise<any>
}) => {
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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    return await onSaveArticle(data)?.then(console.log).catch(console.error)
  }

  const formValues = watch()

  const noImage = !formValues.image

  const disabled = noImage

  return (
    <form className="grid gap-4 pt-6" onSubmit={handleSubmit(onSubmit)}>
      {formValues.image && (
        <PreviewImage
          src={formValues.image || ''}
          alt="item image description"
        />
      )}

      <InputUploadFile
        label="Imagen"
        setURL={(url) => {
          setValue('image' || '', url)
        }}
      />
      {noImage && (
        <Typography variant="body2" color="error">
          * Una imagen es necesaria
        </Typography>
      )}

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

      <Button type="submit" variant="contained" disabled={disabled}>
        Guardar
      </Button>

      {/* <div className="flex w-full justify-evenly my-4">
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
        */}
    </form>
  )
}

export default ArticleFormShort
