import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { listenClientComments } from '@/firebase/comments'
import { Comment } from '@/types/comment'
import { useEffect, useState } from 'react'
import CommentsList from '../Comments/CommentsList'

const ClientComments = ({ clientId }: { clientId: string }) => {
  const [comments, setComments] = useState<Comment[]>([])
  useEffect(() => {
    listenClientComments(clientId, setComments)
    console.log('comments')
  }, [clientId])
  return (
    <div>
      <CommentsList comments={comments} />
    </div>
  )
}

export default ClientComments
