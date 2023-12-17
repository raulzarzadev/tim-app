import { Order } from '@/types/order'
import { Box, Typography } from '@mui/material'
import ModalItemDetails from './ModalItemDetails'
import CurrencySpan from './CurrencySpan'

const ItemChanges = ({ changes }: { changes: Order['changes'] }) => {
  return (
    <div className="mb-4">
      {changes?.length === 0 && (
        <Typography className="">No hay cambios</Typography>
      )}
      {!!changes?.length && (
        <>
          <Typography className="font-bold text-center mt-4">
            Cambios de orden
          </Typography>
          <Box className="grid max-w-xs mx-auto  ">
            {changes?.map((change, i) => (
              <Box
                key={i}
                className="grid grid-cols-4 items-center place-content-center text-center"
              >
                <Box className="col-span-2 ">
                  <ModalItemDetails
                    itemId={change.oldItemId}
                    hiddenCurrentStatus
                    showCat
                  />
                  {' -> '}
                  <ModalItemDetails
                    itemId={change.newItemId}
                    hiddenCurrentStatus
                    showCat
                  />{' '}
                </Box>
                <Box>
                  {change.newPrice?.qty}x{change.newPrice?.unit}
                </Box>
                <CurrencySpan quantity={change.amount} />
              </Box>
            ))}
          </Box>
        </>
      )}
    </div>
  )
}

export default ItemChanges
