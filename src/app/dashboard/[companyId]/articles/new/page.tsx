import ArticleForm from '@/components/ArticleForm'
import { Container, Typography } from '@mui/material'

const Page = () => {
  return (
    <Container>
      <Typography className="text-center text-xl font-bold my-4">
        Crear articulo
      </Typography>
      <ArticleForm />
    </Container>
  )
}

export default Page
