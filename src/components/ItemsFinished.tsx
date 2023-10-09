import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { Container } from '@mui/material'

import asDate from '@/lib/asDate'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

import ErrorBoundary from './ErrorBoundary'
import ItemInUseRow, { ItemRowStatus } from './ItemInUserRow'

const ItemsFinished = () => {
  const { itemsFinished: itemsInUse } = useUserCompaniesContext()
  console.log({ itemsInUse })
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
        <Grid2 xs={2} className="font-bold truncate">
          Tiempo
        </Grid2>
        <Grid2 xs={3} className="font-bold truncate">
          Entrega
        </Grid2>
        <Grid2 xs={2} className="font-bold truncate">
          Status
        </Grid2>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          {itemsInUse.sort(sortByFinishRent).map((item, i) => (
            <ItemInUseRow key={i} item={item} />
          ))}
        </ErrorBoundary>
      </Grid2>
    </Container>
  )
}

export default ItemsFinished
