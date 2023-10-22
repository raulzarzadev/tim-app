import { useUserCompaniesContext } from '@/context/userCompaniesContext2'

const StaffSpan = ({ email }: { email: string }) => {
  const { currentCompany } = useUserCompaniesContext()
  return (
    <span>
      {currentCompany?.staff?.find((s) => s.email === email)?.name || email}
    </span>
  )
}

export default StaffSpan
