'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, TextField, Typography } from '@mui/material'
import ModalConfirm from './ModalConfirm'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { ArticleType } from '@/types/article'
import Select from './Select'
import { addArticle, updateArticle } from '@/firebase/articles'

interface IFormInput {
  name: string
}

const ArticleForm = ({ article }: { article?: ArticleType | null }) => {
  const router = useRouter()
  const { currentCompany, setUserCompanies } = useUserCompaniesContext()
  const { handleSubmit, register, watch, setValue } = useForm({
    defaultValues: article || {
      name: ''
    }
  })

  const formValues = watch()
  const [done, setDone] = useState(false)
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!currentCompany?.id) return console.error('no company id')
    if (article?.id) {
      return updateArticle(currentCompany?.id, article?.id, data)
        .then((res) => {
          setUserCompanies()
          router.back()
        })
        .catch(console.error)
        .finally(() => setDone(true))
    }
    addArticle(currentCompany?.id, data)
      .then((res) => {
        setUserCompanies()
        router.back()
      })
      .catch(console.error)
      .finally(() => setDone(true))
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
        selected={formValues.category}
        onSelect={(value) => setValue('category', value)}
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
          <Typography>
            Nombre: <strong className="font-bold"> {formValues.name}</strong>
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
