import { Box, Skeleton, Typography } from '@mui/material'
import ShopClients from './ShopClients'
import BasicTabs from '../BasicTabs'
import { CompanyType } from '@/types/company'
import ShopItemsTabs from '../ShopItemsTabs'
import ShopOrders from './ShopOrders'
import ShopStaff from './ShopStaff'
import { useAuthContext } from '@/context/authContext'
import ShopOrdersTabs from './ShopOrdersTabs'

const ShopDashboard = ({ shop }: { shop: Partial<CompanyType> }) => {
  const { user } = useAuthContext()
  const permissions = shop?.staff?.find(
    (s) => s.email === user?.email
  )?.permissions
  const isAdmin = permissions?.ADMIN
  // const viewOrders = permissions?.ORDERS
  const viewMyOrders = permissions?.MY_ORDERS
  const viewClients = permissions?.ADMIN
  const viewItems = permissions?.ADMIN

  const myOrders =
    shop?.orders?.filter((o) => o.shipping?.assignedToEmail === user?.email) ||
    []
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
            ),
            hidden: !viewClients
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
            ),
            hidden: !viewItems
          },
          {
            label: `Ordenes (${shop.orders?.length || 0})`,
            content: <ShopOrders shop={shop} />,
            hidden: !isAdmin
          },
          {
            label: `Mis Ordenes (${myOrders?.length || 0})`,
            content: (
              <ShopOrdersTabs
                hideActives
                hideCanceled
                hideAlls
                hideFinished
                hidePendingPayments
                orders={myOrders}
              />
            ),
            hidden: !viewMyOrders
          },
          {
            label: `Staff (${shop.staff?.length || 0})`,
            content: <ShopStaff staff={shop?.staff || []} />,
            hidden: !isAdmin
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
