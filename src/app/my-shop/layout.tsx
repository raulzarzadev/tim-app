'use client'
import AppIcon from '@/components/AppIcon'
import Modal from '@/components/Modal'
import NotCompanyYet from '@/components/NotCompanyYet'
import ShopActions from '@/components/ShopActions'
import { ShopDashboardSkeleton } from '@/components/ShopDashboard'
import UserShops from '@/components/ShopDashboard/UserShops'
import { useUserShopContext } from '@/context/userShopContext'
import useModal from '@/hooks/useModal'
import { CompanyType } from '@/types/company'
import { IconButton } from '@mui/material'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { userShop } = useUserShopContext()
  if (userShop === null) return <NotCompanyYet />
  if (userShop === undefined) return <ShopDashboardSkeleton />
  return (
    <>
      <div className="flex justify-end">
        <UserShops />
        <ModalShopConfig shop={userShop} />
      </div>
      <div className="mx-auto  p-2">{children}</div>
    </>
  )
}

const ModalShopConfig = ({ shop }: { shop: Partial<CompanyType> }) => {
  const modal = useModal({ title: `Opciones de ${shop?.name}` })

  return (
    <>
      <IconButton onClick={modal.onOpen} test-id="shop-settings">
        <AppIcon icon="settings" />
      </IconButton>
      <Modal {...modal}>
        <ShopActions shop={shop} shopId={shop?.id} />
      </Modal>
    </>
  )
}

export default Layout
