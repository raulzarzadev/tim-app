import { Button } from '@mui/material'
import Link from 'next/link'

const Page = () => {
  return (
    <div>
      <div className="text-center my-5">No tienes una empresa aún.</div>
      <div className="flex w-full justify-center">
        <Button LinkComponent={Link} href="/new-company">
          Crear empresa
        </Button>
      </div>
    </div>
  )
}

export default Page
