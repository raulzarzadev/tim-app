import { Client } from '@/types/client'
import { Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import InputFile from './InputUploadFile'
import ModalSignature from './ModalSignature'
import PreviewImage from './PreviewImage'
import PhoneInput from './PhoneInput'
import { useEffect } from 'react'
import useCashboxContext from '@/context/useCompanyCashbox'
import SearchClient from './SearchClient'

const ClientForm = () => {
  const { client, setClient } = useCashboxContext()
  const { handleSubmit, register, setValue, watch, control, reset } = useForm({
    defaultValues: { phone: '', name: '', ...client } as Partial<Client>
  })
  const onSubmit = (data: Partial<Client>) => {
    setClient?.(data)
  }

  const formValues = watch()
  const imageId = formValues.imageID
  const signature = formValues.signature
  const name = formValues.name
  const phone = formValues.phone

  useEffect(() => {
    handleSubmit(onSubmit)()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId, signature, name, phone])

  return (
    <div>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4"
      >
        {/* client name */}
        <div className="flex">
          <TextField
            {...register('name')}
            label="Nombre"
            required
            className="w-full"
          />{' '}
          <div>
            <SearchClient
              onSelectClient={(e) => {
                setClient?.(e)
                setValue('id', e.id)
                setValue('name', e.name)
                setValue('phone', e.phone)
                setValue('email', e.email)
                setValue('address', e.address)
                setValue('imageID', e.imageID)
                setValue('signature', e.signature)
              }}
            />
          </div>
        </div>
        {/* client phone */}
        <PhoneInput {...register('phone')} label="Teléfono" control={control} />
        {/* client email */}
        <TextField {...register('email')} type="email" label="Email" />
        {/* client address */}
        <TextField {...register('address')} label="Dirección" />

        <InputFile
          label="Identificación"
          setURL={(url) => setValue('imageID', url)}
        />
        {imageId && (
          <PreviewImage src={imageId} alt="Identificación de usuario" />
        )}

        <ModalSignature
          setSignature={(signature) => setValue('signature', signature || '')}
        />
        {signature && <PreviewImage src={signature} alt="Firma de usuario" />}
        {/* client signature */}
        <Button
          onClick={(e) => {
            e.preventDefault()
            setClient?.({})
            setValue('id', '')
            setValue('name', '')
            setValue('phone', '')
            setValue('email', '')
            setValue('address', '')
            setValue('imageID', '')
            setValue('signature', '')
          }}
        >
          Limpiar
        </Button>
      </form>
    </div>
  )
}

export default ClientForm
