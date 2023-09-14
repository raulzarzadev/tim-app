'use client'
import validatePermissions from "@/HOC's/validatePermissions"
import {
  useCompanyArticles,
  useCompanyCategories,
  useUserCompaniesContext
} from '@/context/userCompaniesContext'
import { CategoryType } from '@/types/category'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  TextField,
  Typography
} from '@mui/material'
import AppIcon from './AppIcon'
import { ArticleType } from '@/types/article'
import ModalArticles from './ModalArticles'
import Select from './Select'
import { createContext, useContext, useEffect, useState } from 'react'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import ButtonNumber from './ButtonNumber'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

export type CashboxContext = {
  articles?: ArticleType['id'][]
  setArticles?: (articles: ArticleType['id'][]) => void
}
export const CashboxContext = createContext<CashboxContext>({})

const CompanyCashbox = () => {
  const [articles, setArticles] = useState<ArticleType['id'][]>([])
  return (
    <div className="">
      <CashboxContext.Provider value={{ articles, setArticles }}>
        <Categories />
        <Checkout2 />
      </CashboxContext.Provider>
    </div>
  )
}

const Checkout = () => {
  const total = 0
  const { articles } = useContext(CashboxContext)

  return (
    <div className="sticky bottom-12 bg-blue-300  w-full mt-4 p-1 ">
      <Box className="grid grid-cols-3 items-center gap-2">
        <TextField
          variant="outlined"
          fullWidth
          label="Cantidad"
          type="number"
        />
        <Select
          variant="outlined"
          fullWidth
          label="Tiempo"
          options={[
            { label: 'Hora', value: 'hour' },
            { label: 'Dia', value: 'day' }
          ]}
        />
        <Box className="grid gap-2 text-center">
          <Typography>
            Articulos: {articles?.length || 0} <AppIcon icon="eye" />
          </Typography>
          <Typography>Total: ${total.toFixed(2)}</Typography>
          <Button>Pagar</Button>
        </Box>
      </Box>
    </div>
  )
}

const Checkout2 = () => {
  const { articles } = useContext(CashboxContext)
  const { currentCompany } = useUserCompaniesContext()
  const companyArticles = currentCompany?.articles
  const companyCategories = currentCompany?.categories
  const [total, setTotal] = useState(0)
  const modal = useModal({ title: 'Checkout' })
  const [payment, setPayment] = useState({
    qty: 1,
    unit: 'hour'
  })

  const itemsDetails =
    articles?.map((articleId) => {
      const fullArt = companyArticles?.find(
        (article) => article.id === articleId
      )
      if (!fullArt) return null
      if (fullArt?.ownPrice) return fullArt
      const categoryPrice =
        companyCategories?.find(
          (category) => category.name === fullArt.category
        )?.prices || []
      return { ...fullArt, prices: categoryPrice }
    }) || []

  if (articles?.length === 0) return null

  return (
    <Box className="flex w-full justify-between sticky bottom-12 bg-blue-300 mt-4 p-1 ">
      <Modal {...modal}>
        <ItemsList items={itemsDetails} />
        <Typography className="text-end">Total: ${total.toFixed(2)}</Typography>
        <Grid2
          className="my-4"
          container
          alignContent={'center'}
          alignItems={'center'}
          justifyItems={'center'}
          justifyContent={'center'}
          spacing={2}
        >
          <Grid2>
            <ButtonNumber
              name="cantidad"
              min={1}
              max={10}
              defaultValue={payment.qty}
              onChange={(value) => setPayment({ ...payment, qty: value })}
            />
          </Grid2>
          <Grid2>
            <Select
              variant="outlined"
              label="Tiempo"
              options={[
                { label: 'Hora', value: 'hour' },
                { label: 'Dia', value: 'day' },
                { label: 'Semana', value: 'week' },
                { label: 'Mes', value: 'month' }
              ]}
              selected={payment.unit}
              onSelect={(value) => setPayment({ ...payment, unit: value })}
            />
          </Grid2>
          <Grid2>
            <Button size="large" variant="outlined" color="secondary">
              Pagar
            </Button>
          </Grid2>
        </Grid2>
      </Modal>

      <Typography>
        Articulos: {articles?.length || 0} <AppIcon icon="eye" />
      </Typography>
      <Typography>Total: ${total.toFixed(2)}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => modal.onOpen()}
      >
        Checkout
      </Button>
    </Box>
  )
}
const ItemsList = ({ items }: { items: (ArticleType | null)[] }) => {
  console.log({ items })
  return (
    <div>
      {items.map((item, i) =>
        item ? (
          <Box key={item?.id} className={'grid grid-cols-3'}>
            <Typography>{item?.category}</Typography>
            <Typography>{item?.serialNumber || item?.name}</Typography>
            <Box></Box>
          </Box>
        ) : (
          <Typography key={i}>{`Articulo no encontrado`}</Typography>
        )
      )}
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
  const price = category?.prices?.[0]
  const { articles: ctxArticles, setArticles } = useContext(CashboxContext)
  const handleSetArticles = (articles: string[]) => {
    setArticles?.(articles)
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
          {category.name}
          <span className="font-bold text-2xl ">
            {' '}
            x {categoryItemsSelected?.length}
          </span>
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
