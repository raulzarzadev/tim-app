'use client'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import NotCompanyYet from '../NotCompanyYet'
import CompanyPublicDetails from '../CompanyPublicDetails'
import CompanyActions from '../CompanyActions'
import { Button, Skeleton } from '@mui/material'
import AppIcon from '../AppIcon'
import ItemsTabs from '../ItemsTabs'
import Link from 'next/link'

const MyShop = () => {
  const { userShop } = useUserCompaniesContext()
  if (userShop === undefined)
    return (
      <div className="max-w-md mx-auto">
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
    <div>
      {!userShop && <NotCompanyYet />}
      {userShop && (
        <>
          <CompanyPublicDetails company={userShop} />
          <CompanyActions company={userShop} />
          <div className="mt-6">
            <div className="flex justify-evenly">
              <Button
                endIcon={<AppIcon icon="add" />}
                variant="contained"
                LinkComponent={Link}
                href="/my-shop/new-item"
              >
                Item
              </Button>
            </div>
            <ItemsTabs
              hiddenActions
              categories={userShop?.categories || []}
              items={userShop?.articles || []}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default MyShop
