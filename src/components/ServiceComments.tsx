import { Service, ServiceComment } from '@/types/service'
import { Divider, IconButton, Typography } from '@mui/material'
import CommentForm from './CommentForm'
import Modal from './Modal'
import PreviewImage from './PreviewImage'
import { orderBy } from 'lodash'
import { fromNow } from '@/lib/utils-date'
import { addServiceComment } from '@/firebase/services'
import useModal from '@/hooks/useModal'
import AppIcon from './AppIcon'
import StaffSpan from './StaffSpan'

const ServiceComments = ({
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
            <div className="grid text-end">
              <Typography variant="caption">{fromNow(comment.date)}</Typography>
              <Typography variant="caption">
                <StaffSpan email={comment?.createdBy || ''} />
              </Typography>
            </div>
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

export default ServiceComments
