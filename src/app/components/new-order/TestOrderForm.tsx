'use client'

import ModalOrderForm from '@/components/orders/ModalOrderForm'
import { UserCompaniesContext } from '@/context/userCompaniesContext2'
import { CompanyType } from '@/types/company'

const TestOrderForm = ({ company }: { company: CompanyType }) => {
  return (
    <div>
      <UserCompaniesContext.Provider
        value={{
          currentCompany: company,
          companyItems: [],
          companySelected: company.id || '',
          clients: [],
          orders: [],
          services: [],
          setCompanySelected: () => {},
          userCompanies: [],
          ordersItems: {
            all: [],
            pending: [],
            expired: [],
            finished: [],
            inUse: []
          }
        }}
      >
        <ModalOrderForm
          label="Nueva orden"
          shippingEnabled={company.shippingEnabled}
          closeOnSave={false}
        />
      </UserCompaniesContext.Provider>
    </div>
  )
}

export default TestOrderForm
