import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import ErrorBoundary from './ErrorBoundary'
import ItemInUseRow from './ItemInUserRow2'
import asDate from '@/lib/asDate'
import { Container } from '@mui/material'
import { ItemOrder } from '@/context/userCompaniesContext2'

const ItemsStatusTable = ({ items }: { items: ItemOrder[] }) => {
  const sortByFinishRent = (a: ItemOrder, b: ItemOrder) => {
    if (!a.rentFinishAt && !b.rentFinishAt) return 0
    return (
      (asDate(b.rentFinishAt)?.getTime() || 0) -
      (asDate(a.rentFinishAt)?.getTime() || 0)
    )
  }

  return (
    <Container>
      <Grid2 container spacing={1}>
        <Grid2 xs={2} className="font-bold truncate">
          Cliente
        </Grid2>
        <Grid2 xs={1} className="font-bold truncate">
          Serie
        </Grid2>
        <Grid2 xs={2} className="font-bold truncate">
          Categoria
        </Grid2>
        <Grid2 xs={1} className="font-bold truncate">
          Tiempo
        </Grid2>
        <Grid2 xs={2} className="font-bold truncate">
          Comienza
        </Grid2>
        <Grid2 xs={2} className="font-bold truncate">
          Termina
        </Grid2>
        <Grid2 xs={2} className="font-bold truncate">
          Status
        </Grid2>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          {items?.sort(sortByFinishRent).map((item, i) => (
            <ItemInUseRow key={i} item={item} />
          ))}
        </ErrorBoundary>
      </Grid2>
    </Container>
  )
}

export default ItemsStatusTable
