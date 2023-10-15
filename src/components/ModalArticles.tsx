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
import {
  ItemOrder,
  useUserCompaniesContext
} from '@/context/userCompaniesContext2'
import ArticleDetails from './ArticleDetails'
import useCashboxContext from '@/context/useCompanyCashbox'

const Item = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const ModalArticles = ({ articles }: { articles: ArticleType[] }) => {
  const modal = useModal({ title: 'Unidades' })
  const { addItem, removeItem, itemsSelected } = useCashboxContext()

  const {
    ordersItems: { inUse: itemsTaken }
  } = useUserCompaniesContext()

  const itemsInUse = Array.from(
    new Set([...(itemsSelected || []), ...itemsTaken].map((i) => i.itemId))
  )
  const [clickedArticle, setClickedArticle] = useState<ArticleType>()

  const handleClick = (articleId: ArticleType['id']) => {
    setClickedArticle(articles.find((a) => a.id === articleId))
    const itemFound = itemsSelected?.find(({ itemId }) => itemId === articleId)
    if (itemFound) {
      removeItem?.(articleId)
      return
    } else {
      addItem?.({ itemId: articleId })
    }
  }

  const sortIt = (a: ArticleType, b: ArticleType) => {
    const aSerial = a.serialNumber
    const bSerial = b.serialNumber
    if (!isNaN(parseInt(aSerial)) && !isNaN(parseInt(bSerial))) {
      return parseInt(aSerial) - parseInt(bSerial)
    } else {
      return String(aSerial).localeCompare(String(bSerial))
    }
  }

  return (
    <>
      <IconButton size="small" onClick={() => modal.onOpen()}>
        <AppIcon icon="eye" fontSize="small" />
      </IconButton>
      <Modal {...modal}>
        <Typography className="font-bold mb-2 ">
          Selecciona las unidades que deseas agregar a la orden.
        </Typography>
        <Stack
          direction="row"
          flexWrap={'wrap'}
          className="justify-center gap-2"
        >
          {articles?.sort(sortIt)?.map((article) => (
            <Chip
              sx={{ margin: 4 }}
              disabled={
                !!itemsTaken.find(({ itemId }) => itemId === article.id)
              }
              color={
                itemsSelected?.find(({ itemId }) => article.id === itemId)
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
              {/* FIXME: should pase a item with order or recept a item without order */}
              <ArticleDetails article={clickedArticle as ItemOrder} />
            </>
          ) : null}
        </Box>
      </Modal>
    </>
  )
}

export default ModalArticles
