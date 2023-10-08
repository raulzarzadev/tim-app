'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import ItemsInUse from './ItemsInUse'

const CompanyAdmin = () => {
  return (
    <div>
      <ItemsInUse />
    </div>
  )
}

export default validatePermissions(CompanyAdmin, 'RECEPTION')
