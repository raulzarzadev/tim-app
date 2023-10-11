import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import Modal from './Modal'
import { Typography } from '@mui/material'
import useModal from '@/hooks/useModal'
import ArticleDetails from './ArticleDetails'

const ModalItemDetails = ({ itemId }: { itemId: string }) => {
  const {
    ordersItems: { all: items }
  } = useUserCompaniesContext()
  const item = items?.find((i) => i.itemId === itemId)
  const modal = useModal()
  return (
    <span>
      Modal item details
      {/* <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          modal.onOpen()
        }}
      >
        {item?.serialNumber}
        <span className="font-thin text-gray-800 text-xs">{item?.name}</span>
      </button>
      <Modal {...modal}>
        {item ? (
          <ArticleDetails article={item} />
        ) : (
          <div>No encontramos infroamción de este articulo</div>
        )}
      </Modal> */}
    </span>
  )
}

export default ModalItemDetails
