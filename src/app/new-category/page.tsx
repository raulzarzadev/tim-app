import CategoryForm from '@/components/CategoryForm'
import { Container, Typography } from '@mui/material'

const Page = () => {
  return (
    <Container>
      <Typography
        component={'h2'}
        className="text-center text-xl font-bold my-4"
      >
        Nueva categoria
      </Typography>
      <CategoryForm />
    </Container>
  )
}

export default Page
