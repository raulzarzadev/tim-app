import { Service } from '@/types/service'
import { Typography } from '@mui/material'
import ModalItemDetails from './ModalItemDetails'
import { dateFormat } from '@/lib/utils-date'
import PreviewImage from './PreviewImage'

const ServiceDetails = ({ service }: { service: Service }) => {
  console.log({ service })
  return (
    <div>
      <Typography>
        Item: <ModalItemDetails itemId={service.itemId || ''} />
      </Typography>
      <Typography>
        Razon: <span className="font-bold">{service.reason}</span>
      </Typography>
      <Typography>
        Creado: {dateFormat(service.created.at, 'dd/MM/yy :HH:mm')}
      </Typography>
      <Typography>
        Asignado a: {service.assignedToEmail ? service.assignedToEmail : '-'}
      </Typography>
      <div className="overflow-y-auto">
        <div className="inline-flex">
          {service.images?.map((image, index) => (
            <div key={image.url} className="w-[120px] p-1 m-1">
              <PreviewImage
                src={image.url}
                alt={`imagen ${index} de servicio`}
              />
              <Typography className="text-xs whitespace-pre-wrap">
                {image.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceDetails
