'use client'
import { Box, Button, Skeleton, TextField, Typography } from '@mui/material'
import PhoneInput from './PhoneInput'
import { useForm } from 'react-hook-form'
import RadioGroup from './RadioGroup'
import { createShop } from '@/firebase/companies'
import { CompanyType } from '@/types/company'
import AppIcon from './AppIcon'
import { ContactsList } from './ModalContactClient'
import { ArticleType } from '@/types/article'
import ArticleFormShort from './ArticleFormShort'
import { createItem } from '@/firebase/items'
import ItemsTable from './ItemsTable'
import Link from 'next/link'
import { useUserShopContext } from '@/context/userShopContext'
import Modal from './Modal'
import useModal from '@/hooks/useModal'

const EasyStart = () => {
  const { userShop } = useUserShopContext()
  if (userShop === undefined) return <EasyStartEskeleton />
  return (
    <div className="grid gap-4 p-1">
      {userShop === null && <CreateShop />}
      {!!userShop && <UserShopCreated />}

      {!!userShop?.items?.length && (
        <>
          <Typography className="text-center items-center flex justify-center">
            <AppIcon icon="check" color="success" className="mr-2" />
            2. Ya tienes un articulo en renta
          </Typography>
          <ItemsTable
            items={userShop?.items || []}
            columns={['name', 'category', 'rentStatus', 'storeVisible']}
          ></ItemsTable>
        </>
      )}
      {userShop && !userShop?.items?.length && <CreateItemEasy />}
      <Typography variant="h6" className="text-center"></Typography>
      <Typography className="text-center items-center flex justify-center">
        {!!userShop?.items?.length && (
          <AppIcon icon="check" color="success" className="mr-2" />
        )}
        3. Listo, solo espera por clientes
      </Typography>
      {!!userShop?.items?.length && (
        <div className="text-center ">
          <Typography className=" my-4 ">Mientras puedes</Typography>
          <Typography>1. Buscar articulos en renta</Typography>
          <Typography>2. Adiminstrar tu tienda</Typography>
          <div className="flex justify-evenly w-full mt-4">
            <Button
              LinkComponent={Link}
              href="/market"
              className=""
              variant="contained"
            >
              Buscar
            </Button>
            <Button
              LinkComponent={Link}
              href="/my-shop"
              className=""
              variant="contained"
            >
              Administrar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

const ItemsAlreadyInRent = () => {
  return
}

const CreateItemEasy = () => {
  const { userShop } = useUserShopContext()
  const onSaveArticle = async (data: Partial<ArticleType>) => {
    data.companyId = userShop?.id
    data.storeVisible = true
    createItem(data).then(console.log).catch(console.error)
  }
  return (
    <div>
      <Typography variant="h5" className="text-center">
        2. Crea un artículo para rentar
      </Typography>
      <ArticleFormShort onSaveArticle={onSaveArticle} />
    </div>
  )
}

const CreateShop = () => {
  const onCreateShop = async (data: Partial<ShortShop>) => {
    await createShop({
      name: data.name || '',
      principalContact: data.principalContact || '',
      phone: data.phone || '',
      address: data.address || '',
      email: data.email || ''
    })
      .then(console.log)
      .catch(console.error)
  }
  return <ShopShortForm onSaveShop={onCreateShop} />
}

const UserShopCreated = () => {
  const { userShop } = useUserShopContext()
  return (
    <div>
      <Typography className="text-center items-center flex justify-center">
        <AppIcon icon="check" color="success" className="mr-2" />
        1. Tienda creada
      </Typography>
      <Typography className="text-center font-bold " variant="h6">
        {userShop?.name}
      </Typography>
      <Typography className="text-center">
        <ContactsList phone={userShop?.phone} />
      </Typography>
    </div>
  )
}

type ShortShop = Pick<
  CompanyType,
  'name' | 'phone' | 'principalContact' | 'address' | 'email'
> & {}
const ShopShortForm = ({
  onSaveShop
}: {
  onSaveShop?: (shop: Partial<ShortShop>) => Promise<any> | void
}) => {
  const { control, register, watch, setValue, handleSubmit } =
    useForm<Partial<ShortShop>>()
  // const [contact, setContact] = useState('whatsapp')
  const onSubmit = async (data: Partial<ShortShop>) => {
    return await onSaveShop?.(data)?.then(console.log).catch(console.error)
  }
  const values = watch()
  const modal = useModal({ title: 'Crea tu tienda' })
  return (
    <div>
      <div className="grid gap-3">
        <Typography variant="h6" className="text-center">
          1. Primero crea una tienda{' '}
        </Typography>
        <div className="text-center mb-4">
          <Typography variant="caption" className="">
            Solo necesitas un nombre y un metodo de contacto
          </Typography>
        </div>
        <Button variant="contained" onClick={modal.onOpen}>
          Crear tienda
        </Button>
      </div>
      <Modal {...modal}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
          <TextField fullWidth {...register('name')} label="Nombra tu tienda" />
          <RadioGroup
            label="Metodo de contacto"
            options={[
              {
                label: 'WhatsApp',
                value: 'whatsapp'
              },
              {
                label: 'Dirección',
                value: 'address'
              }
            ]}
            value={values?.principalContact}
            setValue={(value) => {
              setValue('principalContact', value)
              //setContact(value)
            }}
          />
          {values?.principalContact === 'whatsapp' && (
            <PhoneInput
              {...register('phone')}
              label="Telefono de contacto"
              control={control}
            />
          )}
          {values?.principalContact === 'address' && (
            <TextField fullWidth {...register('address')} label="Dirección" />
          )}
          <Button variant="contained" fullWidth type="submit">
            Guardar
          </Button>
        </form>
      </Modal>
    </div>
  )
}

const EasyStartEskeleton = () => {
  return (
    <Box>
      <Skeleton
        variant="text"
        height={50}
        width={'50%'}
        className="mt-auto my-4"
      />
      <Skeleton variant="rounded" height={50} width={'100%'} />
    </Box>
  )
}

export default EasyStart
