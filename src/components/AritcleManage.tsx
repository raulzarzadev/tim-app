import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { removeArticle } from '@/firebase/articles'
import { Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import ModalConfirm from './ModalConfirm'
import Link from 'next/link'
import { ArticleType } from '@/types/article'

const ArticleManage = ({ article }: { article?: ArticleType }) => {
  const router = useRouter()
  const { currentCompany } = useUserCompaniesContext()
  const handleDelete = async () => {
    if (!currentCompany?.id || !article?.id)
      return console.error('no company or article id')
    return await removeArticle(currentCompany?.id, article?.id).then((res) => {
      router.back()
    })
  }
  return (
    <div className="flex justify-evenly my-4">
      <Button
        size="small"
        LinkComponent={Link}
        href={`/dashboard/${currentCompany?.id}/articles/${article?.id}/edit`}
      >
        Editar
      </Button>

      <ModalConfirm label="Eliminar" color="error" handleConfirm={handleDelete}>
        <Typography className="text-center">
          ¿Desas eliminar el siguiente articlulo?
        </Typography>
        <Typography className="font-bold text-center">
          {article?.name}
        </Typography>
      </ModalConfirm>
    </div>
  )
}

export default ArticleManage
