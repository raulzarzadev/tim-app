import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { CategoryType } from '@/types/category'
import { IconButton, Typography } from '@mui/material'
import AppIcon from './AppIcon'
import Link from 'next/link'
import PricesList from './PricesList'
import CategoryItems from './CategoryItems'
import ModalItemForm from './ModalItemForm'
import AccordionSections from './AccordionSections'

const CategoryDetails = ({ category }: { category?: CategoryType }) => {
  const { currentCompany } = useUserCompaniesContext()
  const categoryItems = currentCompany?.articles?.filter(
    (article) => article.category === category?.name
  )
  if (!currentCompany) return <div>Cargando...</div>
  return (
    <div className="max-w-md mx-auto">
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
      <div className="flex justify-center">
        <ModalItemForm label="Nueva unidad" categoryName={category?.name} />
      </div>
      <Typography className="text-center">{category?.description}</Typography>
      <AccordionSections
        sections={[
          {
            title: 'Precios',
            subTitle: `(${category?.prices?.length || 0})`,
            content: <PricesList prices={category?.prices || []} />
          },
          {
            title: 'Articulos',
            subTitle: `(${categoryItems?.length || 0})`,
            content: <CategoryItems categoryName={category?.name || ''} />
          }
        ]}
      />
      {/* <Typography variant="h5" className="mt-4">
        Precios
      </Typography>
      <PricesList prices={category?.prices || []} />
      <Typography variant="h5" className="mt-4">
        Unidades <span className="">({categoryItems?.length || 0})</span>
      </Typography>

      {/* <ArticlesList articles={articles || []} companyId={currentCompany?.id} /> */}
      {/* <CategoryItems categoryName={category?.name || ''} />  */}
    </div>
  )
}

export default CategoryDetails
