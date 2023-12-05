import { fromNow } from '@/lib/utils-date'
import { Comment } from '@/types/comment'
import { IconButton, Typography } from '@mui/material'
import StaffSpan from '../StaffSpan'
import AppIcon from '../AppIcon'
import ModalConfirm from '../ModalConfirm'
import { deleteComment } from '@/firebase/comments'

const CommentsList = ({ comments }: { comments: Partial<Comment>[] }) => {
  const handleDeleteComment = (id: string) => {
    deleteComment(id).then(console.log).catch(console.error)
  }
  return (
    <div>
      <Typography variant="h6" className="text-center mt-6">
        Comentarios
      </Typography>
      {comments.map((c) => (
        <div key={c.id} className="my-3 max-w-xs mx-auto">
          <div className="flex justify-end items-center">
            <Typography variant="caption" className="flex justify-end">
              Creado: {fromNow(c.created?.at)} por:{' '}
              <StaffSpan email={c.created?.byEmail || ''} />
            </Typography>
            <ModalConfirm
              openIcon="trash"
              color="error"
              justIcon
              acceptColor="error"
              acceptLabel="Eliminar"
              handleConfirm={() => {
                handleDeleteComment(c.id || '')
              }}
            >
              <Typography className="text-center">
                Elimiar comentario!
              </Typography>
            </ModalConfirm>
          </div>
          <Typography>{c.content}</Typography>
        </div>
      ))}
    </div>
  )
}

export default CommentsList
