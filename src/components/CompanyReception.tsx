'use client'
import validatePermissions from "@/HOC's/validatePermissions"

const CompanyAdmin = () => {
  return <div>Pagina de Recepción</div>
}

export default validatePermissions(CompanyAdmin, 'RECEPTION')
