import SearchClient from '@/components/SearchClient'
import { Client } from '@/types/client'
import { Autocomplete, TextField } from '@mui/material'
import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

const InputSearchClient = ({
  clients,
  onChooseClient,
  onChange
}: {
  clients: Partial<Client>[]
  onChooseClient: (client: Partial<Client>) => void
  onChange?: (name: string) => void
}) => {
  const [chooseClient, setChooseClient] = useState<Partial<Client> | null>()
  const [name, setName] = useState(chooseClient?.name || '')
  const handleChooseClient = (client: Partial<Client>) => {
    const { id, name } = client
    setName(name || '')
    setChooseClient({ id, name })
    onChooseClient({ id, name })
  }
  return (
    <div>
      <div className="flex">
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
            <TextField
              {...params}
              label="Nombre"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                onChange?.(e.target.value)
              }}
            />
          )}
          inputValue={name || ''}
          // value={{ id: '', label: '' }}
          //value={{ id: _client?.id || '', label: _client?.name || '' }}
          renderOption={(props, option) => {
            return (
              <li
                {...props}
                key={option.id}
                onClick={() => {
                  const client = clients.find((c) => c.id === option.id)
                  if (client) {
                    handleChooseClient(client)
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

        <div>
          <SearchClient
            onSelectClient={(client) => {
              handleChooseClient(client)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default InputSearchClient
