import * as React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { IconName } from './AppIcon'

export default function TagsInput({
  value,
  limitTags = 2,
  setTags
}: {
  value?: ItemTagType[]
  setTags?: (tags: ItemTagType[]) => void
  limitTags?: number
}) {
  const [itemTags, setItemTags] = React.useState<ItemTagType[]>([])
  return (
    <Autocomplete
      value={value}
      getOptionDisabled={(option) =>
        itemTags.includes(option) || itemTags.length >= limitTags
      }
      multiple
      options={categories}
      getOptionLabel={(option) => option?.title}
      isOptionEqualToValue={(option, value) => option?.title === value?.title}
      onChange={(e, newValue) => {
        setItemTags(newValue)
        setTags?.(newValue)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Etiquetas"
          placeholder="Buscar"
          helperText={`Max. ${limitTags} etiquetas`}
          disabled
        />
      )}
      fullWidth
    />
  )
}

export type ItemTagType = {
  title: string
  icon?: IconName
}

const categories: ItemTagType[] = [
  { title: 'Electrónica', icon: 'eye' },
  { title: 'Bicis', icon: 'eye' },
  { title: 'Deportes', icon: 'eye' },
  { title: 'Ropa', icon: 'eye' },
  { title: 'Juguetes', icon: 'eye' },
  { title: 'Autos', icon: 'eye' },
  { title: 'Muebles', icon: 'eye' },
  { title: 'Instrumentos musicales', icon: 'eye' },
  { title: 'Libros', icon: 'eye' },
  { title: 'Herramientas', icon: 'eye' },
  { title: 'Hogar', icon: 'eye' }
]
