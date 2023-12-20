'use client'
import { useUserShopContext } from '@/context/userShopContext'
import Select from '../Select'

const UserShops = () => {
  const { handleChangeShop, userShop, userShops } = useUserShopContext()
  return (
    <div className="py-4">
      <div className="flex w-full  ">
        <Select
          fullWidth
          selected={userShop?.id}
          label=""
          onSelect={(value) => {
            handleChangeShop?.(value)
          }}
          options={
            userShops?.map((company) => ({
              value: company?.id,
              label: company?.name
            })) || []
          }
        />
      </div>
    </div>
  )
}

export default UserShops
