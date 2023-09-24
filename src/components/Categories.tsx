import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { ArticleType } from '@/types/article'
import { CategoryType } from '@/types/category'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Typography
} from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { useContext } from 'react'
import { CashboxContext } from './CompanyCashbox'
import AppIcon from './AppIcon'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

const Categories = () => {
  const { currentCompany } = useUserCompaniesContext()
  return (
    <Grid2 container spacing={2}>
      {currentCompany?.categories?.map((category) => (
        <Grid2
          key={category.name}
          xs={6}
          sm={4}
          md={3}
          lg={2}
          alignSelf={'stretch'}
        >
          <Category
            category={category}
            articles={
              currentCompany.articles?.filter(
                (a) => a.category === category.name
              ) || []
            }
          />
        </Grid2>
      ))}
    </Grid2>
  )
}

const Category = ({
  category,
  articles
}: {
  category: CategoryType
  articles: ArticleType[]
}) => {
  const { items, addItem, removeItem } = useContext(CashboxContext)

  const categoryArticles = articles.filter((a) => a.category === category.name)
  const categoryItemsSelected =
    items?.filter(({ itemId }) =>
      categoryArticles.find(({ id }) => id === itemId)
    ) || []

  const itemsLeft =
    categoryArticles?.filter(
      ({ id }) => !categoryItemsSelected?.find(({ itemId }) => id === itemId)
    ) || []

  const handleAddCategoryArticle = (name: string) => {
    // Add a random / *disponible* article
    const validArticles = categoryArticles
      //* already are selected
      .filter(({ id }) => !items?.find((i) => i.itemId === id))
    const randomArticle =
      validArticles[Math.floor(Math.random() * validArticles.length)]
    const defaultUnit = randomArticle?.prices?.[0]?.unit
    const newItem = { itemId: randomArticle.id, unit: defaultUnit, qty: 1 }
    addItem?.(newItem)
  }
  const handleRemoveCategoryArticle = (name: string) => {
    //* Remove from last category article added
    const lastCatArticles = items
      ?.filter(
        ({ itemId }) =>
          articles.find(({ id }) => id == itemId)?.category === name
      )
      .pop()
    removeItem?.(lastCatArticles?.itemId || '')
  }
  const price = category?.prices?.[0]

  return (
    <Card className="flex flex-col justify-between h-full">
      <Box className="flex w-full justify-between relative">
        <Typography>Disponibles: {itemsLeft.length}</Typography>
        {/* <ModalArticles
          articles={articles}
          setArticlesSelected={handleSetArticles}
          articlesSelected={ctxArticles}
        /> */}
      </Box>
      <CardContent>
        <Typography
          sx={{ fontSize: 20 }}
          color="text.secondary"
          gutterBottom
          className="truncate"
        >
          <span className="font-bold text-2xl ">
            {categoryItemsSelected?.length}x{' '}
          </span>
          {category.name}
        </Typography>

        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
          className="text-center"
        >
          {price ? `${price?.quantity} ${price?.unit} $${price?.price}` : ''}
        </Typography>
      </CardContent>
      <Box>
        <ButtonGroup variant="text" aria-label="text button group" fullWidth>
          <Button
            onClick={() => {
              handleRemoveCategoryArticle(category.name)
            }}
            disabled={categoryItemsSelected?.length <= 0}
          >
            <AppIcon icon="substr" />
          </Button>
          <Button
            onClick={() => {
              handleAddCategoryArticle(category.name)
            }}
            disabled={itemsLeft.length <= 0}
          >
            <AppIcon icon="add" />
          </Button>
        </ButtonGroup>
      </Box>
    </Card>
  )
}

export default Categories
