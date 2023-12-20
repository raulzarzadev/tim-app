'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TextField, Typography } from '@mui/material'
import ModalConfirm from '../ModalConfirm'
import { StaffType } from '@/types/staff'
import StaffPermissionsForm from '../StaffPermissionsForm'
import { addStaff, removeStaff, updateStaff } from '@/firebase/staff'
import { useAuthContext } from '@/context/authContext'
import { useUserShopContext } from '@/context/userShopContext'

interface IFormInput extends StaffType {}

const ShopStaffForm = ({ staffEmail }: { staffEmail?: string }) => {
  const { userShop } = useUserShopContext()
  const { user } = useAuthContext()
  const shopId = userShop?.id
  const staff = userShop?.staff?.find((s) => s.email === staffEmail) || null
  const { handleSubmit, register, watch, setValue } = useForm({
    defaultValues: staff || {
      name: ''
    }
  })

  const formValues = watch()
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (staff)
      //* update staff
      return await updateStaff(shopId || '', staffEmail || '', data)
        .then(console.log)
        .catch(console.error)

    //* create staff
    return await addStaff(shopId || '', data)
      .then(console.log)
      .catch(console.error)
  }
  const handleRemove = async () => {
    if (staff)
      return await removeStaff(shopId || '', staff?.email || '')
        .then(console.log)
        .catch(console.error)
  }

  const isOwner = !!user && userShop?.userId === user?.id

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

export default ShopStaffForm
