import { Order } from '@/types/order'
import { Box, Typography } from '@mui/material'
import ModalItemDetails from './ModalItemDetails'
import CurrencySpan from './CurrencySpan'

const ItemChanges = ({ changes }: { changes: Order['changes'] }) => {
  return (
    <div>
      <Typography className="font-bold text-center mt-4">
        Cambios en orden
      </Typography>
      {changes?.length === 0 && (
        <Typography className="mt-4">No hay cambios</Typography>
      )}
      {!!changes?.length && (
        <Box className="grid max-w-xs mx-auto  ">
          {changes?.map((change, i) => (
            <Box
              key={i}
              className="grid grid-cols-2 items-center place-content-center text-center"
            >
              <Box>
                <ModalItemDetails itemId={change.oldItemId} />
                {' -> '}
                <ModalItemDetails itemId={change.newItemId} />{' '}
              </Box>
              <CurrencySpan quantity={change.amount} />
            </Box>
          ))}
        </Box>
      )}
    </div>
  )
}

export default ItemChanges
