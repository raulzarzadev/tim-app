'use client'
import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { IconButton, Typography } from '@mui/material'
import AppIcon from './AppIcon'
import Link from 'next/link'
import ArticlesList from './ArticlesList'

const CompanyArticles = () => {
  const { currentCompany } = useUserCompaniesContext()
  if (!currentCompany) return <div>Cargando...</div>
  return (
    <div>
      <Typography className="text-start font-bold text-lg" component={'h2'}>
        Articulos{' '}
        <IconButton
          color="success"
          LinkComponent={Link}
          href={`/dashboard/${currentCompany.id}/articles/new`}
        >
          <AppIcon icon="add" />
        </IconButton>
      </Typography>
      <ArticlesList articles={currentCompany.articles || []} />
    </div>
  )
}

export default CompanyArticles
