import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { FirebaseCRUD } from '@/firebase/firebase.CRUD'
import { uploadFile } from '@/firebase/files'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

export default function InputUploadFile({
  label = 'Upload file',
  setURL
}: {
  label: string
  setURL?: (url: string) => void
}) {
  const onUploadFile = (files: FileList | null) => {
    const file = files?.[0]
    if (!file) return console.error('first file is null')
    uploadFile(file, label, ({ progress, downloadURL }) => {
      if (downloadURL) setURL?.(downloadURL)
    })
  }
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      {label}
      <VisuallyHiddenInput
        type="file"
        onChange={(e) => onUploadFile(e.target.files)}
      />
    </Button>
  )
}
