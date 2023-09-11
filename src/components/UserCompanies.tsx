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
      <Select
        selected={selected}
        label="Empresas"
        onSelect={(value) => setSelected(value)}
        options={companies.map((company) => ({
          value: company?.id,
          label: company?.name
        }))}
      />
      <div className="flex w-full justify-center">
        <Button LinkComponent={Link} href="/new-company">
          Crear empresa
        </Button>
      </div>
    </div>
  )
}

export default UserCompanies
