'use client'
import validatePermissions from "@/HOC's/validatePermissions"

const CompanyAdmin = () => {
  return <div>Pagina de ventas</div>
}

export default validatePermissions(CompanyAdmin, 'SALES')
