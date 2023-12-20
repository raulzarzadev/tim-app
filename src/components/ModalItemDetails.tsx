import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import ArticleDetails from './ArticleDetails'
import { Typography } from '@mui/material'
import ItemActions from './ItemActions'
import { useEffect, useState } from 'react'
import { ArticleType } from '@/types/article'
import { getItem } from '@/firebase/items'

const ModalItemDetails = ({
  itemId,
  showCat,
  hiddenCurrentStatus
}: {
  itemId: string
  showCat?: boolean
  hiddenCurrentStatus?: boolean
}) => {
  //const { currentCompany } = useUserCompaniesContext()

  // const items = currentCompany?.articles
  // const item = items?.find((i) => i?.id === itemId)
  const [item, setItem] = useState<Partial<ArticleType> | null | undefined>()
  useEffect(() => {
    getItem(itemId).then(setItem)
  }, [itemId])
  const modal = useModal({
    title: `Detalles de ${item?.category && `${item?.category}-`}  ${
      item?.serialNumber || item?.name
    }`
  })

  if (!itemId) return <Typography>No item</Typography>
  if (!item) return <Typography>No encontrado</Typography>

  return (
    <span>
      <button
        className=" "
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          modal.onOpen()
        }}
      >
        {showCat && `${item?.category} `}
        <span className="truncate">{item?.serialNumber}</span>
        <span className="font-bold text-gray-900 text-xs">{item?.name} </span>
        <span>{item.rentStatus}</span>

        {/* {!hiddenCurrentStatus && <ItemCurrentStatus itemId={itemId} />} */}
      </button>
      <Modal {...modal}>
        {item ? (
          <ArticleDetails article={item} />
        ) : (
          <div>No encontramos información de este articulo</div>
        )}
        <ItemActions itemId={itemId} />
      </Modal>
    </span>
  )
}

export default ModalItemDetails
