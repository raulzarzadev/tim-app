import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { uploadFile } from '@/firebase/files'
import CircularProgressLabel from './CircularProgressLabel'

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
  const [progress, setProgress] = React.useState(0)
  const onUploadFile = (files: FileList | null) => {
    setProgress(1)
    const file = files?.[0]
    if (!file) return console.error('first file is null')
    uploadFile(file, label, ({ progress, downloadURL }) => {
      setProgress(progress)
      if (downloadURL) {
        setURL?.(downloadURL)
        setTimeout(() => {
          setProgress(0)
        }, 500)
      }
    })
  }

  const showProgressBar = progress > 0 || progress === 100

  return (
    <>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        disabled={showProgressBar}
      >
        <span className="mr-2">{label}</span>
        {showProgressBar && <CircularProgressLabel value={progress} />}
        <VisuallyHiddenInput
          type="file"
          onChange={(e) => onUploadFile(e.target.files)}
        />
      </Button>
    </>
  )
}
