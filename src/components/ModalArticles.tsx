'use client'
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
  styled
} from '@mui/material'
import AppIcon from './AppIcon'
import { ArticleType } from '@/types/article'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import { useContext, useEffect, useState } from 'react'
import { CashboxContext } from './CompanyCashbox'
import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import ArticleDetails from './ArticleDetails'

const Item = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const ModalArticles = ({
  articles
}: {
  articles: ArticleType[]
  // articlesSelected?: ArticleType['id'][]
  // setArticlesSelected?: (articles: ArticleType['id'][]) => void
}) => {
  const modal = useModal({ title: 'Unidades' })
  const { addItem, removeItem, items } = useContext(CashboxContext)
  const { itemsInUse } = useUserCompaniesContext()
  const [clickedArticle, setClickedArticle] = useState<ArticleType>()
  const handleClick = (articleId: ArticleType['id']) => {
    setClickedArticle(articles.find((a) => a.id === articleId))
    if (_selected.find(({ itemId }) => itemId === articleId)) {
      removeItem?.(articleId)
      return
    } else {
      addItem?.({ itemId: articleId })
    }
  }

  const [_selected, _setSelected] = useState<{ itemId?: ArticleType['id'] }[]>(
    []
  )
  useEffect(() => {
    _setSelected(items || [])
  }, [items])

  return (
    <div>
      <IconButton size="small" onClick={() => modal.onOpen()}>
        <AppIcon icon="eye" />
      </IconButton>
      <Modal {...modal}>
        <Stack
          direction="row"
          flexWrap={'wrap'}
          className="justify-center gap-2"
        >
          {articles?.map((article) => (
            <Chip
              disabled={
                !!itemsInUse.find(({ itemId }) => itemId === article.id)
              }
              color={
                _selected.find(({ itemId }) => article.id === itemId)
                  ? 'primary'
                  : 'default'
              }
              className="p-1 m-1"
              key={article.id}
              label={`${article.serialNumber || ''} ${article.name || ''}`}
              onClick={() => handleClick(article.id)}
            />
          ))}
        </Stack>
        <Box>
          {clickedArticle ? (
            <>
              <Typography>Descripción</Typography>
              <ArticleDetails article={clickedArticle} />
            </>
          ) : null}
        </Box>
      </Modal>
    </div>
  )
}

export default ModalArticles
