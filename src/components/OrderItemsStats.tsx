import { Balance, BalanceData } from '@/types/balance'
import { Order } from '@/types/order'
import { Box, Typography } from '@mui/material'
import ModalItemDetails from './ModalItemDetails'
import CurrencySpan from './CurrencySpan'

const OrderItemsStats = ({
  itemsStats
}: {
  itemsStats: BalanceData['itemsStats']
}) => {
  return (
    <div>
      <table className="w-full text-center">
        <thead>
          <tr>
            <th>
              <Typography>Unidad</Typography>
            </th>
            <th>
              <Typography>Rentas</Typography>
            </th>
            <th>
              <Typography>Horas</Typography>
            </th>
            {/* <th>
              <Typography>$Total</Typography>
            </th> */}
          </tr>
        </thead>
        <tbody>
          {itemsStats?.map((item) => (
            <tr key={item.id}>
              <td>
                <ModalItemDetails
                  itemId={item?.id || ''}
                  showCat
                  hiddenCurrentStatus
                />
              </td>
              <td>{item?.rentTimes}</td>
              <td>
                {item?.hoursInRent} <div></div>
              </td>
              {/* <td>
                <CurrencySpan quantity={item?.raised} />
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderItemsStats
