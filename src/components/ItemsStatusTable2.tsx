import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import ErrorBoundary from './ErrorBoundary'
import ItemInUseRow from './ItemInUserRow2'
import { ItemOrder } from '@/context/userCompaniesContext2'

const ItemsStatusTable = ({ items }: { items: ItemOrder[] }) => {
  return (
    <Grid2 container className="text-center">
      <Grid2 xs={4} className="font-bold truncate">
        Cliente
      </Grid2>
      <Grid2 xs={2} className="font-bold truncate">
        Item
      </Grid2>
      <Grid2 xs={2} className="font-bold truncate">
        Asigando
      </Grid2>
      <Grid2 xs={4} className="font-bold truncate">
        Status
      </Grid2>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        {items?.map((item, i) => (
          <ItemInUseRow key={i} item={item} />
        ))}
      </ErrorBoundary>
    </Grid2>
  )
}

export default ItemsStatusTable
