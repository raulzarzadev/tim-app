import AppIcon from './AppIcon'
import InputUploadFile from './InputUploadFile'
import { Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ServiceComment } from '@/types/service'
import PreviewImage from './PreviewImage'

const CommentForm = ({
  setComment
}: {
  setComment: (comment: ServiceComment) => Promise<any> | void
}) => {
  const { register, setValue, watch, handleSubmit } = useForm()
  const onSubmit = async (data: any) => {
    await setComment(data)
  }
  const images = watch('images') || []
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
      <TextField
        {...register('content')}
        label="Agregar comentario"
        multiline
        rows={4}
      />
      <div className="flex gap-1">
        {images?.map((image: string) => (
          <div key={image} className="w-1/2">
            <PreviewImage fullWidth src={image} alt="image-comment" />
          </div>
        ))}
      </div>
      <InputUploadFile
        label="Adjuntar imagen"
        setURL={(url) => setValue(`images.${images?.length}`, url)}
      />
      <Button type="submit" endIcon={<AppIcon icon="save" />}>
        Guardar
      </Button>
    </form>
  )
}

export default CommentForm
