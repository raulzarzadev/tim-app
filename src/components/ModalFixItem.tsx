import { Button, IconButton, TextField } from '@mui/material'
import AppIcon from './AppIcon'
import ModalConfirm from './ModalConfirm'
import { useForm } from 'react-hook-form'
import InputUploadFile from './InputUploadFile'
import { Service } from '@/types/service'
import { useState } from 'react'
import PreviewImage from './PreviewImage'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import { createService } from '@/firebase/repairOrders'

const ModalFixItem = ({
  itemId,
  companyId
}: {
  itemId: string
  companyId: string
}) => {
  const { register, handleSubmit, setValue, watch } = useForm<Service>()
  const formValues = watch()
  const onSubmit = async (data: Partial<Service>) => {
    const res = await createService({ ...data, companyId, itemId })

    return res
  }
  // const [images, setImages] = useState<Service['images']>([])
  const modalRemove = useModal({
    title: 'Remover imagen'
  })
  const images = formValues?.images || []

  return (
    <div>
      <ModalConfirm
        color="error"
        openIcon="fix"
        label="Enviar al taller"
        handleConfirm={handleSubmit(onSubmit)}
        acceptLabel="Enviar al taller"
      >
        <form className="grid gap-4">
          <TextField {...register('reason')} label="Motivo"></TextField>
          <TextField
            {...register('description')}
            label="Descripción del problema"
            multiline
            rows={4}
          ></TextField>
          <div className="overflow-x-auto ">
            <div className=" inline-flex pb-2 ">
              {images?.map((i, index) => (
                <div key={i.url} className="  p-1 w-1/2 min-w-[170px] relative">
                  <IconButton
                    color="error"
                    className="absolute top-0 right-0 opacity-70 hover:opacity-100 z-10"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      modalRemove.onOpen()
                    }}
                  >
                    <AppIcon icon="trash" />
                  </IconButton>
                  <Modal {...modalRemove}>
                    <div className="flex justify-center">
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          modalRemove.onClose()

                          setValue(
                            `images`,
                            images.filter((image) => image.url !== i.url)
                          )
                        }}
                      >
                        Remover
                      </Button>
                    </div>
                  </Modal>
                  <PreviewImage
                    fullWidth
                    src={i.url}
                    alt={`service order ${i.description}`}
                  />
                  <TextField
                    label="Descripción"
                    {...register(`images.${index}.description`)}
                    //label="Descripción"
                    className="mt-2"
                    multiline
                    rows={2}
                    fullWidth
                  />
                </div>
              ))}
            </div>
          </div>
          <InputUploadFile
            label="Adjuntar imagen"
            setURL={(url) =>
              setValue(`images.${images.length}`, { url, description: '' })
            }
          />
        </form>
      </ModalConfirm>
    </div>
  )
}

export default ModalFixItem
