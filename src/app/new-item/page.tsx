import ArticleForm from '@/components/ArticleForm'
import { Container, Typography } from '@mui/material'

const Page = () => {
  return (
    <>
      <Typography className="text-center text-xl font-bold my-4">
        Crear articulo
      </Typography>
      <Container className="max-w-md mx-auto">
        <ArticleForm />
      </Container>
    </>
  )
}

export default Page
