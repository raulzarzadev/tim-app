import { Box, Container, Typography } from '@mui/material'
import MUIModal, { ModalProps as MUIModalProps } from '@mui/material/Modal'
import { ReactNode } from 'react'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2
}
export type ModalProps = Pick<MUIModalProps, 'open' | 'onClose' | 'title'> & {
  description?: string
  children: ReactNode
}

const Modal = ({ open, onClose, title, description, children }: ModalProps) => {
  return (
    <MUIModal
      open={open}
      onClose={onClose}
      aria-labelledby={`modal-modal-${title}`}
      aria-describedby={`modal-modal-description-${title}`}
    >
      <Box sx={style} className="overflow-y-auto border max-h-screen">
        <Typography id={`modal-modal-${title}`} variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id={`modal-modal-description-${title}`} sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Container>{children}</Container>
      </Box>
    </MUIModal>
  )
}

export default Modal
