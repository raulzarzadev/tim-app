import BasicTabs from './BasicTabs'
import ItemsFinished from './ItemsFinished'
import ItemsInUse from './ItemsInUse'
import ItemsPending from './ItemsPending'

const RentalsTabs = () => {
  return (
    <div>
      <BasicTabs
        tabs={[
          { label: 'Pendientes', content: <ItemsPending /> },
          { label: 'En uso', content: <ItemsInUse /> },
          { label: 'Terminados', content: <ItemsFinished /> }
        ]}
      />
    </div>
  )
}

export default RentalsTabs
