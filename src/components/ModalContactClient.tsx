import { IconButton, Tooltip } from '@mui/material'
import AppIcon, { IconName } from './AppIcon'
import { Payment } from '@/types/payment'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import Link from 'next/link'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

const ModalContactClient = ({ client }: { client: Payment['client'] }) => {
  const modal = useModal({ title: 'Contactar cliente' })
  const methods: Record<
    string,
    { label: string; icon: IconName; href: string; value?: string }
  > = {
    mail: {
      label: 'Email',
      icon: 'mail',
      href: `mailto:`,
      value: client?.email
    },
    phone: {
      label: 'Teléfono',
      icon: 'phone',
      href: 'tel:',
      value: client?.phone?.replaceAll('+', '').replaceAll(' ', '')
    },
    whatsapp: {
      label: 'Whatsapp',
      icon: 'whatsapp',
      href: 'https://wa.me/',
      value: client?.phone?.replaceAll('+', '').replaceAll(' ', '')
    },
    address: {
      label: 'Dirección',
      icon: 'location',
      href: 'https://maps.google.com/?q=',
      value: client?.address
    }
  }
  return (
    <>
      <IconButton
        onClick={(e) => {
          modal.onOpen()
        }}
      >
        <AppIcon icon="phone" />
      </IconButton>
      <Modal {...modal}>
        <Grid2 container spacing={2} justifyContent={'center'}>
          {Object.entries(methods).map(
            ([key, value]) =>
              value?.value && (
                <Grid2 key={key} xs={'auto'}>
                  <Tooltip title={value.label}>
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
        </Grid2>
      </Modal>
    </>
  )
}

export default ModalContactClient
