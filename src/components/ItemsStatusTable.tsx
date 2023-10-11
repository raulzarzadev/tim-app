import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import ErrorBoundary from './ErrorBoundary'
import ItemInUseRow, { ItemRowStatus } from './ItemInUserRow'
import asDate from '@/lib/asDate'
import { Container } from '@mui/material'

const ItemsStatusTable = ({ items }: { items: Partial<ItemRowStatus>[] }) => {
  const sortByFinishRent = (
    a: Partial<ItemRowStatus>,
    b: Partial<ItemRowStatus>
  ) => {
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
