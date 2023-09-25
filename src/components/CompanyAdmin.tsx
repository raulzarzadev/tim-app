'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { listenCompanyActivePayments } from '@/firebase/payments'
import { useEffect, useState } from 'react'
import CompanyPayments from './CompanyPayments'

const CompanyAdmin = () => {
  return (
    <div>
      Pagina de admin
      <CompanyPayments />
    </div>
  )
}

export default validatePermissions(CompanyAdmin, 'ADMIN')
