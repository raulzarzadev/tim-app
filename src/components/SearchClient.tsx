import { IconButton, TextField, Typography } from '@mui/material'
import AppIcon from './AppIcon'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import MyTable from './MyTable'
import { useEffect, useState } from 'react'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { listenCompanyClients } from '@/firebase/clients'
import { Client } from '@/types/client'

const SearchClient = ({
  onSelectClient
}: {
  onSelectClient?: (client: Partial<Client>) => void
}) => {
  const modal = useModal({ title: 'Buscar cliente' })
  const { currentCompany } = useUserCompaniesContext()
  const [clients, setClients] = useState<Partial<Client[]>>([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    listenCompanyClients(currentCompany?.id || '', setClients)
  }, [currentCompany?.id])
  const filteredClients = clients.filter((c) =>
    c?.name.toLowerCase().includes(search.toLowerCase())
  )
  const handleSelect = (clientId: string) => {
    const client = clients.find((c) => c?.id === clientId)
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
        <Typography>Buscar cliente</Typography>
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          label="Nombre de cliente"
          fullWidth
        />
        <MyTable
          onRowClick={handleSelect}
          data={{
            headers: [{ label: 'Nombre', key: 'name' }],
            body: filteredClients || []
          }}
        />
      </Modal>
    </div>
  )
}

export default SearchClient
