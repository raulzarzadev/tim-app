import { Button, Typography } from '@mui/material'
import ModalConfirm from '../ModalConfirm'
import ClientForm from '../orders/ClientForm'
import { Client } from '@/types/client'
import { useEffect, useState } from 'react'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import AppIcon from '../AppIcon'
import { deleteClient, updateClient } from '@/firebase/clients'
import CommentForm from '../CommentForm'
import { Comment } from '@/types/comment'
import { createComment } from '@/firebase/comments'

const ClientActions = ({ clientId }: { clientId: string }) => {
  const { clients } = useUserCompaniesContext()

  const [client, setClient] = useState<Partial<Client>>()
  useEffect(() => {
    setClient(clients?.find((c) => c.id === clientId) || {})
  }, [clientId, clients])

  const handleEdit = (client?: Partial<Client>) => {
    if (client?.id && client)
      updateClient(client?.id, client).then(console.log).catch(console.error)
  }
  const handleDelete = () => {
    if (client?.id) {
      deleteClient(client?.id).then(console.log).catch(console.error)
    }
  }

  const handleComment = async (comment: Comment) => {
    comment.type = 'client'
    if (comment.type === 'client') {
      comment.clientId = clientId || ''
      return await createComment(comment).then(console.log).catch(console.error)
    }
  }
  return (
    <div>
      <ModalConfirm label="Editar" disabled={!client?.id}>
        <ClientForm
          client={client}
          setClient={(client) => {
            setClient(client)
            handleEdit(client)
          }}
          labelSave="Editar"
        />
      </ModalConfirm>
      <ModalConfirm
        disabled={!client?.id}
        color="error"
        acceptLabel="Eliminar"
        acceptColor="error"
        label="Eliminar"
        handleConfirm={() => {
          setClient({})
          handleDelete()
        }}
      >
        <div className="flex justify-center">
          <AppIcon icon="info" color="info" />
          <Typography>
            Eliminar este cliente solo eliminara los datos del cliente
            {/* y los comentarios */}
          </Typography>
        </div>
      </ModalConfirm>
      <ModalConfirm
        disabled={!client?.id}
        color="info"
        acceptLabel="Comentar"
        acceptColor="info"
        label={`Comentar `}
        modalTitle={`Comentario a ${client?.name}`}
        // handleConfirm={() => {
        //   handleComment()
        // }}
      >
        <CommentForm
          setComment={async (comment) => {
            return await handleComment(comment)
          }}
        />
      </ModalConfirm>
    </div>
  )
}

export default ClientActions
