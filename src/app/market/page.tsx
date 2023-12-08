'use client'
import CompanyMarketCard from '@/components/CompanyMarketCard'
import { getVisibleCompanies } from '@/firebase/companies'
import { CompanyType } from '@/types/company'
import { Chip, Stack, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Page = () => {
  const [companies, setCompanies] = useState<CompanyType[]>([])
  useEffect(() => {
    getVisibleCompanies()
      .then((res) => {
        setCompanies(res || [])
      })
      .catch(console.error)
  }, [])
  return (
    <div>
      {/* <div className="text-center mt-2">
        <Typography variant="h4">Mercado</Typography>
        <Typography color={'text.primary'}>
          Aquí encontraras todas las tiendas y algunos de sus productos que
          ofrecen
        </Typography>
      </div> */}
      <div className="p-2">
        <div className=" ">
          <TextField label="Buscar" fullWidth />
        </div>
        <div className=" overflow-x-auto py-2 pb-4 ">
          <Stack direction="row" className="justify-start gap-2 ">
            <Chip label="Bicis"></Chip>
            <Chip label="Trajes"></Chip>
            <Chip label="Lavadoras"></Chip>
            <Chip label="Motos"></Chip>
            <Chip label="Tablas de surf"></Chip>
            <Chip label="Sanboard"></Chip>
            <Chip label="Autos"></Chip>
            <Chip label="scooter"></Chip>
          </Stack>
        </div>
      </div>

      <div className="flex justify-center flex-wrap my-4 ">
        {companies.map((company) => (
          <div key={company.id} className="m-2">
            <CompanyMarketCard company={company} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
