import { useUserCompaniesContext } from '@/context/userCompaniesContext'
import { listenCompanyActivePayments } from '@/firebase/payments'
import { Payment } from '@/types/payment'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

const CompanyPayments = () => {
  const { currentCompany } = useUserCompaniesContext()
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    listenCompanyActivePayments(currentCompany?.id || '', setPayments)
  }, [currentCompany?.id])

  console.log({ payments })
  return (
    <div>
      {payments.map((payment) => (
        <Box key={payment.id} className="p-2 my-2 rounded-md shadow-md">
          {payment.items.map((item) => (
            <p key={item.itemId}>{item.itemId}</p>
          ))}
        </Box>
      ))}
    </div>
  )
}

export default CompanyPayments
