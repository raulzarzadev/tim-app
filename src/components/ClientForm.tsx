import { Client } from '@/types/client'
import { Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import InputFile from './InputUploadFile'
import ModalSignature from './ModalSignature'
import PreviewImage from './PreviewImage'
import PhoneInput from './PhoneInput'

const ClientForm = ({
  client,
  setClient
}: {
  setClient?: (client: Partial<Client>) => void
  client?: Partial<Client>
}) => {
  const { handleSubmit, register, setValue, watch, control } = useForm({
    defaultValues: client
  })
  console.log({ client })
  const onSubmit = (data: Partial<Client>) => {
    setClient?.(data)
  }
  const formValues = watch()
  const imageId = formValues.imageID
  const signature = formValues.signature
  // const name = formValues.name
  // const phone = formValues.phone

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        {/* client name */}
        <TextField {...register('name')} label="Nombre" required />
        {/* client phone */}
        <PhoneInput {...register('phone')} label="Teléfono" control={control} />
        {/* <TextField {...register('phone')} label="Teléfono" required /> */}
        {/* client email */}
        <TextField {...register('email')} type="email" label="Email" />
        {/* client address */}
        {/* <TextField {...register('address')} label="Dirección" /> */}

        {imageId && (
          <PreviewImage src={imageId} alt="Identificación de usuario" />
        )}

        <InputFile
          label="Identificación"
          setURL={(url) => setValue('imageID', url)}
        />
        {signature && <PreviewImage src={signature} alt="Firma de usuario" />}
        <ModalSignature
          setSignature={(signature) => setValue('signature', signature || '')}
        />
        {/* client signature */}
        <Button variant="outlined" type="submit">
          Guardar
        </Button>
      </form>
    </div>
  )
}

export default ClientForm
