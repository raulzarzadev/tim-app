import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  IconButton,
  Typography
} from '@mui/material'
import ModalArticles from './ModalArticles'
import AppIcon from './AppIcon'
import Modal from './Modal'
import CategoryDetails from './CategoryDetails'
import useModal from '@/hooks/useModal'
import useCashboxContext from '@/context/useCompanyCashbox'

const Category = ({ categoryName }: { categoryName: string }) => {
  const { addItem, removeItem, itemsSelected, setItemsSelected } =
    useCashboxContext()

  const {
    currentCompany,
    ordersItems: { inUse }
  } = useUserCompaniesContext()

  const categoryItems =
    currentCompany?.articles?.filter((a) => a.category === categoryName) || []

  const category = currentCompany?.categories?.find(
    (c) => c.name === categoryName
  )

  // const itemsInUse =
  //   categoryItems?.filter(({ id }) => !inUse?.find((i) => i.itemId === id)) ||
  //   []

  const itemsInUse = Array.from(
    new Set([...(itemsSelected || []), ...inUse].map((i) => i.itemId))
  )

  const categoryItemsSelected =
    categoryItems.filter(
      (item) => !!itemsSelected?.find(({ itemId }) => itemId === item.id)
    ) || []

  const itemsLeft = categoryItems.filter(
    (item) => !itemsInUse?.find((itemId) => itemId === item.id)
  )

  const price = category?.prices?.[0]
  const modal = useModal({ title: category?.name })
  const handleRemoveItem = () => {
    removeItem?.(categoryItemsSelected[0].id)
  }
  const handleAddItem = () => {
    const newItem = itemsLeft[Math.floor(Math.random() * itemsLeft.length)]
    addItem?.({
      //* should be as taken and in use by default, if change ""entregar ahora" to false change it
      inUse: true,
      rentStatus: 'taken',
      itemId: newItem.id,
      unit: newItem.prices?.[0].unit,
      qty: 1
    })
  }

  return (
    <Card className="flex flex-col justify-between h-full">
      <Box className="flex w-full justify-between items-center relative">
        <Box className="flex items-center ">
          <Typography>Disponibles: {itemsLeft.length}</Typography>
          <ModalArticles articles={categoryItems} />
        </Box>
        <Box className="flex items-center ">
          <IconButton
            onClick={(e) => {
              e.preventDefault()
              modal.onOpen()
            }}
          >
            <AppIcon icon="info" fontSize="small" />
          </IconButton>
          <Modal {...modal}>
            <CategoryDetails category={category} />
          </Modal>
        </Box>
      </Box>
      <CardContent>
        <Typography
          sx={{ fontSize: 20 }}
          color="text.secondary"
          gutterBottom
          className="truncate"
        >
          <span className="font-bold text-2xl ">
            {categoryItemsSelected?.length}x{' '}
          </span>
          {category?.name}
        </Typography>

        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
          className="text-center"
        >
          {price ? `${price?.quantity} ${price?.unit} $${price?.price}` : ''}
        </Typography>
      </CardContent>
      <Box>
        <ButtonGroup variant="text" aria-label="text button group" fullWidth>
          <Button
            onClick={() => {
              handleRemoveItem()
            }}
            disabled={categoryItemsSelected?.length <= 0}
          >
            <AppIcon icon="substr" />
          </Button>
          <Button
            onClick={() => {
              handleAddItem()
            }}
            disabled={itemsLeft.length <= 0}
          >
            <AppIcon icon="add" />
          </Button>
        </ButtonGroup>
      </Box>
    </Card>
  )
}

export default Category
