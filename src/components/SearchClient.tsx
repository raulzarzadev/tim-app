import { IconButton } from '@mui/material'
import AppIcon from './AppIcon'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import MyTable from './MyTable'
import { Client } from '@/types/client'
import { useUserShopContext } from '@/context/userShopContext'

const SearchClient = ({
  onSelectClient
}: {
  onSelectClient?: (client: Partial<Client>) => void
}) => {
  const modal = useModal({ title: 'Buscar cliente' })
  const { userShop } = useUserShopContext()
  const clients = userShop?.clients || []
  const handleSelect = (clientId: string) => {
    const client = clients?.find((c) => c?.id === clientId)
    onSelectClient?.({
      id: client?.id,
      name: client?.name || '',
      phone: client?.phone || '',
      email: client?.email || '',
      address: client?.address || '',
      imageID: client?.imageID || '',
      signature: client?.signature || ''
    })
    modal.onClose()
  }
  return (
    <div>
      <IconButton color="primary" onClick={modal.onOpen}>
        <AppIcon icon="search" />
      </IconButton>
      <Modal {...modal}>
        <MyTable
          search
          onRowClick={handleSelect}
          data={{
            headers: [
              { label: 'Nombre', key: 'name' },
              { label: 'Telefono', key: 'phone' },
              { label: 'Dirección', key: 'address' }
            ],
            body: clients || []
          }}
        />
      </Modal>
    </div>
  )
}

export default SearchClient
