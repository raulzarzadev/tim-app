import { UserType } from '@/types/user'
import { LoadingButton } from '@mui/lab'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import CheckboxLabel from './Checkbox'

const UserForm = ({
  user,
  setUser
}: {
  user?: Partial<UserType>
  setUser?: (user: Partial<UserType>) => void | Promise<any>
}) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty }
  } = useForm({
    defaultValues: user
  })
  const [loading, setLoading] = useState(false)
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await setUser?.(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        <TextField {...register('email')} label="Correo" disabled />
        <TextField {...register('name')} label="Nombre" />
        <TextField {...register('phone')} label="Teléfono" />

        <LoadingButton type="submit" disabled={!isDirty} loading={loading}>
          Actualizar
        </LoadingButton>
      </div>
    </form>
  )
}

export default UserForm
