'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import Checkout from './Checkout3'
import Categories from './Categories'
import { CashboxContextProvider } from '@/context/useCompanyCashbox'

const CompanyCashbox = () => {
  return (
    <div className="relative">
      <CashboxContextProvider>
        <Categories />
        <Checkout />
      </CashboxContextProvider>
    </div>
  )
}

export default validatePermissions(CompanyCashbox, 'CASHBOX')
