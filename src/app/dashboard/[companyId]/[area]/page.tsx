'use client'
import CompanyAdmin from '@/components/CompanyAdmin'
import CompanyCashbox from '@/components/CompanyCashbox'
import CompanyDelivery from '@/components/CompanyDelivery'
import CompanyMaintenance from '@/components/CompanyMaintenance'
import CompanyReception from '@/components/CompanyReception'
import CompanyStore from '@/components/CompanyStore'
import ErrorBoundary from '@/components/ErrorBoundary'
import { StaffPermission, StaffPermissionLabels } from '@/types/staff'
import { Container, Typography } from '@mui/material'

const Page = ({
  params
}: {
  params: { area: StaffPermission; companyId: string }
}) => {
  const { area } = params

  return (
    <ErrorBoundary componentName="Areas">
      <Container>
        <Typography className="text-center text-xl font-bold my-4">
          {StaffPermissionLabels[area]}
        </Typography>
        {area === 'ADMIN' && <CompanyAdmin />}
        {area === 'CASHBOX' && <CompanyCashbox />}
        {area === 'DELIVERY' && <CompanyDelivery />}
        {area === 'MAINTENANCE' && <CompanyMaintenance />}
        {area === 'RECEPTION' && <CompanyReception />}
        {area === 'SALES' && <CompanyStore />}
      </Container>
    </ErrorBoundary>
  )
}

export default Page
