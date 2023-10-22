import { Service, ServiceComment, serviceStatusLabels } from '@/types/service'
import { Divider, IconButton, Typography } from '@mui/material'
import ModalItemDetails from './ModalItemDetails'
import { dateFormat, fromNow } from '@/lib/utils-date'
import PreviewImage from './PreviewImage'
import AppIcon from './AppIcon'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import CommentForm from './CommentForm'
import { addServiceComment } from '@/firebase/services'
import { orderBy, sortBy } from 'lodash'
import StaffSpan from './StaffSpan'

const ServiceDetails = ({ service }: { service: Service }) => {
  return (
    <div>
      <Typography className="text-center">
        <span className="font-bold">Status: </span>
        <span className="">{serviceStatusLabels[service?.status]}</span>
      </Typography>
      <Typography>
        <span className="font-bold">Item: </span>
        <ModalItemDetails itemId={service.itemId || ''} showCat />
      </Typography>
      <Typography>
        <span className="font-bold">Razon: </span>
        <span className="">{service.reason}</span>
      </Typography>
      <Typography>
        <span className="font-bold">Creado: </span>
        {dateFormat(service.created.at, 'dd/MM/yy HH:mm')}
      </Typography>
      <Typography>
        <span className="font-bold">Asignado a: </span>
        <StaffSpan email={service.assignedToEmail || ''} />
      </Typography>
      <Typography component={'div'}>
        <span className="font-bold">Descripción: </span>
        <div className="">{service.description}</div>
      </Typography>
      <div className="overflow-y-auto">
        <div className="inline-flex">
          {service.images?.map((image, index) => (
            <div key={image.url} className="w-[120px] p-1 m-1">
              <PreviewImage
                src={image.url}
                alt={`imagen ${index} de servicio`}
              />
              <Typography className="text-xs whitespace-pre-wrap">
                {image.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      {/* <CommentsSection comments={service?.comments} serviceId={service?.id} /> */}
    </div>
  )
}

const CommentsSection = ({
  serviceId,
  comments
}: {
  serviceId: Service['id']
  comments?: ServiceComment[]
}) => {
  const modal = useModal({ title: 'Agregar comentario' })
  const setComment = async (comment: ServiceComment) => {
    try {
      const res = await addServiceComment(serviceId, comment)
      modal.onClose()
      console.log({ res })
      return res
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <div className="flex justify-center">
        <IconButton color="primary" onClick={modal.onOpen}>
          <AppIcon icon="addComment" />
        </IconButton>
      </div>
      <Modal {...modal}>
        <CommentForm setComment={setComment} />
      </Modal>
      {orderBy(comments, 'date', ['desc'])?.map((comment, i) => (
        <div key={i}>
          <Divider className="my-4" />
          <div className="flex justify-between">
            <Typography>{comment.content}</Typography>
            <Typography variant="caption">{fromNow(comment.date)}</Typography>
          </div>
          <div>
            {comment.images.map((url) => (
              <PreviewImage src={url} key={url} alt="image comment" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ServiceDetails
