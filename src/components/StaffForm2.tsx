'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, TextField, Typography } from '@mui/material'
import ModalConfirm from './ModalConfirm'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { StaffType } from '@/types/staff'
import StaffPermissionsForm from './StaffPermissionsForm'
import { removeStaff } from '@/firebase/staff'
import { useAuthContext } from '@/context/authContext'

interface IFormInput extends StaffType {}

const StaffForm = ({
  staff,
  setStaff,
  shopId
}: {
  staff?: StaffType
  setStaff?: (staff: Partial<StaffType>) => Promise<void>
  shopId?: string
}) => {
  const { handleSubmit, register, watch, setValue } = useForm({
    defaultValues: staff || {
      name: ''
    }
  })

  const formValues = watch()
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await setStaff?.(data).then(console.log).catch(console.error)
  }
  const handleRemove = async () => {
    return await removeStaff(shopId || '', staff?.email || '')
      .then((res) => {
        // router.back()
      })
      .catch(console.error)
  }

  const isOwner = true
  // const isOwner = useAuthContext().user?.email === staff?.email
  return (
    <form className="grid gap-4">
      <TextField
        id="outlined-basic"
        label="Nombre"
        variant="outlined"
        fullWidth
        {...register('name')}
      />
      <TextField
        id="outlined-basic-2"
        label="Correo"
        fullWidth
        placeholder="Correo electronico (gmail)"
        {...register('email')}
      />

      <StaffPermissionsForm
        permissions={staff?.permissions}
        setPermissions={(permissions) => setValue('permissions', permissions)}
        isOwner={isOwner}
        // newStaff={newStaff}
      />

      <div className="flex w-full justify-evenly my-4">
        <ModalConfirm handleConfirm={handleSubmit(onSubmit)}>
          <Typography>Se creara al siguiente empleado: </Typography>
          <Typography>{formValues.name}</Typography>
        </ModalConfirm>
      </div>
      <ModalConfirm
        label="Eliminar"
        disabled={isOwner}
        handleConfirm={handleRemove}
        color="error"
      >
        <Typography>¿Deseas eliminar empleado? </Typography>
        <Typography>{formValues.name}</Typography>
      </ModalConfirm>
    </form>
  )
}

export default StaffForm
