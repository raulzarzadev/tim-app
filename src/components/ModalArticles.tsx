'use client'
import { Button, Chip, Grid, IconButton, Stack, styled } from '@mui/material'
import AppIcon from './AppIcon'
import { ArticleType } from '@/types/article'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import { useContext, useEffect, useState } from 'react'
import { CashboxContext } from './CompanyCashbox'

const Item = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const ModalArticles = ({
  articles,
  articlesSelected,
  setArticlesSelected
}: {
  articles: ArticleType[]
  articlesSelected?: ArticleType['id'][]
  setArticlesSelected?: (articles: ArticleType['id'][]) => void
}) => {
  const modal = useModal({ title: 'Unidades' })
  const { addItem, removeItem, items } = useContext(CashboxContext)
  const handleClick = (articleId: ArticleType['id']) => {
    if (_selected.find(({ itemId }) => itemId === articleId)) {
      removeItem?.(articleId)
      return
    } else {
      addItem?.({ itemId: articleId })
    }
    // if (_selected.includes(articleId)) {
    //   const artRemoved = _selected.filter((a) => a !== articleId)
    //  // setArticlesSelected?.(artRemoved)
    //   _setSelected(artRemoved)
    //   return
    // } else {
    //   //setArticlesSelected?.([..._selected, articleId])
    //   _setSelected((prev) => [...prev, articleId])
    // }
  }

  const [_selected, _setSelected] = useState<{ itemId: ArticleType['id'] }[]>(
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
        <Stack direction="row" flexWrap={'wrap'} className="justify-center">
          {articles.map((article) => (
            <Chip
              color={
                _selected.find(({ itemId }) => article.id === itemId)
                  ? 'primary'
                  : 'default'
              }
              className="p-1 m-1"
              key={article.id}
              label={article.serialNumber || article.name}
              onClick={() => handleClick(article.id)}
            />
          ))}
        </Stack>
        {/* <Grid container spacing={2}>
          {articles.map((article) => (
            <Grid key={article.id} item xs={3} sm={2}>
              <Item variant="contained">{article.name}</Item>
            </Grid>
          ))}
        </Grid> */}
      </Modal>
    </div>
  )
}

export default ModalArticles