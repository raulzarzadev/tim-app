'use client'
import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { Button, IconButton, Typography } from '@mui/material'
import AppIcon from './AppIcon'
import Link from 'next/link'

const CompanyArticles = () => {
  const { currentCompany } = useUserCompaniesContext()
  if (!currentCompany) return <div>Cargando...</div>
  return (
    <div>
      <Typography className="text-center" component={'p'}>
        {currentCompany.description}
      </Typography>
      <Typography className="text-start font-bold text-lg" component={'h2'}>
        Categorias{' '}
        <IconButton color="success" LinkComponent={Link} href={'/new-category'}>
          <AppIcon icon="add" />
        </IconButton>
      </Typography>
      {/* {currentCompany?.categories?.map((category) => (
        
      ))} */}
    </div>
  )
}

export default CompanyArticles
