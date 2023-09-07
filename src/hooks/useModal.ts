import { useState } from 'react'

export type ModalType = {
  title?: string
  description?: string
}
const useModal = (props?: ModalType) => {
  const [open, setOpen] = useState(false)
  const onClose = () => {
    setOpen(false)
  }
  const onOpen = () => {
    setOpen(true)
  }
  return {
    title: props?.title,
    description: props?.description,
    open,
    onClose,
    onOpen
  }
}

export default useModal
