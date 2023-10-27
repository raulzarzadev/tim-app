import { Client } from '@/types/client'
import { Box, Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import InputUploadFile from '../InputUploadFile'
import PreviewImage from '../PreviewImage'
import ModalSignature from '../ModalSignature'
import PhoneInput from '../PhoneInput'

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
        <TextField {...register('name')} label="Nombre" required />
        <TextField {...register('email')} label="Email" required />
        <PhoneInput {...register('phone')} label="Teléfono" control={control} />
        <TextField {...register('address')} label="Dirección" required />

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
        <Box className="flex justify-evenly">
          <Button onClick={handleClear}>Limpiar</Button>
          <Button type="submit">Enviar</Button>
        </Box>
      </form>
    </div>
  )
}

export default ClientForm
