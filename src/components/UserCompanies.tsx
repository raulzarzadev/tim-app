'use client'

import Select from './Select'
import { Button } from '@mui/material'
import Link from 'next/link'
import { useUserCompaniesContext } from '@/context/userCompaniesContext'

const UserCompanies = () => {
  const { companies, selected, setSelected } = useUserCompaniesContext()

  if (companies.length === 0) {
    return <p>Aun no tienes una empresa.</p>
  }
  return (
    <div className="py-4">
      <div className="flex w-full justify-end my-2">
        <Button LinkComponent={Link} href="/new-company">
          Nueva empresa
        </Button>
      </div>
      <Select
        selected={selected}
        label="Empresas"
        onSelect={(value) => setSelected(value)}
        options={companies.map((company) => ({
          value: company?.id,
          label: company?.name
        }))}
      />
    </div>
  )
}

export default UserCompanies
