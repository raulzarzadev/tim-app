'use client'

import Select from './Select'
import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import AppIcon from './AppIcon'
import { useAuthContext } from '@/context/authContext'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { StaffPermissionLabels, areaIcon } from '@/types/staff'
import { StaffPermission } from '@/types/staff'
import { CompanyType } from '@/types/company'
import ModalConfirm from './ModalConfirm'

const UserCompanies = () => {
  const { companies, selected, setSelected, currentCompany } =
    useUserCompaniesContext()

  if (companies.length === 0) {
    return <p>Aun no tienes una empresa.</p>
  }
  return (
    <div className="py-4">
      <Typography variant="h5">Empresas</Typography>
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
      {/* <div className="flex w-full justify-end my-2">
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
      </Typography> */}
      {/* <CompanyAccess /> */}
    </div>
  )
}

const CompanyCard = ({ company }: { company: CompanyType }) => {
  const { setSelected, currentCompany } = useUserCompaniesContext()

  const isSelected = company.id === currentCompany?.id

  return (
    <div className=" bg-blue-200 rounded-md p-2 shadow-md flex justify-evenly items-center">
      <Typography variant="h6">{company.name}</Typography>
      {isSelected ? (
        <ModalConfirm label={'Salir '} handleConfirm={() => setSelected('')}>
          Salir de esta empresa
        </ModalConfirm>
      ) : (
        <ModalConfirm
          label={'Entrar'}
          handleConfirm={() => setSelected(company.id)}
        >
          Entrar a esta empresa
        </ModalConfirm>
      )}
    </div>
  )
}

const CompanyAccess = () => {
  const { currentCompany } = useUserCompaniesContext()
  const { user } = useAuthContext()
  const userPermissions =
    currentCompany?.staff?.find((staff) => staff?.email === user?.email)
      ?.permissions || {}
  //* avoid that the owner delete there own admin permission
  userPermissions.ADMIN = currentCompany?.userId === user?.id
  return (
    <div>
      <Typography className="text-xl font-bold my-2">Areas</Typography>
      <Grid2 container spacing={2}>
        {Object.entries(userPermissions)
          .sort()
          .map(([key, value]) =>
            value ? (
              <Grid2 key={key} xs={6} sm={4} md={3} lg={2}>
                <Area
                  area={key as StaffPermission}
                  href={`/dashboard/${currentCompany?.id}/${key}`}
                />
              </Grid2>
            ) : null
          )}
      </Grid2>
    </div>
  )
}

const Area = ({ area, href }: { area: StaffPermission; href: string }) => {
  return (
    <Link href={href}>
      <button
        className="p-1 w-full aspect-square rounded-md shadow-md bg-blue-100 hover:bg-blue-200 flex flex-col justify-center items-center"

        // onClick={(e) => {
        //   e.preventDefault()
        //   e.stopPropagation()
        // }}
      >
        <AppIcon icon={areaIcon[area]} />
        {StaffPermissionLabels[area]}
      </button>
    </Link>
  )
}

export default UserCompanies
