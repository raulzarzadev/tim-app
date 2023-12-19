import { Typography } from '@mui/material'
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
            label: 'Clientes',
            content: (
              <ShopClients
                clients={shop.clients || []}
                companyId={shop?.id || ''}
              />
            )
          },
          {
            label: 'Unidades',
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
          { label: 'Ordenes', content: <ShopOrders shop={shop} /> },
          { label: 'Staff', content: <ShopStaff staff={shop.staff || []} /> }
          // { label: 'Cortes', content: <CompanyBalances /> },
          // { label: 'Tienda', content: <CompanyStore /> }
        ]}
      />
    </div>
  )
}

export default ShopDashboard
