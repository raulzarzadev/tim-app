'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'

const CompanyMaintenance = () => {
  return (
    <div>
      <ServicesList />
    </div>
  )
}

const ServicesList = () => {
  const { services } = useUserCompaniesContext()
  console.log({ services })
  return <>Servicios</>
}

export default validatePermissions(CompanyMaintenance, 'MAINTENANCE')
