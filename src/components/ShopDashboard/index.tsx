import { Box, Skeleton, Typography } from '@mui/material'
import ShopClients from './ShopClients'
import BasicTabs from '../BasicTabs'
import { CompanyType } from '@/types/company'
import ShopItemsTabs from '../ShopItemsTabs'
import ShopOrders from './ShopOrders'
import ShopStaff from './ShopStaff'

const ShopDashboard = ({ shop }: { shop: Partial<CompanyType> }) => {
  return (
    <div>
      <BasicTabs
        title="dashboard"
        tabs={[
          //  { label: 'Clientes ', content: <></> }, //CompanyPayments
          {
            label: `Clientes (${shop?.clients?.length || 0})`,
            content: (
              <ShopClients
                clients={shop?.clients || []}
                companyId={shop?.id || ''}
              />
            )
          },
          {
            label: `Artículos (${shop?.items?.length || 0})`,
            content: (
              <ShopItemsTabs
                showItemActions
                showItemsActions
                categories={shop?.categories || []}
                items={shop?.items || []}
                shopId={shop?.id || ''}
              />
            )
          },
          {
            label: `Ordenes (${shop.orders?.length || 0})`,
            content: <ShopOrders shop={shop} />
          },
          {
            label: `Staff (${shop.staff?.length || 0})`,
            content: <ShopStaff staff={shop?.staff || []} />
          }
          // { label: 'Cortes', content: <CompanyBalances /> },
          // { label: 'Tienda', content: <CompanyStore /> }
        ]}
      />
    </div>
  )
}

export const ShopDashboardSkeleton = () => {
  return (
    <Box>
      <Box>
        <Skeleton height={120} width="100%" variant="rectangular"></Skeleton>
        <Skeleton
          height={120}
          width="100%"
          variant="rectangular"
          className="my-2"
        ></Skeleton>
        <Skeleton
          height={120}
          width="100%"
          variant="rectangular"
          className="my-2"
        ></Skeleton>
      </Box>
    </Box>
  )
}

export default ShopDashboard
