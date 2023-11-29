'use client'
import CompanyMarketCard from '@/components/CompanyMarketCard'
import { getVisibleCompanies } from '@/firebase/companies'
import { CompanyType } from '@/types/company'
import { Typography } from '@mui/material'
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
      <div className="text-center">
        <Typography variant="h4">Mercado</Typography>
        <Typography color={'text.primary'}>
          Aquí encontraras todas las tiendas y algunos de sus productos que
          ofrecen
        </Typography>
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
