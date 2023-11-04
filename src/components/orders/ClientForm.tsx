import { Client } from '@/types/client'
import { Box, Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import InputUploadFile from '../InputUploadFile'
import PreviewImage from '../PreviewImage'
import ModalSignature from '../ModalSignature'
import PhoneInput from '../PhoneInput'
import SearchClient from '../SearchClient'
import SaveButton from '../ButtonSave'

const ClientForm = ({
  client,
  setClient
}: {
  client?: Partial<Client>
  setClient?: (client?: Partial<Client>) => void
}) => {
  const { register, handleSubmit, control, setValue, reset } = useForm({
    defaultValues: {
      phone: '',
      name: '',
      address: '',
      email: '',
      imageID: '',
      signature: '',
      extraInfo: '',
      ...client
    } as Partial<Client>
  })
  const onSubmit = (data?: Partial<Client>) => {
    setClient?.(data)
  }

  const handleClear = () => {
    reset()
    setClient?.({})
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        {/* <TextField {...register('name')} label="Nombre" required /> */}
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
                // setClient?.(e) //* this line close the client form modal automatically
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
        <TextField {...register('email')} label="Email" />
        <PhoneInput {...register('phone')} label="Teléfono" control={control} />
        <TextField {...register('address')} label="Dirección" />
        <TextField
          {...register('extraInfo')}
          placeholder="Instrucciones de entrega o referencias del domicilo"
          multiline
          rows={2}
        />

        {/* Identificación */}
        <InputUploadFile
          label="Identificación"
          setURL={(url) => setValue('imageID', url)}
        />
        {client?.imageID && (
          <PreviewImage src={client?.imageID} alt="Identificación de usuario" />
        )}
        {/*
         Firma */}
        <ModalSignature
          setSignature={(signature) => setValue('signature', signature || '')}
        />
        {client?.signature && (
          <PreviewImage src={client?.signature} alt="Firma de usuario" />
        )}
        <Box className="flex justify-evenly my-6">
          <Button onClick={handleClear}>Limpiar</Button>
          <SaveButton type="submit" label="Guardar cliente" />
        </Box>
      </form>
    </div>
  )
}

export default ClientForm
