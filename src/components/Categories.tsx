import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import Category from './Category'

const Categories = () => {
  const { currentCompany } = useUserCompaniesContext()
  return (
    <Grid2 container spacing={2}>
      {currentCompany?.categories?.map((category) => (
        <Grid2
          key={category.name}
          xs={6}
          sm={4}
          md={3}
          lg={2}
          alignSelf={'stretch'}
        >
          <Category categoryName={category.name} />
        </Grid2>
      ))}
    </Grid2>
  )
}

export default Categories
