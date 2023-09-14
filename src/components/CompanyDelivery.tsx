'use client'
import validatePermissions from "@/HOC's/validatePermissions"

const CompanyAdmin = () => {
  return <div>Pagina de Envios</div>
}

export default validatePermissions(CompanyAdmin, 'DELIVERY')
