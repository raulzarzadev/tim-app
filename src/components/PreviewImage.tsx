import Image from 'next/image'
import Modal from './Modal'
import useModal from '@/hooks/useModal'

const PreviewImage = ({
  src,
  alt = 'alt text'
}: {
  src: string
  alt: string
}) => {
  const modalImage = useModal({ title: 'Imagen ' })
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          modalImage.onOpen()
        }}
        className="relative h-16 aspect-video object-contain mx-auto "
      >
        <Image
          src={src}
          fill
          alt={alt}
          className="object-cover object-center rounded-md shadow-md cursor-pointer opacity-40 hover:opacity-100"
        />
      </button>
      <Modal {...modalImage}>
        <div className="relative w-full aspect-square">
          <Image
            blurDataURL={src}
            src={src}
            fill
            alt={alt}
            className="object-contain"
          />
        </div>
      </Modal>
    </>
  )
}

export default PreviewImage
