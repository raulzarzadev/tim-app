import { Box, Typography } from '@mui/material'
import PricesList from './PricesList'
import { ItemOrder } from '@/context/userCompaniesContext2'
import { ArticleType } from '@/types/article'
import AccordionSections from './AccordionSections'
import MyTable from './MyTable'
import { useEffect, useState } from 'react'
import { listenItemServices } from '@/firebase/services'
import { dateFormat } from '@/lib/utils-date'
import { Service, serviceStatusLabels } from '@/types/service'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import ServiceCard from './ServiceCard'
import ItemOrders from './ItemOrders'

const ArticleDetails = ({ article }: { article?: ItemOrder | ArticleType }) => {
  return (
    <Box className="my-4 text-center">
      <Typography variant="h6" color="text.primary">
        {article?.status}
        {article?.category || ''}
      </Typography>
      <Typography
        variant="h5"
        component="div"
        className="items-center flex justify-center mb-2"
      >
        {article?.serialNumber}
        <Typography component={'span'} color="text.secondary">
          {article?.name}
        </Typography>{' '}
      </Typography>
      <Typography color="text.secondary">{article?.color}</Typography>
      <Box>
        <AccordionSections
          sections={[
            {
              title: 'Precios',
              subTitle: article?.ownPrice ? 'Propio' : ' De categoria',
              content: <PricesList prices={article?.prices || []} />
            },
            {
              title: 'Servicios',
              subTitle: '',
              content: <ItemServices itemId={article?.id || ''} />
            },
            {
              title: 'Ordenes',
              subTitle: '',
              content: <ItemOrders itemId={article?.id || ''} />
            }
          ]}
        />
      </Box>
    </Box>
  )
}

const ItemServices = ({ itemId }: { itemId: string }) => {
  const [services, setServices] = useState<Service[]>([])
  const [service, setService] = useState<Service>()
  const modal = useModal({ title: 'Detalle de servicio' })
  const onRowClick = (serviceId: string) => {
    setService(services?.find((s) => s?.id === serviceId))
    modal.onOpen()
  }
  useEffect(() => {
    listenItemServices(itemId, setServices)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {service && (
        <>
          <Modal {...modal}>
            <ServiceCard service={service} />
          </Modal>
        </>
      )}
      <MyTable
        onRowClick={onRowClick}
        data={{
          headers: [
            // {
            //   label: 'Item',
            //   key: 'itemId',
            //   format: (value) => <ModalItemDetails itemId={value} />
            // },
            {
              label: 'Fecha',
              key: 'created.at',
              format: (value) => dateFormat(value, 'dd/MMM HH:mm')
            },
            {
              label: 'Razón',
              key: 'reason'
            },
            {
              label: 'Status',
              key: 'status',
              format: (value) => serviceStatusLabels[value as Service['status']]
            }
          ],
          body: services || []
        }}
      />
    </div>
  )
}

export default ArticleDetails
