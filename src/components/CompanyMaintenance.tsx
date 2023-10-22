'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import BasicTabs from './BasicTabs'
import ServicesTable from './ServicesTable'
import ServiceForm from './ServiceForm'
import { createService } from '@/firebase/services'

const CompanyMaintenance = () => {
  const { services, currentCompany } = useUserCompaniesContext()
  const pendingServices = services?.filter((s) => s.status === 'pending')
  const inProgressServices = services?.filter((s) => s.status === 'in-progress')
  const completedServices = services?.filter((s) => s.status === 'finished')

  return (
    <div>
      <div className="flex justify-center">
        {/* <Button endIcon={<AppIcon icon="add" />}>Servicio</Button> */}
        <ServiceForm
          companyId={currentCompany?.id || ''}
          setService={async (s) => {
            console.log({ s })
            try {
              const res = await createService(s)
              console.log(res)
            } catch (err) {
              console.error(err)
            }
          }}
        />
      </div>
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
