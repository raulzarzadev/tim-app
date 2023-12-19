'use client'
import Select from '../Select'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'

const UserShops = () => {
  const { userCompanies, companySelected, setCompanySelected, handleSetShop } =
    useUserCompaniesContext()

  return (
    <div className="py-4">
      <div className="flex w-full  ">
        <Select
          fullWidth
          selected={companySelected}
          label="Cambiar de tienda"
          onSelect={(value) => {
            setCompanySelected(value)
            handleSetShop?.(value)
          }}
          options={userCompanies.map((company) => ({
            value: company?.id,
            label: company?.name
          }))}
        />
      </div>
    </div>
  )
}

export default UserShops
