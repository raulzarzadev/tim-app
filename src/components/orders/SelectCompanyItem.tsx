import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import Select from '../Select'
import { useState } from 'react'
import { Chip, Stack } from '@mui/material'
import { ArticleType } from '@/types/article'
import ArticleDetails from '../ArticleDetails'
import ButtonSave from '../ButtonSave'
import ButtonClear from '../ButtonClear'
import { useUserShopContext } from '@/context/userShopContext'

export type SelectItemsProps = {
  itemsDisabled?: string[]
  showItemDetails?: boolean
} & (
  | {
      multiple?: false
      itemSelected?: string
      setItem?: (itemId: string) => void
    }
  | {
      multiple?: true
      itemsSelected?: string[]
      setItems?: (items: string[]) => void
    }
)

const SelectCompanyItem = ({
  // itemsDisabled,
  multiple = false,
  showItemDetails,
  // FIXME: multiple conditional typing
  //@ts-ignore
  itemsSelected,
  //@ts-ignore
  itemSelected,
  //@ts-ignore
  setItems,
  //@ts-ignore
  setItem
}: // itemsDisabled,
// companyItems,
// companyCategories
SelectItemsProps) => {
  const {
    userShop: currentCompany
    //ordersItems: { inUse: itemsTaken }
  } = useUserShopContext()
  const companyItems = currentCompany?.items

  const itemsTaken =
    companyItems?.filter(
      (i) => i.rentStatus === 'taken' || i.rentStatus === 'expired'
    ) || []

  const itemsDisabled = itemsTaken.map((i) => i.id)
  const companyCategories = currentCompany?.categories

  const categories: { label?: string; value?: string }[] =
    companyCategories?.map((cat) => ({
      label: cat.name,
      value: cat.name
    })) || []

  const [_categoryName, _setCategoryName] = useState('')
  const [_items, _setItems] = useState<Partial<ArticleType>[]>([])
  // const [_selected, _setSelected] = useState('')
  const [itemDetails, setItemDetails] = useState<Partial<ArticleType>>()
  const handleSelectCat = (cat: string) => {
    _setCategoryName(cat)
    const catItems = companyItems?.filter((i) => i.category === cat) || []
    _setItems(catItems)
  }
  const [_itemsSelected, _setItemsSelected] = useState<string[]>(
    itemsSelected || []
  )
  const [_itemSelected, _setItemSelected] = useState(itemSelected || '')

  const handleClickItem = (itemId?: ArticleType['id']) => {
    showItemDetails && setItemDetails(_items?.find((i) => i.id === itemId))
    if (multiple) {
      //* multiple selected
      _itemsSelected?.includes(itemId || '')
        ? _setItemsSelected(_itemsSelected.filter((i) => i !== itemId))
        : _setItemsSelected([...(_itemsSelected || []), itemId || ''])
    } else {
      //* single selected
      _setItemSelected(itemId)
    }
  }

  const handleSetItems = () => {
    if (multiple) {
      setItems?.(_itemsSelected)
    } else {
      setItem?.(_itemSelected)
    }
  }

  const isSelected = (itemId?: string) =>
    _itemsSelected.includes(itemId || '') || _itemSelected === itemId
  const handleClear = () => {
    _setItemsSelected([])
    _setItemSelected('')
    setItems?.([])
    setItem?.('')
    setItemDetails(undefined)
  }
  return (
    <div className="grid gap-4">
      <div>
        Unidades agregadas
        <Stack direction="row" flexWrap={'wrap'} className="justify-center ">
          {_itemsSelected
            .map((i) => companyItems?.find((item) => item.id === i))
            ?.map((item) => (
              <Chip
                test-id={`selected-item-chip-${item?.id}`}
                disabled={
                  !!itemsDisabled?.find?.((itemId) => itemId === item?.id)
                }
                color={isSelected(item?.id) ? 'primary' : 'default'}
                className="p-1 m-1"
                key={item?.id}
                label={`${item?.category}-${item?.serialNumber || item?.name}`}
                onClick={(e) => handleClickItem(item?.id)}
              />
            ))}
        </Stack>
      </div>
      <Select
        test-id="select-category"
        options={categories}
        onSelect={handleSelectCat}
        selected={_categoryName}
        label="Categorias"
        fullWidth
        variant="outlined"
      />
      <Stack direction="row" flexWrap={'wrap'} className="justify-center ">
        {_items?.map((item) => (
          <Chip
            test-id={`item-chip-${item.id}`}
            disabled={!!itemsDisabled?.find?.((itemId) => itemId === item.id)}
            color={isSelected(item.id) ? 'primary' : 'default'}
            className="p-1 m-1"
            key={item.id}
            label={item.serialNumber || item.name}
            onClick={(e) => handleClickItem(item.id)}
          />
        ))}
      </Stack>
      <div>
        {itemDetails && <ArticleDetails article={itemDetails as ArticleType} />}
      </div>

      <div className="flex justify-evenly w-full">
        <ButtonClear
          onClick={() => {
            handleClear()
          }}
        />
        <ButtonSave test-id="save-selected-items" onClick={handleSetItems} />
      </div>
    </div>
  )
}

export default SelectCompanyItem
