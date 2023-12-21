'use client'
import ShopDashboard, { ShopDashboardSkeleton } from '../ShopDashboard'
import { useUserShopContext } from '@/context/userShopContext'

const MyShop = () => {
  const { userShop } = useUserShopContext()
  if (!userShop) return <>Cargando...</>
  return <ShopDashboard shop={userShop} />
}

export default MyShop
