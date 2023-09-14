'use client'

import Select from './Select'
import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import AppIcon from './AppIcon'
import { useAuthContext } from '@/context/authContext'

const UserCompanies = () => {
  const { companies, selected, setSelected, currentCompany } =
    useUserCompaniesContext()

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
      <div className="flex w-full  ">
        <Select
          fullWidth
          selected={selected}
          label="Empresas"
          onSelect={(value) => setSelected(value)}
          options={companies.map((company) => ({
            value: company?.id,
            label: company?.name
          }))}
        />

        <Button LinkComponent={Link} href={`/new-company/${selected}`}>
          <AppIcon icon="edit" />
        </Button>
      </div>
      <Typography className="text-center my-4" component={'p'}>
        {currentCompany?.description}
      </Typography>
      <CompanyAccess />
    </div>
  )
}

const CompanyAccess = () => {
  const { currentCompany } = useUserCompaniesContext()
  const { user } = useAuthContext()
  const userPermissions =
    currentCompany?.staff?.find((staff) => staff?.email === user?.email)
      ?.permissions || {}

  return (
    <div>
      <Typography>Permisos</Typography>
      {Object.entries(userPermissions).map(([key, value]) =>
        value ? (
          <Button
            key={key}
            LinkComponent={Link}
            href={`/dashboard/${currentCompany?.id}/${key}`}
          >
            {key}
          </Button>
        ) : null
      )}
    </div>
  )
}

export default UserCompanies
