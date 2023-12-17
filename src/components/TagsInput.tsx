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
  // { title: 'Herramientas', rating: 4.7 },
  // { title: 'Electrodomésticos', rating: 3.8 },
  // { title: 'Arte y manualidades', rating: 3.1 },
  // { title: 'Equipo de camping', rating: 2.9 },
  // { title: 'Películas y series', rating: 4.9 },
  // { title: 'Ropa deportiva', rating: 3.5 },
  // { title: 'Accesorios para mascotas', rating: 4.3 },
  // { title: 'Instrumentos científicos', rating: 3.7 },
  // { title: 'Joyas y relojes', rating: 2.8 },
  // { title: 'Decoración del hogar', rating: 4.6 },
  // { title: 'Equipos de sonido', rating: 3.4 },
  // { title: 'Videojuegos', rating: 4.8 },
  // { title: 'Cosméticos', rating: 3.3 },
  // { title: 'Equipos de ejercicio', rating: 2.6 },
  // { title: 'Artículos para bebés', rating: 4.7 },
  // { title: 'Instrumentos de cocina', rating: 3.9 },
  // { title: 'Dispositivos móviles', rating: 4.9 },
  // { title: 'Artículos de jardinería', rating: 3.6 },
  // { title: 'Equipos de fotografía', rating: 2.9 },
  // { title: 'Coleccionables', rating: 4.5 },
  // { title: 'Artículos de oficina', rating: 3.8 }
]
