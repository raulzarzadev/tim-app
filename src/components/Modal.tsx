import { Box, Container, IconButton, Tooltip, Typography } from '@mui/material'
import MUIModal, { ModalProps as MUIModalProps } from '@mui/material/Modal'
import { ReactNode } from 'react'
import AppIcon from './AppIcon'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  // maxWidth: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24
}
export type ModalProps = Pick<MUIModalProps, 'open' | 'onClose' | 'title'> & {
  description?: string
  children: ReactNode
  fullWidth?: boolean
}

const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  fullWidth,
  ...rest
}: ModalProps) => {
  return (
    <MUIModal
      open={open}
      onClose={onClose}
      aria-labelledby={`modal-modal-${title}`}
      aria-describedby={`modal-modal-description-${title}`}
      test-id={`modal-${title}`}
      {...rest} // * WARNING: test-id can be overwritten
    >
      <Box
        sx={{ ...style }}
        className={`overflow-y-auto border max-h-screen  ${
          fullWidth ? 'w-full' : 'max-w-2xl'
        }`}
        test-id="app-modal"
      >
        <Box
          className="w-full justify-between flex sticky top-0 shadow-md "
          sx={{ bgcolor: 'background.paper', zIndex: 2, p: 1 }}
        >
          <Typography id={`modal-modal-${title}`} variant="h6" component="h2">
            {title}
          </Typography>
          <Tooltip title="Cerrar">
            <IconButton
              aria-label={`close-modal-${title}`}
              onClick={(e) => {
                e.stopPropagation()
                onClose?.(e, 'escapeKeyDown')
              }}
            >
              <AppIcon icon="close" />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography id={`modal-modal-description-${title}`} sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Container sx={{ p: 2 }} test-id={`modal-${title}`} className="modal">
          {children}
        </Container>
      </Box>
    </MUIModal>
  )
}

export default Modal
