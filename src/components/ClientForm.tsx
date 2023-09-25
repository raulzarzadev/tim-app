import { Client } from '@/types/client'
import { Button, TextField } from '@mui/material'
import { Dispatch } from 'react'
import { useForm } from 'react-hook-form'
import InputFile from './InputFile'

const ClientForm = ({
  client,
  setClient
}: {
  setClient?: (client: Partial<Client>) => void
  client?: Partial<Client>
}) => {
  const { handleSubmit, register } = useForm({
    defaultValues: client
  })
  const onSubmit = (data: Partial<Client>) => {
    setClient?.(data)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        {/* client name */}
        <TextField {...register('name')} label="Nombre" />
        {/* client phone */}
        <TextField {...register('phone')} label="Telefono" />
        {/* client email */}
        <TextField {...register('email')} type="email" label="Email" />
        {/* client address */}
        <TextField {...register('address')} label="Dirección" />
        {/* client id
        <TextField
          {...register('imageID')}
          type="file"
          //label="Identificación"
        /> */}
        <InputFile label="Identificación" />

        {/* client signature */}
        <Button type="submit">Guardar</Button>
      </form>
    </div>
  )
}

export default ClientForm
