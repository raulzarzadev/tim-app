'use client'

import { Box, Button, IconButton, Typography } from '@mui/material'
import { ArticleType } from '@/types/article'
import useModal from '@/hooks/useModal'
import Modal from './Modal'
import ArticleDetails from './ArticleDetails'
import AppIcon from './AppIcon'
import Link from 'next/link'

const ArticlesList = ({
  articles,
  companyId
}: {
  articles: ArticleType[]
  companyId: string
}) => {
  return (
    <>
      <Typography className="text-start font-bold text-lg" component={'h2'}>
        Articulos{' '}
        <span className="italic font-normal text-sm">{`(${articles?.length})`}</span>
        <IconButton
          color="success"
          LinkComponent={Link}
          href={`/dashboard/${companyId}/articles/new`}
        >
          <AppIcon icon="add" />
        </IconButton>
      </Typography>
      <Box className="grid sm:grid-cols-2 gap-2">
        {articles?.map((article) => (
          <Article2 key={article?.id} article={article} companyId={companyId} />
        ))}
      </Box>
    </>
  )
}

const Article2 = ({
  article,
  companyId
}: {
  article: ArticleType
  companyId: string
}) => {
  const modal = useModal({ title: 'Detalles de unidad' })
  return (
    <>
      <Modal {...modal}>
        <Box className="flex justify-center">
          <Button
            LinkComponent={Link}
            href={`/dashboard/${companyId}/articles/${article.id}/edit`}
          >
            Editar <AppIcon icon="edit" />
          </Button>
        </Box>
        <ArticleDetails article={article} />
      </Modal>
      <button
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
      </button>
    </>
  )
}

export default ArticlesList
