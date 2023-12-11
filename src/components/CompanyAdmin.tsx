'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import BasicTabs from './BasicTabs'
import CompanyStaff from './CompanyStaff'
import CompanyBalances from './cashboxBalances/CompanyBalances'
import CompanyOrders from './CompanyOrders'
import CompanyItems from './CompanyItems'
import CompanyClients from './CompanyClients'
import Select from './Select'
import { Button } from '@mui/material'
import Link from 'next/link'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import AppIcon from './AppIcon'
import CompanyStore from './CompanyStore'

const CompanyAdmin = () => {
  const { companySelected, setCompanySelected, userCompanies } =
    useUserCompaniesContext()
  return (
    <div>
      <div className="flex w-full my-4 ">
        <Select
          fullWidth
          selected={companySelected}
          label="Empresa"
          onSelect={(value) => setCompanySelected(value)}
          options={userCompanies.map((company) => ({
            value: company?.id,
            label: company?.name
          }))}
        />

        <Button
          size="small"
          LinkComponent={Link}
          href={`/new-company/${companySelected}`}
        >
          <AppIcon icon="edit" />
        </Button>
      </div>
      <BasicTabs
        title="dashboard"
        tabs={[
          //  { label: 'Clientes ', content: <></> }, //CompanyPayments
          { label: 'Clientes', content: <CompanyClients /> },
          { label: 'Ordenes', content: <CompanyOrders /> },
          { label: 'Unidades', content: <CompanyItems /> },
          { label: 'Staff', content: <CompanyStaff /> },
          { label: 'Cortes', content: <CompanyBalances /> },
          { label: 'Tienda', content: <CompanyStore /> }
        ]}
      />
    </div>
  )
}

export default validatePermissions(CompanyAdmin, 'ADMIN')
