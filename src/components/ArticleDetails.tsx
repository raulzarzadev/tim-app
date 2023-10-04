import { ArticleType } from '@/types/article'
import { Box, Button, Typography } from '@mui/material'
import PricesList from './PricesList'

const ArticleDetails = ({ article }: { article?: ArticleType }) => {
  return (
    <Box className="my-4 text-center">
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {article?.status}
        {article?.category || ''}
      </Typography>
      <Typography variant="h5" component="div">
        {article?.serialNumber}
        <Typography component={'span'} color="text.secondary">
          {article?.name}
        </Typography>{' '}
      </Typography>
      <Typography sx={{ mb: 0.5 }} color="text.secondary">
        {article?.color}
      </Typography>
      <Box>
        <Typography>
          Origen del precio:
          <span className="font-bold">
            {article?.ownPrice ? 'propio' : ' categoria'}
          </span>
        </Typography>
        {article?.ownPrice && <PricesList prices={article.prices || []} />}
      </Box>
    </Box>
  )
}

export default ArticleDetails
