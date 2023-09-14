'use client'
import validatePermissions from "@/HOC's/validatePermissions"

const CompanyAdmin = () => {
  return <div>Pagina de admin</div>
}

export default validatePermissions(CompanyAdmin, 'ADMIN')
