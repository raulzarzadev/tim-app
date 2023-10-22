import { Service, serviceStatusLabels } from '@/types/service'
import { Typography } from '@mui/material'
import ModalItemDetails from './ModalItemDetails'
import { dateFormat } from '@/lib/utils-date'
import PreviewImage from './PreviewImage'

const ServiceDetails = ({ service }: { service: Service }) => {
  return (
    <div>
      <Typography className="text-center">
        <span className="font-bold">Status: </span>
        <span className="">{serviceStatusLabels[service?.status]}</span>
      </Typography>
      <Typography>
        <span className="font-bold">Item: </span>
        <ModalItemDetails itemId={service.itemId || ''} />
      </Typography>
      <Typography>
        <span className="font-bold">Razon: </span>
        <span className="">{service.reason}</span>
      </Typography>
      <Typography>
        <span className="font-bold">Creado: </span>
        {dateFormat(service.created.at, 'dd/MM/yy HH:mm')}
      </Typography>
      <Typography>
        <span className="font-bold">Asignado a: </span>
        {service.assignedToEmail ? service.assignedToEmail : '-'}
      </Typography>
      <Typography component={'div'}>
        <span className="font-bold">Descripción: </span>
        <div className="">{service.description}</div>
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
