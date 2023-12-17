'use client'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import NotCompanyYet from '../NotCompanyYet'
import CompanyPublicDetails from '../CompanyPublicDetails'
import ShopActions from '../ShopActions'
import { Skeleton } from '@mui/material'
import ItemsTabs from '../ItemsTabs'
import ShopItemsTabs from '../ShopItemsTabs'

const MyShop = () => {
  const { userShop } = useUserCompaniesContext()
  if (userShop === undefined)
    return (
      <div>
        <div className="grid gap-3 place-items-center">
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
    <div className="max-w-lg mx-auto">
      {!userShop && <NotCompanyYet />}
      {userShop && (
        <>
          <CompanyPublicDetails company={userShop} />
          <ShopActions shopId={userShop.id} shop={userShop} />
          <div className="mt-6">
            <ShopItemsTabs
              showItemActions
              hiddenActions
              categories={userShop?.categories || []}
              items={userShop?.items || []}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default MyShop
