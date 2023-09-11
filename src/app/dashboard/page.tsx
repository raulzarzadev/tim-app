import UserCompanies from '@/components/UserCompanies'
import { getUserCompanies } from '@/firebase/companies'
import { Button } from '@mui/material'
import Link from 'next/link'

const Page = async () => {
  return (
    <div>
      <UserCompanies />
    </div>
  )
}

export default Page
