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
    ordersItems: { inUse },
    currentCompany
  } = useUserCompaniesContext()

  const items = currentCompany?.articles
  const item = items?.find((i) => i?.id === itemId)

  const modal = useModal({
    title: `Detalles de ${item?.category} - ${item?.serialNumber || item?.name}`
  })

  const itemInUse = inUse?.find((i) => i?.itemId === itemId)

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
        {itemInUse && (
          <span className="bg-green-400 rounded-full p-1 py-0.5">En uso</span>
        )}
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
