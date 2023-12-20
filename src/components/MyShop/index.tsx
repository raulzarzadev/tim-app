'use client'
import NotCompanyYet from '../NotCompanyYet'
import ShopDashboard, { ShopDashboardSkeleton } from '../ShopDashboard'
import { useUserShopContext } from '@/context/userShopContext'

const MyShop = () => {
  const { userShop } = useUserShopContext()
  if (userShop === null) return <NotCompanyYet />
  if (userShop === undefined) return <ShopDashboardSkeleton />
  return <ShopDashboard shop={userShop} />
}

export default MyShop
