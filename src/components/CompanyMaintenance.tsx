'use client'
import validatePermissions from "@/HOC's/validatePermissions"

const CompanyAdmin = () => {
  return <div>Pagina de Mantenimiento</div>
}

export default validatePermissions(CompanyAdmin, 'MAINTENANCE')
