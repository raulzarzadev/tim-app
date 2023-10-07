import useModal from '@/hooks/useModal'
import { Box, Button } from '@mui/material'
import Modal from './Modal'
import SignatureCanvas from 'react-signature-canvas'
import { useRef, useState } from 'react'

const ModalSignature = ({
  signature,
  setSignature
}: {
  signature?: string | null
  setSignature?: (signature: string | null) => void
}) => {
  const modal = useModal({ title: 'Firmar' })
  const signatureRef = useRef<any>()
  const handleClearSignature = () => {
    signatureRef?.current?.clear?.()
  }
  const handleSetSignature = (signature: string | null) => {
    setSignature?.(signature)
  }
  return (
    <>
      <Button
        color="success"
        onClick={(e) => modal.onOpen()}
        variant="outlined"
        fullWidth
      >
        Firmar
      </Button>
      <Modal {...modal}>
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
