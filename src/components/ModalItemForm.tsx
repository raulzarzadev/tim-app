import { IconButton, Typography } from '@mui/material'
import AppIcon from './AppIcon'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import ArticleForm from './ArticleForm'

const ModalItemForm = ({ label = 'Unidades' }: { label: string }) => {
  const modal = useModal({ title: 'Nuevo item' })
  return (
    <span>
      <Typography className="text-start font-bold text-lg" component={'span'}>
        {label}{' '}
        <IconButton color="success" onClick={modal.onOpen}>
          <AppIcon icon="add" />
        </IconButton>
      </Typography>

      <Modal {...modal}>
        <ArticleForm goBack={false} />
      </Modal>
    </span>
  )
}

export default ModalItemForm
