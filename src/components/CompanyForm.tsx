'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, TextField, Typography } from '@mui/material'
import ModalConfirm from './ModalConfirm'
import { createCompany, updateCompany } from '@/firebase/companies'
import { useAuthContext } from '@/context/authContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CompanyType } from '@/types/company'
import PhoneInput from './PhoneInput'
import ErrorBoundary from './ErrorBoundary'
import useWindowSize from '@/hooks/useWindowSize'
import InputUploadFile from './InputUploadFile'
import PreviewImage from './PreviewImage'

interface IFormInput {
  name: string
}

const CompanyForm = ({ company }: { company?: Partial<CompanyType> }) => {
  const router = useRouter()
  const { user } = useAuthContext()
  const { handleSubmit, register, watch, control, setValue } = useForm({
    defaultValues: {
      phone: '',
      name: '',
      contract: '',
      ...company
    } as Partial<CompanyType>
  })

  const formValues = watch()
  const [done, setDone] = useState(false)
  const { windowWidth } = useWindowSize()
  const contractRows =
    !windowWidth || !formValues.contract?.length
      ? 4
      : Math.floor(formValues.contract?.length / (windowWidth / 11))

  const onSubmit: SubmitHandler<Partial<IFormInput>> = async (data) => {
    try {
      if (company?.id) {
        await updateCompany(company?.id, data)
          .then((res) => {
            console.log(res)
          })
          .catch((err) => console.error(err))
      } else {
        await createCompany({
          name: data?.name || '',
          userId: user?.id || '',
          staffMails: [user?.email || ''],
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
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ErrorBoundary componentName="CompanyForm">
      <form className="grid gap-4">
        <InputUploadFile
          label="Imagen principal"
          setURL={(url) => setValue('image', url, { shouldDirty: true })}
        />
        {formValues?.image && (
          <PreviewImage
            fullWidth
            src={formValues?.image || ''}
            alt="Identificación de usuario"
          />
        )}

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
        <PhoneInput {...register('phone')} label="Teléfono" control={control} />
        <TextField
          className="w-36"
          type="number"
          {...register('usdPrice')}
          label="Precio del dolar (usd)"
        />

        <TextField
          rows={contractRows}
          multiline
          {...register('contract')}
          label="Contrato"
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
    </ErrorBoundary>
  )
}

export default CompanyForm
