import { useState } from 'react'

const useModal = ({
  title = '',
  description
}: {
  title?: string
  description?: ''
}) => {
  const [open, setOpen] = useState(false)
  const onClose = () => {
    setOpen(false)
  }
  const onOpen = () => {
    setOpen(true)
  }
  return {
    title,
    description,
    open,
    onClose,
    onOpen
  }
}

export default useModal
