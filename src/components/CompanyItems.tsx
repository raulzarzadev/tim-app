import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import BasicTabs from './BasicTabs'
import CompanyArticles from './CompanyArticles'
import CompanyCategories from './CompanyCategories'
import ItemsFinished from './ItemsFinished'
import ItemsInUse from './ItemsInUse'
import ItemsPending from './ItemsPending'
import ItemsTable from './ItemsTable'
import { Button } from '@mui/material'
import AppIcon from './AppIcon'
import Link from 'next/link'

const CompanyItems = () => {
  const { companyItems, currentCompany } = useUserCompaniesContext()
  const categories = currentCompany?.categories
  const takenItems = companyItems.filter((i) => i.rentStatus === 'taken') || []
  const expiredItems =
    companyItems.filter((i) => i.rentStatus === 'expired') || []

  const availableItems =
    companyItems.filter((i) => i.rentStatus === 'available') || []
  return (
    <div>
      <div className="flex justify-evenly">
        <Button
          LinkComponent={Link}
          href="/new-category"
          endIcon={<AppIcon icon="add" />}
        >
          Nueva categoria
        </Button>
        <Button
          LinkComponent={Link}
          href="/new-item"
          endIcon={<AppIcon icon="add" />}
        >
          Nueva unidad
        </Button>
      </div>
      <BasicTabs
        tabs={[
          {
            label: `Todas (${companyItems?.length || 0})`,
            content: <ItemsTable items={companyItems || []} />
          },
          {
            label: `En uso (${takenItems.length || 0})`,
            content: <ItemsTable items={takenItems || []} />
          },
          {
            label: `Vencidas (${expiredItems?.length || 0})`,
            content: <ItemsTable items={expiredItems} />
          },
          {
            label: `Disponibles (${availableItems?.length || 0})`,
            content: <ItemsTable items={availableItems} />
          },
          {
            label: `Por categorias (${categories?.length || 0})`,
            content: <CompanyCategories />
          }
          // { label: 'Pendientes', content: <ItemsPending /> },
          // { label: 'Terminados', content: <ItemsFinished /> },
          // { label: 'Todas', content: <CompanyArticles /> },
          // { label: 'En uso', content: <ItemsInUse /> }
          // { label: 'vencidas', content: <Items /> }
        ]}
      />
    </div>
  )
}

export default CompanyItems
