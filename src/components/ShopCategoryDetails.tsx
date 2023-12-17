import { CategoryType } from '@/types/category'
import { Typography } from '@mui/material'
import PricesList from './PricesList'
import ModalItemForm from './ModalItemForm'
import AccordionSections from './AccordionSections'
import ItemsTable from './ItemsTable'

const ShopCategoryDetails = ({ category }: { category?: CategoryType }) => {
  return (
    <div className="max-w-md mx-auto">
      <Typography
        component={'h2'}
        className="text-center text-xl font-bold my-4"
      >
        {category?.name}
      </Typography>

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
            subTitle: `(${category?.items?.length || 0})`,
            content: <ItemsTable items={category?.items || []} />
          }
        ]}
      />
    </div>
  )
}

export default ShopCategoryDetails
