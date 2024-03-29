'use client'

import Select from './Select'
import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import AppIcon from './AppIcon'
import { useAuthContext } from '@/context/authContext'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { StaffPermissionLabels, areaIcon } from '@/types/staff'
import { StaffPermission } from '@/types/staff'
import ErrorBoundary from './ErrorBoundary'

const UserCompanies = () => {
  const { user } = useAuthContext()
  const { userCompanies, companySelected, setCompanySelected, currentCompany } =
    useUserCompaniesContext()

  if (!user) return <div>Cargando...</div>
  if (user && !userCompanies.length) {
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
          selected={companySelected}
          label="Empresas"
          onSelect={(value) => setCompanySelected(value)}
          options={userCompanies.map((company) => ({
            value: company?.id,
            label: company?.name
          }))}
        />

        <Button LinkComponent={Link} href={`/new-company/${companySelected}`}>
          <AppIcon icon="edit" />
        </Button>
      </div>
      <Typography className="text-center my-4" component={'p'}>
        {currentCompany?.description}
      </Typography>
      <ErrorBoundary componentName={'Campany access'}>
        <CompanyAccess />
      </ErrorBoundary>
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
      <Typography className="text-xl font-bold my-2">Areas</Typography>
      <Grid2 container spacing={2}>
        {Object.entries(userPermissions)
          .sort()
          .map(([key, value]) =>
            value ? (
              <Grid2 key={key} xs={6} sm={4} md={3} lg={2}>
                <ErrorBoundary componentName={key}>
                  <Area
                    area={key as StaffPermission}
                    href={`/dashboard/${currentCompany?.id}/${key}`}
                  />
                </ErrorBoundary>
              </Grid2>
            ) : null
          )}
      </Grid2>
    </div>
  )
}

const Area = ({ area, href }: { area: StaffPermission; href: string }) => {
  return (
    <Button
      href={href}
      LinkComponent={Link}
      className="w-full aspect-square"
      variant="contained"
      color="info"
    >
      <span
        className=" flex flex-col justify-center items-center"

        // onClick={(e) => {
        //   e.preventDefault()
        //   e.stopPropagation()
        // }}
      >
        <AppIcon icon={areaIcon[area]} />
        {StaffPermissionLabels[area]}
      </span>
    </Button>
  )
}

export default UserCompanies
