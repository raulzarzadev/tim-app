'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import Checkout from './Checkout2'
import Categories from './Categories'
import { CashboxContextProvider } from '@/context/useCompanyCashbox'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'

const CompanyCashbox = () => {
  const { currentCompany } = useUserCompaniesContext()
  return (
    <div className="">
      <CashboxContextProvider>
        <Categories />
        <Checkout
          items={currentCompany?.articles}
          categories={currentCompany?.categories}
        />
      </CashboxContextProvider>
    </div>
  )
}

export default validatePermissions(CompanyCashbox, 'CASHBOX')
