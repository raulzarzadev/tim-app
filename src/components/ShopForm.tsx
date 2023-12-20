'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { TextField, Typography } from '@mui/material'
import ModalConfirm from './ModalConfirm'
import { CompanyType } from '@/types/company'
import PhoneInput from './PhoneInput'
import ErrorBoundary from './ErrorBoundary'
import useWindowSize from '@/hooks/useWindowSize'
import InputUploadFile from './InputUploadFile'
import PreviewImage from './PreviewImage'
import CheckboxLabel from './Checkbox'
import { useEffect, useState } from 'react'
import { getCompany } from '@/firebase/companies'

interface IFormInput {
  name: string
}

const ShopForm = ({
  shopId,
  onSubmit
}: {
  shopId?: Partial<CompanyType>['id']
  // </CompanyType>company?: Partial<CompanyType>
  onSubmit?: (data: Partial<CompanyType>) => Promise<void> | void
}) => {
  const {
    handleSubmit,
    register,
    watch,
    control,
    setValue,
    reset,
    formState: { isDirty, isSubmitting }
  } = useForm()

  const [shop, setShop] = useState<Partial<CompanyType>>()
  useEffect(() => {
    if (shopId) {
      getCompany(shopId || '')
        .then((shop) => {
          setShop(shop)
          reset(shop)
        })
        .catch(console.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId])

  const formValues = watch()
  const { windowWidth } = useWindowSize()
  const contractRows =
    !windowWidth || !formValues.contract?.length
      ? 4
      : Math.floor(formValues.contract?.length / (windowWidth / 11))

  const _onSubmit: SubmitHandler<Partial<IFormInput>> = async (data) => {
    const res = await onSubmit?.(data)
    reset(data)
    return res
  }

  const disabled = isSubmitting || !isDirty

  return (
    <ErrorBoundary componentName="ShopForm">
      <form className="grid gap-4">
        <InputUploadFile
          label="Imagen principal"
          setURL={(url) => setValue('image', url, { shouldDirty: true })}
        />
        {formValues?.image && (
          <PreviewImage fullWidth src={formValues?.image || ''} alt="Tienda" />
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
        <div
          className="p-2  !border-gray-400 shadow-sm rounded-md my-4"
          style={{ border: '1px solid ' }}
        >
          <Typography className="mb-4">Configuraciones </Typography>
          <div>
            <CheckboxLabel
              checked={!!formValues?.shippingEnabled}
              label="Habilitar entregas"
              // {...register('shippingEnabled')}
              onChange={(e) => {
                setValue('shippingEnabled', e.target.checked, {
                  shouldDirty: true
                })
              }}
            />
            <CheckboxLabel
              checked={!!formValues?.confirmClientData}
              label="Confirmar datos del cliente antes de comenzar renta"
              // {...register('shippingEnabled')}
              onChange={(e) => {
                setValue('confirmClientData', e.target.checked, {
                  shouldDirty: true
                })
              }}
            />
            <CheckboxLabel
              checked={!!formValues?.visible}
              label="Empresa visible en el mercado"
              // {...register('shippingEnabled')}
              onChange={(e) => {
                setValue('visible', e.target.checked, {
                  shouldDirty: true
                })
              }}
            />
          </div>
        </div>

        <div className="flex w-full justify-evenly my-4">
          <ModalConfirm
            handleConfirm={handleSubmit(_onSubmit)}
            disabled={disabled}
            label={`${shop?.id ? 'Editar' : 'Guardar'} empresa`}
            acceptLabel={`${shop?.id ? 'Editar' : 'Guardar'}`}
          >
            <Typography>
              Se {`${shop?.id ? 'editara' : 'creara'} `} la siguiente empresa:{' '}
            </Typography>
            <Typography>{formValues.name}</Typography>
          </ModalConfirm>
        </div>
      </form>
    </ErrorBoundary>
  )
}

export default ShopForm
