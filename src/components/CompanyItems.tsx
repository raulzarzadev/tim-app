import BasicTabs from './BasicTabs'
import CompanyArticles from './CompanyArticles'
import CompanyCategories from './CompanyCategories'
import ItemsFinished from './ItemsFinished'
import ItemsInUse from './ItemsInUse'
import ItemsPending from './ItemsPending'

const CompanyItems = () => {
  return (
    <div>
      <BasicTabs
        tabs={[
          { label: 'Todas', content: <CompanyArticles /> },
          { label: 'Categorias', content: <CompanyCategories /> },
          { label: 'Pendientes', content: <ItemsPending /> },
          { label: 'En uso', content: <ItemsInUse /> },
          { label: 'Terminados', content: <ItemsFinished /> }
        ]}
      />
    </div>
  )
}

export default CompanyItems
