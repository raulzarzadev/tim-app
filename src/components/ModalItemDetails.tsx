import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import ArticleDetails from './ArticleDetails'
import { Typography } from '@mui/material'

const ModalItemDetails = ({
  itemId,
  showCat
}: {
  itemId: string
  showCat?: boolean
}) => {
  const {
    ordersItems: { all: items }
  } = useUserCompaniesContext()
  const item = items?.find((i) => i?.itemId === itemId)
  const modal = useModal({
    title: `Detalles de ${item?.category} - ${item?.serialNumber || item?.name}`
  })
  if (!itemId) return <Typography>No item</Typography>
  if (!item) return <Typography>No encontrado</Typography>
  return (
    <span>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          modal.onOpen()
        }}
      >
        {showCat && `${item?.category}-`}
        {item?.serialNumber}
        <span className="font-thin text-gray-800 text-xs">{item?.name}</span>
      </button>
      <Modal {...modal}>
        {item ? (
          <ArticleDetails article={item} />
        ) : (
          <div>No encontramos información de este articulo</div>
        )}
      </Modal>
    </span>
  )
}

export default ModalItemDetails
