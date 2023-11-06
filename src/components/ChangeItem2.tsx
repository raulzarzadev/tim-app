import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { useEffect, useState } from 'react'
import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import { ArticleType } from '@/types/article'
import Select from './Select'
import ErrorBoundary from './ErrorBoundary'
import { ItemSelected } from '@/context/useCompanyCashbox'

export type ChangeItemProps = {
  itemId: string
  handleChangeItem: (newItem: ItemSelected) => void
  categoryName?: string
}
const ChangeItem = ({
  itemId,
  handleChangeItem,
  categoryName
}: ChangeItemProps) => {
  const {
    currentCompany,
    ordersItems: { inUse: itemsInUse }
  } = useUserCompaniesContext()
  const [_categoryName, _setCategoryName] = useState(categoryName)
  const [_categoryItems, _setCategoryItems] = useState<ArticleType[]>([])
  const [_selected, _setSelected] = useState(itemId)
  useEffect(() => {
    const items = currentCompany?.articles?.filter(
      (i) => i.category === _categoryName
    )
    _setCategoryItems(items || [])
  }, [_categoryName, currentCompany?.articles])

  const item = currentCompany?.articles?.find((i) => i.id === itemId)

  const categories =
    currentCompany?.categories?.map((category) => ({
      label: category.name,
      value: category.name
    })) || []

  const [changed, setChanged] = useState(false)

  const handleChange = () => {}
  const disabled = changed
  return (
    <ErrorBoundary>
      <Box>
        <Typography className="my-4 text-center ">
          Articulo:{' '}
          <span className="font-bold">
            {item?.category} - {item?.serialNumber || item?.name}
          </span>
        </Typography>
        {/* <Select
          options={categories}
          onSelect={(_categoryName) => _setCategoryName(_categoryName)}
          selected={_categoryName}
          label="Categorias"
          fullWidth
          variant="outlined"
        /> */}
        <div className="mt-8" />
        <Stack direction="row" flexWrap={'wrap'} className="justify-center ">
          {_categoryItems?.map((item) => (
            <Chip
              disabled={!!itemsInUse?.find(({ itemId }) => itemId === item.id)}
              color={_selected === item.id ? 'primary' : 'default'}
              className="p-1 m-1"
              key={item.id}
              label={item.serialNumber || item.name}
              onClick={() => {
                setChanged(true)
                if (item.id !== itemId) setChanged(false)
                _setSelected(item.id)
              }}
            />
          ))}
        </Stack>
      </Box>
      <div className="flex justify-center mt-6">
        <Button
          disabled={disabled}
          variant="contained"
          onClick={() => handleChangeItem({ itemId: _selected })}
        >
          Cambiar
        </Button>
      </div>
    </ErrorBoundary>
  )
}

export default ChangeItem
