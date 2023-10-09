'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import ItemsInUse from './ItemsInUse'
import ItemsFinished from './ItemsFinished'

const CompanyAdmin = () => {
  return (
    <div>
      <ItemsInUse />
      <ItemsFinished />
    </div>
  )
}

export default validatePermissions(CompanyAdmin, 'RECEPTION')
