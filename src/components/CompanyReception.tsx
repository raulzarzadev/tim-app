'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import ItemsInUse from './ItemsInUse'

const CompanyAdmin = () => {
  return (
    <div>
      Pagina de Recepción
      <ItemsInUse />
    </div>
  )
}

export default validatePermissions(CompanyAdmin, 'RECEPTION')
