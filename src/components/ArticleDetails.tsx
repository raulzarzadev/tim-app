import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { ArticleType } from '@/types/article'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import ModalConfirm from './ModalConfirm'
import { removeArticle } from '@/firebase/articles'
import { useRouter } from 'next/navigation'

const ArticleDetails = ({ article }: { article: ArticleType }) => {
  const router = useRouter()
  const { currentCompany, setUserCompanies } = useUserCompaniesContext()
  const handleDelete = async () => {
    if (!currentCompany?.id) return console.error('no company id')
    return await removeArticle(currentCompany?.id, article.id).then((res) => {
      setUserCompanies()
      router.back()
    })
  }
  return (
    <Box className="my-4 text-center">
      {article.category && (
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {article.category}
        </Typography>
      )}

      <Typography variant="h5" component="h2" className="font-bold">
        {article.serialNumber}
        {article.name && (
          <span className="font-bold opacity-50 text-sm">{article.name}</span>
        )}
      </Typography>

      {article.color && (
        <Typography sx={{ mb: 0.5 }} color="text.secondary">
          {article.color}
        </Typography>
      )}

      <Button
        size="small"
        LinkComponent={Link}
        href={`/dashboard/${currentCompany?.id}/articles/${article.id}/edit`}
      >
        Editar
      </Button>

      <ModalConfirm label="Eliminar" color="error" handleConfirm={handleDelete}>
        <Typography className="text-center">
          ¿Desas eliminar el siguiente articlulo?
        </Typography>
        <Typography className="font-bold text-center">
          {article.name}
        </Typography>
      </ModalConfirm>
    </Box>
  )
}

export default ArticleDetails
