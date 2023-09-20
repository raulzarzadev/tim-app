'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { CategoryType } from '@/types/category'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Typography
} from '@mui/material'
import AppIcon from './AppIcon'
import { ArticleType } from '@/types/article'
import ModalArticles from './ModalArticles'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import Checkout from './Checkout2'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export type CashboxContext = {
  articles?: ArticleType['id'][]
  setArticles?: (articles: ArticleType['id'][]) => void
}
export const CashboxContext = createContext<CashboxContext>({})
export const CashboxContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const searchParams = useSearchParams()
  const [articles, setArticles] = useState<ArticleType['id'][]>([])
  useEffect(() => {
    const items = JSON.parse(searchParams.get('items') || '[]')
    setArticles(items.map(({ itemId }: { itemId: string }) => itemId))
  }, [])
  return (
    <CashboxContext.Provider value={{ articles, setArticles }}>
      {children}
    </CashboxContext.Provider>
  )
}
const CompanyCashbox = () => {
  const { currentCompany } = useUserCompaniesContext()
  return (
    <div className="">
      <CashboxContextProvider>
        <Categories />
        <Checkout
          items={currentCompany?.articles}
          categories={currentCompany?.categories}
          // selected={articles}
        />
      </CashboxContextProvider>
    </div>
  )
}

const Categories = () => {
  const { currentCompany } = useUserCompaniesContext()
  return (
    <Grid container spacing={2}>
      {/* className={'grid grid-cols-2 gap-4'} */}
      {currentCompany?.categories?.map((category) => (
        <Grid
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
        </Grid>
      ))}
    </Grid>
  )
}

const Category = ({
  category,
  articles
}: {
  category: CategoryType
  articles: ArticleType[]
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const price = category?.prices?.[0]
  const { articles: ctxArticles, setArticles } = useContext(CashboxContext)
  const handleSetArticles = (articles: string[]) => {
    setArticles?.(articles)
    const params = new URLSearchParams()
    params.set('items', JSON.stringify(articles.map((a) => ({ itemId: a }))))
    router.replace(pathname + '?' + params)
  }
  const categoryArticles = articles.filter((a) => a.category === category.name)
  const categoryItemsSelected =
    ctxArticles?.filter((itemId) =>
      categoryArticles.find(({ id }) => id === itemId)
    ) || []

  const itemsLeft =
    categoryArticles?.filter(
      (article) =>
        !categoryItemsSelected?.find((itemId) => article.id === itemId)
    ) || []

  const handleAddCategoryArticle = (name: string) => {
    // Add a random / *disponible* article
    const validArticles = categoryArticles
      //* already are selected
      .filter(({ id }) => !ctxArticles?.includes(id))
    //.filter((a) => a.status === 'active')
    const randomArticle =
      validArticles[Math.floor(Math.random() * validArticles.length)]
    handleSetArticles([...(ctxArticles || []), randomArticle.id])
  }
  const handleRemoveCategoryArticle = (name: string) => {
    // Remove last category article added
    const lastCatArticles = ctxArticles
      ?.filter(
        (articleId) =>
          articles.find(({ id }) => id == articleId)?.category === name
      )
      .pop()

    handleSetArticles(ctxArticles?.filter((id) => id !== lastCatArticles) || [])
  }

  return (
    <Card className="flex flex-col justify-between h-full">
      <Box className="flex w-full justify-between relative">
        <Typography>Disponibles: {itemsLeft.length}</Typography>
        <ModalArticles
          articles={articles}
          setArticlesSelected={handleSetArticles}
          articlesSelected={ctxArticles}
        />
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

export default validatePermissions(CompanyCashbox, 'CASHBOX')
