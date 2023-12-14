import { Button, Typography } from '@mui/material'
import Link from 'next/link'

const NotCompanyYet = () => {
  return (
    <div className="text-center">
      <Typography variant="h4" className="mt-6">
        Rentar es super fácil
      </Typography>

      <ul className="grid gap-6">
        <li>
          <Typography>1. Crea una empresa</Typography>
          <Typography variant="caption">Un nombre para tu negocio</Typography>
        </li>
        <li>
          <Typography>2. Agrega un metodo de contacto</Typography>
          <Typography variant="caption">
            Dirección, whatsapp o pagina web
          </Typography>
        </li>
        <li>
          <Typography>3. Crea un articulo</Typography>
          <Typography variant="caption">¡Todo es rentable!</Typography>
        </li>
        <li>
          <Typography>4.Cobra</Typography>
          <Typography variant="caption">Sin comisiones</Typography>
        </li>
      </ul>
      <Button variant="contained" LinkComponent={Link} href="/start-rents">
        Comienza
      </Button>
    </div>
  )
}

export default NotCompanyYet
