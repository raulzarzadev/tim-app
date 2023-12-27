import { TextField, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Order } from '@/types/order'
import ClientInfo from '../ClientInfo'
import ShippingDetails from '../ShippingDetails'
import CheckoutItems from '../CheckoutItems'
import SelectCompanyItem from './SelectCompanyItem'
import asNumber from '@/lib/asNumber'
import { ArticleType } from '@/types/article'
import { useForm } from 'react-hook-form'
import PhoneInput from '../PhoneInput'
import AssignForm2 from '../AssignForm2'
import InputSearchClient from '../../../InputSearchClient'
import { Client } from '@/types/client'
import ModalConfirm from '../ModalConfirm'
import MyTable from '../MyTable'
import ModalItemDetails from '../ModalItemDetails'
import dictionary from '@/CONSTS/dictionary'
import CurrencySpan from '../CurrencySpan'

const OrderFormShort = ({
  handleSave,
  defaultOrder,
  shippingEnabled,
  companyId,
  shopClients
}: {
  defaultOrder?: Partial<Order>
  handleSave?: (order: Partial<Order>) => Promise<void> | void
  shippingEnabled?: boolean
  companyId: string
  shopClients: Partial<Client>[]
}) => {
  const {
    register,
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting }
  } = useForm({})
  const inputRef = useRef<HTMLInputElement>(null)
  const onSubmit = (data: any) => {
    console.log({ data })
    handleSave?.({
      companyId,
      client: {
        name: data?.client?.name,
        phone: data?.client?.phone,
        address: data?.client?.address,
        extraInfo: data?.client?.extraInfo,
        ...data.client
      },
      shipping: {
        assignedToEmail: data?.assignedToEmail || null,
        date: data?.date || null,
        address: data?.client?.address || null
      },
      items: data?.items || []
    })
  }
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const [itemsTotal, setItemsTotal] = useState(0)
  const formValues = watch()
  const itemsDisabled: ArticleType['id'][] = []
  const shippingAmount = asNumber(formValues?.shipping?.amount) || 0
  const orderPaymentsCharged =
    formValues?.payments?.reduce(
      (acc: number, { amount = 0, method = 'mxn', usdPrice = 1 }) => {
        if (method === 'usd') return acc + amount * usdPrice
        return acc + amount
      },
      0
    ) || 0
  const total = itemsTotal - orderPaymentsCharged + shippingAmount
  // console.log({ tems: formValues?.items })
  const saveLabel = isSubmitted
    ? 'Guardado'
    : isSubmitting
    ? 'Guardando...'
    : 'Guardar'

  return (
    <div>
      <form className="grid gap-3">
        <InputSearchClient
          onChange={(name) => setValue('client.name', name)}
          clients={shopClients}
          onChooseClient={(client) => {
            const clientChoose = shopClients?.find((c) => c.id === client.id)
            setValue('client', {
              name: clientChoose?.name || '',
              phone: clientChoose?.phone || '',
              address: clientChoose?.address || '',
              extraInfo: clientChoose?.extraInfo || ''
            })
          }}
        />
        <PhoneInput
          {...register('client.phone')}
          label="Teléfono"
          control={control}
        />
        <TextField
          {...register('client.address')}
          fullWidth
          label="Dirección"
          variant="outlined"
        />
        <TextField
          {...register('client.extraInfo')}
          fullWidth
          label="Comentarios"
          variant="outlined"
        />

        {shippingEnabled && (
          <AssignForm2
            handleAssign={(email, date) => {
              if (date) {
                setValue('date', date)
              }
              if (email) {
                setValue('assignedToEmail', email)
              }
            }}
            assignedTo={formValues?.assignedToEmail}
            assignedAt={formValues?.date}
          />
        )}
        <SelectCompanyItem
          multiple
          itemsDisabled={itemsDisabled}
          itemsSelected={
            formValues?.items?.map((i: { itemId: string }) => i.itemId || '') ||
            []
          }
          setItems={(items) => {
            setValue(
              'items',
              items.map((itemId) => ({ itemId }))
            )
          }}
        />
        {!!formValues?.items?.length && (
          <CheckoutItems
            shippingAmount={shippingAmount}
            itemsSelected={formValues?.items || []}
            setTotal={setItemsTotal}
            setItemsSelected={(itemsSelected) => {
              setValue('items', itemsSelected)
            }}
          />
        )}
        <div className="my-4">
          {!formValues?.items?.length && (
            <Typography variant="caption" color={'error'}>
              *Agregar articulos
            </Typography>
          )}
          {!formValues?.client?.name && (
            <Typography variant="caption" color={'error'}>
              *Nombre de cliente es necesario
            </Typography>
          )}

          <ModalConfirm
            fullWidth
            disabled={
              isSubmitting ||
              isSubmitted ||
              !formValues?.items?.length ||
              !formValues?.client?.name
            }
            openVariant="contained"
            label={saveLabel}
            acceptLabel={saveLabel}
            acceptIcon="save"
            openIcon="save"
            handleConfirm={handleSubmit(onSubmit)}
            disabledAccept={isSubmitting || isSubmitted}
          >
            <ClientInfo client={formValues?.client} />
            <ShippingDetails
              shipping={{
                assignedToEmail: formValues?.assignedToEmail || null,
                date: formValues?.date || null,
                address: formValues?.client?.address || null
              }}
            />
            {!!formValues?.items?.length && (
              <MyTable
                data={{
                  headers: [
                    {
                      label: 'Unidad',
                      key: 'itemId',
                      format: (value) => (
                        <ModalItemDetails
                          itemId={value}
                          // hiddenCurrentStatus
                          showCat
                        />
                      )
                    },
                    {
                      label: 'Tiempo',
                      key: 'duration'
                    },
                    {
                      label: 'Status',
                      key: 'rentStatus',
                      format: (value) => dictionary(value)
                    },
                    {
                      label: 'Total',
                      key: 'price',
                      format: (value) => <CurrencySpan quantity={value} />
                    }
                  ],
                  body: formValues?.items || []
                }}
              />
            )}
          </ModalConfirm>
        </div>
      </form>
    </div>
  )
}

export default OrderFormShort
