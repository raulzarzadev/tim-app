'use client'
import CompanyAdmin from '@/components/CompanyAdmin'
import CompanyCashbox2 from '@/components/CompanyCashbox2'
import CompanyDelivery from '@/components/CompanyDelivery'
import CompanyMaintenance from '@/components/CompanyMaintenance'
import CompanyOrders from '@/components/CompanyOrders'
import CompanyReception from '@/components/CompanyReception'
import CompanyStore from '@/components/CompanyStore'
import ErrorBoundary from '@/components/ErrorBoundary'
import { StaffPermission, StaffPermissionLabels } from '@/types/staff'
import { Typography } from '@mui/material'

const Page = ({
  params
}: {
  params: { area: StaffPermission; companyId: string }
}) => {
  const { area } = params

  return (
    <ErrorBoundary componentName="Areas">
      <Typography className="text-center text-xl font-bold my-4">
        {StaffPermissionLabels[area]}
      </Typography>
      <>
        {area === 'ADMIN' && <CompanyAdmin />}
        {area === 'CASHBOX' && <CompanyCashbox2 />}
        {area === 'DELIVERY' && <CompanyDelivery />}
        {area === 'MAINTENANCE' && <CompanyMaintenance />}
        {area === 'RECEPTION' && <CompanyReception />}
        {area === 'SALES' && <CompanyStore />}
        {area === 'ORDERS' && <CompanyOrders />}
      </>
    </ErrorBoundary>
  )
}

export default Page
