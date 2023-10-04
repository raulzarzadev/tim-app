'use client'

import { Box, Typography } from '@mui/material'
import { ArticleType } from '@/types/article'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import ArticleDetails from './ArticleDetails'

const ArticlesList = ({ articles }: { articles: ArticleType[] }) => {
  return (
    <Box className="grid sm:grid-cols-2 gap-2">
      {articles?.map((article) => (
        <Article2 key={article?.id} article={article} />
      ))}
    </Box>
  )
}

const Article2 = ({ article }: { article: ArticleType }) => {
  const modal = useModal({ title: 'Detalles de unidad' })
  return (
    <>
      <Modal {...modal}>
        <ArticleDetails article={article} />
      </Modal>
      <Box
        className=" grid grid-cols-4 items-center p-1 shadow-md rounded-md  "
        onClick={(e) => {
          modal.onOpen()
        }}
      >
        <Typography className="col-span-2 truncate">
          {article.category}
        </Typography>
        <Typography className="truncate">
          {article.serialNumber}
          {article.name}
        </Typography>
        <Typography className="truncate">{article.color}</Typography>
      </Box>
    </>
  )
}

export default ArticlesList
