'use client'
import { getUserCompanies } from '@/firebase/companies'
import { CompanyType } from '@/types/company'
import { useEffect, useState } from 'react'
import Select from './Select'
import { Button } from '@mui/material'
import Link from 'next/link'

const UserCompanies = () => {
  const [companies, setCompanies] = useState<CompanyType[]>([])
  const [selected, setSelected] = useState<CompanyType['id']>()
  useEffect(() => {
    getUserCompanies()
      .then((res) => {
        setCompanies(res || [])
        setSelected(res?.[0]?.id)
      })
      .catch(console.error)
  }, [])
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
          value: company.id,
          label: company.name
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
