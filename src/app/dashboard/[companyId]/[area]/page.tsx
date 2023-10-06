'use client'
import { IconName } from '@/components/AppIcon'
import CompanyAdmin from '@/components/CompanyAdmin'
import CompanyCashbox from '@/components/CompanyCashbox'
import CompanyDelivery from '@/components/CompanyDelivery'
import CompanyMaintenance from '@/components/CompanyMaintenance'
import CompanyReception from '@/components/CompanyReception'
import CompanyStore from '@/components/CompanyStore'
import ErrorBoundary from '@/components/ErrorBoundary'
import { StaffPermission, StaffPermissionLabels } from '@/types/staff'
import { Container, Typography } from '@mui/material'

const component: Record<
  StaffPermission,
  { label?: string; icon: IconName; component: React.ReactNode }
> = {
  CASHBOX: {
    icon: 'cashbox',
    component: <CompanyCashbox />
  },
  SALES: {
    icon: 'money',
    component: <CompanyStore />
  },
  MAINTENANCE: {
    icon: 'fix',
    component: <CompanyMaintenance />
  },
  DELIVERY: {
    icon: 'delivery',
    component: <CompanyDelivery />
  },
  ADMIN: {
    icon: 'person',
    component: <CompanyAdmin />
  },
  RECEPTION: {
    icon: 'store',
    component: <CompanyReception />
  }
}
const Page = ({
  params
}: {
  params: { area: StaffPermission; companyId: string }
}) => {
  const { area } = params
  const comp = component[area].component

  if (!comp) return <>No component</>

  return (
    <Container>
      <Typography className="text-center text-xl font-bold my-4">
        {StaffPermissionLabels[area]}
      </Typography>
      <ErrorBoundary componentName="Areas">{comp}</ErrorBoundary>
    </Container>
  )
}

export default Page
