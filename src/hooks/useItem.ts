import { useUserCompaniesContext } from '@/context/userCompaniesContext2'

const useItem = ({ itemId }: { itemId?: string }) => {
  const { currentCompany } = useUserCompaniesContext()
  const item = currentCompany?.articles?.find((item) => item.id === itemId)
  return item
}

export default useItem
