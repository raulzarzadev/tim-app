'use client'
import { ArticleType } from '@/types/article'
import { CategoryType } from '@/types/category'
import { Box, Button, Typography } from '@mui/material'
import Modal from './Modal'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import ButtonNumber from './ButtonNumber'
import Select from './Select'
import AppIcon from './AppIcon'
import useModal from '@/hooks/useModal'
import { useState } from 'react'

const Checkout = ({
  articlesSelected,
  companyCategories,
  companyArticles
}: {
  articlesSelected: ArticleType['id'][]
  companyCategories: CategoryType[]
  companyArticles: ArticleType[]
}) => {
  const [total, setTotal] = useState(0)
  const modal = useModal({ title: 'Checkout' })
  const [payment, setPayment] = useState({
    qty: 0,
    unit: 'hour'
  })

  const itemsDetails =
    articlesSelected?.map((articleId) => {
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
  const validPeriods = itemsDetails
    .map((article) => article?.prices)
    .flat()
    .reduce((acc: string[], curr) => {
      const currentPeriod = `${curr?.quantity}-${curr?.unit}`
      if (acc.includes(currentPeriod)) return acc
      return [...acc, currentPeriod]
    }, [])

  if (articlesSelected?.length === 0) return null

  return (
    <Box className="flex w-full justify-between sticky bottom-12 bg-blue-300 mt-4 p-1 ">
      <Modal {...modal}>
        <ItemsList items={itemsDetails} payment={payment} />
        <Typography className="text-xl font-bold my-4 text-end">
          Total: ${total.toFixed(2)}
        </Typography>
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
              min={0}
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
        Articulos: {articlesSelected?.length || 0} <AppIcon icon="eye" />
      </Typography>
      <Typography className="text-xl font-bold my-4">
        Total: ${total.toFixed(2)}
      </Typography>
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
const ItemsList = ({
  items,
  payment
}: {
  items: (ArticleType | null)[]
  payment: { qty: number; unit: string }
}) => {
  return (
    <div>
      <Box className={'grid grid-cols-3'}>
        <Box>Categoria</Box>
        <Box>No.Serie</Box>
        <Box>Precio</Box>
      </Box>
      {items.map((item, i) =>
        item ? (
          <Box
            key={item?.id}
            className={
              'grid grid-cols-3 items-center place-content-center my-2 shadow-md rounded-md p-2'
            }
          >
            <Typography>{item?.category}</Typography>
            <Typography>{item?.serialNumber || item?.name}</Typography>
            <Box>
              {/* {item?.prices?.map((p, i) => (
                <Typography key={i}>{`${p.quantity}-${p?.unit}: $${
                  Number(p?.price)?.toFixed(2) || 0
                }`}</Typography>
              ))} */}
              {(item.prices?.find((p) => p.unit === payment.unit)?.price || 0) *
                payment.qty}
            </Box>
          </Box>
        ) : (
          <Typography key={i}>{`Articulo no encontrado`}</Typography>
        )
      )}
    </div>
  )
}

export default Checkout
