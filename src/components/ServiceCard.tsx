import { Service } from '@/types/service'
import ServiceDetails from './ServiceDetails'

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <div>
      <ServiceDetails service={service} />
    </div>
  )
}

export default ServiceCard
