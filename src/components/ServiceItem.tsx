import { createService } from '@/firebase/services'
import ServiceForm from './ServiceForm'
import { ArticleType } from '@/types/article'
import { Service } from '@/types/service'

const ServiceItem = ({
  companyId,
  itemId,
  item,
  service
}: {
  itemId: string
  companyId: string
  item?: ArticleType
  service?: Service
}) => {
  const createItemService = async (service: Partial<Service>) => {
    await createService({ ...service, companyId, itemId })
  }
  return (
    <div>
      <ServiceForm
        companyId={companyId}
        itemId={itemId}
        item={item}
        setService={createItemService}
        service={service}
      />
    </div>
  )
}

export default ServiceItem
