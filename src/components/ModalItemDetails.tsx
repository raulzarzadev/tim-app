import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import ArticleDetails from './ArticleDetails'
import { Typography } from '@mui/material'
import ItemCurrentStatus from './ItemCurrentStatus'

const ModalItemDetails = ({
  itemId,
  showCat,
  hiddenCurrentStatus
}: {
  itemId: string
  showCat?: boolean
  hiddenCurrentStatus?: boolean
}) => {
  const { currentCompany } = useUserCompaniesContext()

  const items = currentCompany?.articles
  const item = items?.find((i) => i?.id === itemId)

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
        <span className="font-thin text-gray-800 text-xs">{item?.name} </span>
        {!hiddenCurrentStatus && <ItemCurrentStatus itemId={itemId} />}
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
