import { useAuthContext } from '@/context/authContext'
import Carrousel from '../Carrousel'
import LoginButton from '../LoginButton'
import CallToActionCard from './CallToActionCard'
import { useRouter } from 'next/navigation'
import { CssBaseline } from '@mui/material'

const Header = () => {
  const { user } = useAuthContext()
  const router = useRouter()
  return (
    <div>
      <CssBaseline />
      <header>
        <Carrousel />
      </header>

      <div className="overflow-x-auto px-4 ">
        <ul className="inline-flex">
          {user === null && (
            <li>
              <LoginButton />
            </li>
          )}
          <li>
            <CallToActionCard
              title="Explora"
              subTitle="renta de todo"
              onClick={() => {
                router.push('/market')
              }}
              label="Explorar"
            />
          </li>
          <li>
            <CallToActionCard
              title="Visita"
              subTitle="la tienda de la semana"
              onClick={() => {
                router.push('/Lavarenta')
              }}
              label="Visita"
            />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
