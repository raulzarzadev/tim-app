import useModal from '@/hooks/useModal'
import ChangeItem, { ChangeItemProps } from './ChangeItem2'
import Modal from './Modal'
import { ItemSelected } from '@/context/useCompanyCashbox'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { Box, IconButton, Typography } from '@mui/material'
import dictionary from '@/CONSTS/dictionary'
import AppIcon from './AppIcon'

export type ModalChangeItemProps = Pick<ChangeItemProps, 'handleChangeItem'> & {
  itemSelected?: ItemSelected
}

const ModalChangeItem = ({
  handleChangeItem,
  itemSelected
}: ModalChangeItemProps) => {
  const itemId = itemSelected?.itemId || ''
  const modalChangeItem = useModal({ title: 'Cambiar articulo' })
  const { currentCompany } = useUserCompaniesContext()
  const item = currentCompany?.articles?.find((i) => i.id === itemId)
  if (!item) return <Typography>No encontrado</Typography>
  return (
    <div>
      <div className="flex justify-center items-center ">
        <IconButton onClick={() => modalChangeItem.onOpen()} color="primary">
          <AppIcon icon="change" />
        </IconButton>
        <Box
          sx={{ border: '1px solid' }}
          className="ml-2 border border-gray-200 rounded-full shadow-md p-1 px-2 "
        >
          {item.rentStatus === 'taken' && '*'} {item.category} {item.name}{' '}
          {item.serialNumber}
        </Box>
        <Box
          sx={{
            border: '1px solid'
          }}
          className="rounded-full ml-2 border-gray-200 shadow-md p-1 px-2"
        >
          {itemSelected?.qty}x {dictionary(itemSelected?.unit || '')}
        </Box>
      </div>
      <Modal {...modalChangeItem}>
        <ChangeItem
          itemId={itemId}
          categoryName={item?.category}
          handleChangeItem={(newItem) => {
            handleChangeItem({ ...newItem, ...itemSelected })
          }}
        />
      </Modal>
    </div>
  )
}

export default ModalChangeItem
