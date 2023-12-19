'use client'
import NotCompanyYet from '../NotCompanyYet'
import CompanyPublicDetails from '../CompanyPublicDetails'
import ShopActions from '../ShopActions'
import { Skeleton } from '@mui/material'
import ShopDashboard from '../ShopDashboard'
import { useUserShopContext } from '@/context/userShopContext'

const MyShop = () => {
  const { userShop } = useUserShopContext()
  if (userShop === undefined)
    return (
      <div>
        <div
          className="grid gap-3 place-items-center"
          test-id="shop-view-skeleton"
        >
          <Skeleton
            variant="circular"
            className=""
            width={64}
            height={64}
          ></Skeleton>
          <Skeleton width={220} height={64} variant="rectangular"></Skeleton>
        </div>

        <Skeleton
          variant="rectangular"
          width={'100%'}
          height={64}
          className="mt-6"
        ></Skeleton>
        <div className="mt-6">
          <Skeleton
            variant="rectangular"
            width={'100%'}
            height={400}
          ></Skeleton>
        </div>
      </div>
    )

  return (
    <div className=" mx-auto" test-id="shop-view">
      {!userShop && <NotCompanyYet />}
      {userShop && (
        <>
          <CompanyPublicDetails company={userShop} />
          <ShopActions shopId={userShop.id} shop={userShop} />
          <div className="mt-6">
            <ShopDashboard shop={userShop} />
          </div>
        </>
      )}
    </div>
  )
}

export default MyShop
