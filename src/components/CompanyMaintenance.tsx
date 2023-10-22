'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import BasicTabs from './BasicTabs'
import ServicesTable from './ServicesTable'

const CompanyMaintenance = () => {
  const { services } = useUserCompaniesContext()
  const pendingServices = services?.filter((s) => s.status === 'pending')
  const inProgressServices = services?.filter((s) => s.status === 'in-progress')
  const completedServices = services?.filter((s) => s.status === 'finished')

  return (
    <div>
      <BasicTabs
        tabs={[
          {
            label: `Pendientes (${pendingServices?.length})`,
            content: <ServicesTable services={pendingServices || []} />
          },
          {
            label: `En proceso (${inProgressServices?.length})`,
            content: <ServicesTable services={inProgressServices || []} />
          },
          {
            label: `Terminados (${completedServices?.length})`,
            content: <ServicesTable services={completedServices || []} />
          },

          {
            label: `Todos (${services?.length})`,
            content: <ServicesTable services={services || []} />
          }
        ]}
      />
    </div>
  )
}

export default validatePermissions(CompanyMaintenance, 'MAINTENANCE')
