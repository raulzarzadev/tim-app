import { Button, TextField, Typography } from '@mui/material'
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
import Modal from '../Modal'
import useModal from '@/hooks/useModal'
import { useUserShopContext } from '@/context/userShopContext'

const ClientActions = ({ clientId }: { clientId: string }) => {
  const { userShop } = useUserShopContext()
  const clients = userShop?.clients

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
    <div className="flex justify-evenly my-4">
      <ModalConfirm
        justIcon
        openIcon="edit"
        label="Editar"
        disabled={!client?.id}
      >
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
        justIcon
        openIcon="trash"
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
        justIcon
        openIcon="addComment"
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
      <ModalSendMsm to={client?.phone || ''} />
    </div>
  )
}

const ModalSendMsm = ({ to }: { to: string }) => {
  const modal = useModal()
  const [msj, setMsj] = useState('')
  const handleSendMsj = async () => {
    console.log({ msj, to })
    const res = await fetch('/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ msj, to })
    })
      .then((res) => res.json())
      .catch(console.error)
    console.log({ res })
  }
  return (
    <>
      <Button onClick={modal.onOpen}>Enviar mensaje</Button>
      <Modal {...modal}>
        <div className="flex justify-center">
          <TextField
            value={msj}
            onChange={(e) => {
              setMsj(e.target.value)
            }}
          />
        </div>
        <Button onClick={handleSendMsj}>Enviar mensaje</Button>
      </Modal>
    </>
  )
}

export default ClientActions
