import UserShops from '@/components/ShopDashboard/UserShops'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <UserShops />
      <div className="mx-auto my-10 p-2">{children}</div>
    </>
  )
}

export default layout
