'use client'

import { Typography } from '@mui/material'
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
  const { companies } = useUserCompaniesContext()

  if (companies.length === 0) {
    return <p>Aun no tienes una empresa.</p>
  }
  return (
    <div className="py-4">
      <Typography variant="h5" className="my-4 text-center">
        Mis empresas
      </Typography>
      <Grid2 container spacing={2}>
        {companies.map((company) => (
          <Grid2 xs={12} key={company.id}>
            <CompanyCard company={company} />
          </Grid2>
        ))}
      </Grid2>
    </div>
  )
}

const CompanyCard = ({ company }: { company: CompanyType }) => {
  const { setSelected, currentCompany } = useUserCompaniesContext()

  const isSelected = company.id === currentCompany?.id

  return (
    <div
      className={`${
        isSelected ? 'bg-blue-300' : 'bg-blue-100'
      } rounded-md p-2 shadow-md grid grid-cols-2 items-center  place-items-center `}
    >
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

export default UserCompanies
