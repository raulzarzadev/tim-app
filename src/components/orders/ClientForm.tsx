import { Client } from '@/types/client'
import { Autocomplete, Box, Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import InputUploadFile from '../InputUploadFile'
import PreviewImage from '../PreviewImage'
import ModalSignature from '../ModalSignature'
import PhoneInput from '../PhoneInput'
import SearchClient from '../SearchClient'
import SaveButton from '../ButtonSave'
import { useEffect, useState } from 'react'
import { useUserShopContext } from '@/context/userShopContext'

const ClientForm = ({
  client,
  setClient,
  searchClient = true,
  labelSave = 'Guardar',
  isClientOrder,
  canClearForm
}: {
  client?: Partial<Client>
  setClient?: (client?: Partial<Client>) => void | Promise<any>
  searchClient?: boolean
  labelSave?: string
  isClientOrder?: boolean
  canClearForm?: boolean
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { isSubmitting, isDirty }
  } = useForm({
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
  const { userShop } = useUserShopContext()

  const disabledSave = isSubmitting || !isDirty
  const formValues = watch()
  const onSubmit = async (data?: Partial<Client>) => {
    try {
      const res = await setClient?.(data)
      setValue('id', res?.res?.id)
      reset(data)
      return res
    } catch (e) {
      console.error(e)
    }
  }

  const handleClear = async () => {
    reset()
    await setClient?.({})
  }

  const [clients, setClients] = useState<Partial<Client>[]>([])

  useEffect(() => {
    const companyClients = userShop?.clients || []
    const clientsFound =
      companyClients?.filter(
        (c) =>
          c.name
            ?.toLowerCase()
            .includes(formValues.name?.toLowerCase() || '') ||
          c.phone?.toLowerCase().includes(formValues.phone?.toLowerCase() || '')
      ) || []
    setClients(clientsFound)
  }, [formValues.name, formValues.phone, userShop?.clients])

  const handleSelectClient = (client: Partial<Client>) => {
    // setClient?.(e) //* this line close the client form modal automatically
    setValue('id', client.id, {
      shouldDirty: true,
      shouldTouch: true
    })
    setValue('name', client.name, {
      shouldDirty: true,
      shouldTouch: true
    })
    setValue('phone', client.phone, {
      shouldDirty: true,
      shouldTouch: true
    })
    setValue('email', client.email, {
      shouldDirty: true,
      shouldTouch: true
    })
    setValue('address', client.address, {
      shouldDirty: true,
      shouldTouch: true
    })
    setValue('imageID', client.imageID, {
      shouldDirty: true,
      shouldTouch: true
    })
    setValue('signature', client.signature, {
      shouldDirty: true,
      shouldTouch: true
    })
    setValue('extraInfo', client.extraInfo || '', {
      shouldDirty: true,
      shouldTouch: true
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        <div className="flex">
          {searchClient ? (
            <Autocomplete
              freeSolo
              className="w-full"
              disablePortal
              id="combo-box-demo"
              isOptionEqualToValue={(a, b) => a.id === b.id}
              options={clients.map((c) => ({
                label: c.name,
                id: c.id
              }))}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Nombre" {...register('name')} />
              )}
              inputValue={formValues.name || ''}
              value={{ id: formValues.id || '', label: formValues.name || '' }}
              renderOption={(props, option) => {
                return (
                  <li
                    {...props}
                    key={option.id}
                    onClick={() => {
                      const client = clients.find((c) => c.id === option.id)
                      if (client) {
                        handleSelectClient(client)
                      } else {
                        console.log('no client found')
                      }
                    }}
                  >
                    {option.label}
                  </li>
                )
              }}
            />
          ) : (
            <TextField
              {...register('name')}
              label="Nombre"
              required
              fullWidth
            />
          )}

          {searchClient && (
            <div>
              <SearchClient
                onSelectClient={(client) => {
                  handleSelectClient(client)
                }}
              />
            </div>
          )}
        </div>
        <TextField
          InputLabelProps={{ shrink: !!formValues.email }}
          {...register('email')}
          label="Email"
        />
        <PhoneInput {...register('phone')} label="Teléfono" control={control} />
        <TextField
          InputLabelProps={{ shrink: !!formValues.address }}
          {...register('address')}
          label="Dirección"
        />
        <TextField
          InputLabelProps={{ shrink: !!formValues.extraInfo }}
          {...register('extraInfo')}
          placeholder="Instrucciones de entrega o referencias del domicilo"
        />

        {/* Identificación */}
        <InputUploadFile
          label="Identificación"
          setURL={(url) => setValue('imageID', url, { shouldDirty: true })}
        />
        {formValues?.imageID && (
          <PreviewImage
            src={formValues?.imageID || ''}
            alt="Identificación de usuario"
          />
        )}
        {/*
         Firma */}
        <ModalSignature
          setSignature={(signature) =>
            setValue('signature', signature || '', { shouldDirty: true })
          }
        />
        {formValues?.signature && (
          <PreviewImage
            src={formValues?.signature || ''}
            alt="Firma de usuario"
          />
        )}
        <Box className="flex justify-evenly my-6">
          {canClearForm && <Button onClick={handleClear}>Limpiar</Button>}
          <SaveButton
            test-id="save-client"
            disabled={disabledSave}
            type="submit"
            label={!!formValues?.id && !isClientOrder ? 'Editar' : labelSave}
          />
        </Box>
      </form>
    </div>
  )
}

export default ClientForm
