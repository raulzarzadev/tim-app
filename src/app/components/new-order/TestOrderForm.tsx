'use client'

import ModalOrderForm from '@/components/orders/ModalOrderForm'
import { UserCompaniesContext } from '@/context/userCompaniesContext2'
import { UserShopContext, UserShopProvider } from '@/context/userShopContext'
import { CompanyType } from '@/types/company'

const TestOrderForm = ({ company }: { company: CompanyType }) => {
  return (
    <div>
      {/* <UserCompaniesContext.Provider
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
      > */}
      <UserShopContext.Provider
        value={{
          userShop: company,
          userShops: []

          // currentCompany: company,
          // companyItems: [],
          // companySelected: company.id || '',
          // clients: [],
          // orders: [],
          // services: [],
          // setCompanySelected: () => {},
          // userCompanies: [],
          // ordersItems: {
          //   all: [],
          //   pending: [],
          //   expired: [],
          //   finished: [],
          //   inUse: []
          // }
        }}
      >
        <ModalOrderForm
          label="Nueva orden"
          shippingEnabled={company.shippingEnabled}
          closeOnSave={false}
        />
      </UserShopContext.Provider>
      {/* </UserCompaniesContext.Provider> */}
    </div>
  )
}

export default TestOrderForm
