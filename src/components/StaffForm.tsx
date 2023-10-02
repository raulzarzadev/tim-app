'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, TextField, Typography } from '@mui/material'
import ModalConfirm from './ModalConfirm'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { StaffType } from '@/types/staff'
import StaffPermissionsForm from './StaffPermissionsForm'
import { addStaff, removeStaff, updateStaff } from '@/firebase/staff'
import { useAuthContext } from '@/context/authContext'

interface IFormInput extends StaffType {}

const StaffForm = ({ staff }: { staff?: StaffType }) => {
  const router = useRouter()
  const { currentCompany, setUserCompanies } = useUserCompaniesContext()
  const { user } = useAuthContext()
  const { handleSubmit, register, watch, setValue } = useForm({
    defaultValues: staff || {
      name: ''
    }
  })

  const formValues = watch()
  const [done, setDone] = useState(false)
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!currentCompany?.id) return console.error('no company id')
    if (staff?.email) {
      return await updateStaff(
        currentCompany?.id || '',
        staff?.email || '',
        data
      )
        .then((res) => {
          setUserCompanies()
          // router.back()
        })
        .catch(console.error)
        .finally(() => setDone(true))
    }
    return addStaff(currentCompany?.id || '', data)
      .then((res) => {
        setUserCompanies()
        // router.back()
      })
      .catch(console.error)
      .finally(() => setDone(true))
  }
  const handleRemove = async () => {
    return await removeStaff(currentCompany?.id || '', staff?.email || '')
      .then((res) => {
        setUserCompanies()
        // router.back()
      })
      .catch(console.error)
  }

  const isOwner = user?.id === currentCompany?.userId

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
        isOwner={currentCompany?.userId === user?.id}
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
          <Typography>Se creara al siguiente empleado: </Typography>
          <Typography>{formValues.name}</Typography>
          <Typography>
            en <strong className="font-bold">{currentCompany?.name}.</strong>
          </Typography>
          <Typography>con los permisos:</Typography>
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
