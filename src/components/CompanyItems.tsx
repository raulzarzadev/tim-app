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
          { label: 'Pendientes', content: <ItemsPending /> },
          { label: 'En uso', content: <ItemsInUse /> },
          { label: 'Terminados', content: <ItemsFinished /> },
          { label: 'Categorias', content: <CompanyCategories /> },
          { label: 'Todas', content: <CompanyArticles /> }
        ]}
      />
    </div>
  )
}

export default CompanyItems
