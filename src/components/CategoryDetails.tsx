import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { CategoryType } from '@/types/category'
import { IconButton, Typography } from '@mui/material'
import AppIcon from './AppIcon'
import Link from 'next/link'
import PricesList from './PricesList'
import CategoryItems from './CategoryItems'
import ModalItemForm from './ModalItemForm'

const CategoryDetails = ({ category }: { category?: CategoryType }) => {
  const { currentCompany } = useUserCompaniesContext()
  if (!currentCompany) return <div>Cargando...</div>
  return (
    <div>
      <Typography
        component={'h2'}
        className="text-center text-xl font-bold my-4"
      >
        {category?.name}{' '}
        <IconButton
          color="info"
          LinkComponent={Link}
          href={`/dashboard/${currentCompany?.id}/categories/${category?.name}/edit`}
        >
          <AppIcon icon="edit"></AppIcon>
        </IconButton>
      </Typography>

      <ModalItemForm label="Nueva unidad" />
      <Typography className="text-center">{category?.description}</Typography>
      <Typography variant="h5">Precios</Typography>
      <PricesList prices={category?.prices || []} />

      {/* <ArticlesList articles={articles || []} companyId={currentCompany?.id} /> */}
      <CategoryItems categoryName={category?.name || ''} />
    </div>
  )
}

export default CategoryDetails
