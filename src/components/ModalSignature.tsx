import useModal from '@/hooks/useModal'
import { Box, Button, Typography } from '@mui/material'
import Modal from './Modal'
import SignatureCanvas from 'react-signature-canvas'
import { useRef, useState } from 'react'
import CheckboxLabel from './Checkbox'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'

const ModalSignature = ({
  signature,
  setSignature
}: {
  signature?: string | null
  setSignature?: (signature: string | null) => void
}) => {
  const { currentCompany } = useUserCompaniesContext()
  const modal = useModal({ title: 'Firmar' })
  const signatureRef = useRef<any>()
  const handleClearSignature = () => {
    signatureRef?.current?.clear?.()
  }
  const handleSetSignature = (signature: string | null) => {
    setSignature?.(signature)
  }
  const modalContract = useModal({
    title: 'Terminos y condiciones'
  })
  return (
    <>
      <Button
        color="success"
        onClick={(e) => modal.onOpen()}
        variant="outlined"
        fullWidth
      >
        Aceptar terminos y condiciones
      </Button>
      <Modal {...modal}>
        <Box>
          {/* <CheckboxLabel
            label={
              <span
                className="underline text-blue-500 hover:text-blue-900"
                onClick={(e) => {
                  modalContract.onOpen()
                }}
              >
                Aceptar terminos y condiciones
              </span>
            }
          /> */}
          <Typography
            className="underline  text-blue-500 hover:text-blue-900 text-xl text-center my-2"
            onClick={(e) => modalContract.onOpen()}
          >
            Lea con atención los términos y condiciones
          </Typography>
          <Modal {...modalContract}>
            <Typography className="" variant="h4">
              Contrato de arrendamiento
            </Typography>
            <Typography className="whitespace-pre-line">
              {currentCompany?.contract || ''}
            </Typography>
            <Button
              onClick={() => modalContract.onClose()}
              variant="outlined"
              fullWidth
              className="my-4"
            >
              Entiendo y acepto.
            </Button>
          </Modal>
        </Box>
        <Box className="border shadow-inner ">
          <SignatureCanvas
            onEnd={(e) => {
              const image = signatureRef.current
                .getTrimmedCanvas()
                .toDataURL('image/png')

              handleSetSignature(image)
            }}
            penColor="green"
            ref={(ref) => (signatureRef.current = ref)}
            canvasProps={{
              className: 'sigCanvas w-full aspect-video',
              style: {
                minHeight: '50vh'
              }
            }}
          />
        </Box>
        <Box className="flex w-full justify-around my-2 mt-4 ">
          <Button
            variant="outlined"
            size="small"
            onClick={(e) => {
              e.preventDefault()
              handleClearSignature()
              handleSetSignature(null)
            }}
            color="success"
          >
            Limpiar
          </Button>
          <Button variant="outlined" onClick={() => modal.onClose()}>
            Listo
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default ModalSignature
