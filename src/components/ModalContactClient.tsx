import { IconButton, Tooltip, Typography } from '@mui/material'
import AppIcon, { IconName } from './AppIcon'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import Link from 'next/link'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Order } from '@/types/order'

const ModalContactClient = ({ client }: { client: Order['client'] }) => {
  const modal = useModal({ title: 'Contactar cliente' })
  // const methods: Record<
  //   string,
  //   { label: string; icon: IconName; href: string; value?: string }
  // > = {
  //   mail: {
  //     label: 'Email',
  //     icon: 'mail',
  //     href: `mailto:`,
  //     value: client?.email
  //   },
  //   phone: {
  //     label: 'Teléfono',
  //     icon: 'phone',
  //     href: 'tel:',
  //     value: client?.phone?.replaceAll('+', '').replaceAll(' ', '')
  //   },
  //   whatsapp: {
  //     label: 'Whatsapp',
  //     icon: 'whatsapp',
  //     href: 'https://wa.me/',
  //     value: client?.phone?.replaceAll('+', '').replaceAll(' ', '')
  //   },
  //   address: {
  //     label: 'Dirección',
  //     icon: 'location',
  //     href: 'https://maps.google.com/?q=',
  //     value: client?.address
  //   }
  // }
  // const entries = Object.entries(methods)
  // const withValidValue = entries.filter(([key, value]) => value.value)
  return (
    <>
      <div className="flex items-center ">
        <Typography
          className="whitespace-nowrap"
          component={'label'}
          data-testid="contact-client"
        >
          Datos de contacto
          <IconButton
            onClick={(e) => {
              modal.onOpen()
            }}
          >
            <AppIcon icon="phone" />
          </IconButton>
        </Typography>
      </div>
      <Modal {...modal}>
        <ContactsList
          address={client?.address}
          email={client?.email}
          phone={client?.phone}
        />
        {/* <Grid2 container spacing={2} justifyContent={'center'}>
          {withValidValue.length === 0 && (
            <Grid2 xs={'auto'}>
              <Typography>Sin datos de contacto</Typography>
            </Grid2>
          )}
          {entries.map(
            ([key, value]) =>
              value?.value && (
                <Grid2 key={key} xs={'auto'}>
                  <Tooltip title={value.label} data-testid={`tooltip-${key}`}>
                    <IconButton
                      onClick={(e) => {}}
                      LinkComponent={Link}
                      href={`${value.href}${value.value}`}
                      target="_blank"
                    >
                      <AppIcon icon={value.icon} fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </Grid2>
              )
          )}
        </Grid2> */}
      </Modal>
    </>
  )
}

export const ContactsList = ({
  email,
  phone,
  address
}: {
  email?: string
  phone?: string
  address?: string
}) => {
  const methods: Record<
    string,
    {
      label: string
      icon: IconName
      href: string
      value?: string
      color?:
        | 'info'
        | 'primary'
        | 'success'
        | 'default'
        | 'inherit'
        | 'secondary'
        | 'error'
        | 'warning'
    }
  > = {
    mail: {
      label: 'Email',
      icon: 'mail',
      href: `mailto:`,
      value: email,
      color: 'primary'
    },
    phone: {
      label: 'Teléfono',
      icon: 'phone',
      href: 'tel:',
      value: phone?.replaceAll('+', '').replaceAll(' ', ''),
      color: 'primary'
    },
    whatsapp: {
      label: 'Whatsapp',
      icon: 'whatsapp',
      href: 'https://wa.me/',
      value: phone?.replaceAll('+', '').replaceAll(' ', ''),
      color: 'success'
    },
    address: {
      label: 'Dirección',
      icon: 'location',
      href: 'https://maps.google.com/?q=',
      value: address,
      color: 'info'
    }
  }
  const entries = Object.entries(methods)
  const withValidValue = entries.filter(([key, value]) => value.value)
  return (
    <>
      <Grid2 container spacing={2} justifyContent={'center'}>
        {withValidValue.length === 0 && (
          <Grid2 xs={'auto'}>
            <Typography>Sin datos de contacto</Typography>
          </Grid2>
        )}
        {entries.map(
          ([key, value]) =>
            value?.value && (
              <Grid2 key={key} xs={'auto'}>
                <Tooltip title={value.label} data-testid={`tooltip-${key}`}>
                  <IconButton
                    color={value.color || 'default'}
                    onClick={(e) => {}}
                    LinkComponent={Link}
                    href={`${value.href}${value.value}`}
                    target="_blank"
                  >
                    <AppIcon icon={value.icon} fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Grid2>
            )
        )}
      </Grid2>
    </>
  )
}

export default ModalContactClient
