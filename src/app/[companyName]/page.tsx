'use client'

import { ContactsList } from '@/components/ModalContactClient'
import { findCompanyByName, getCompany } from '@/firebase/companies'
import { CategoryType } from '@/types/category'
import { CompanyType } from '@/types/company'
import { Avatar, Typography } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Page = (props: { params: { companyName: string } }) => {
  const companyName = decodeURIComponent(props.params.companyName)
  const [company, setCompany] = useState<undefined | null | CompanyType>(
    undefined
  )
  useEffect(() => {
    findCompanyByName(companyName)
      .then((res) => setCompany(res[0] || null))
      .catch(console.error)
  }, [companyName])

  if (company === undefined) return <div>Buscando empresa</div>

  if (company === null) return <div>No encontramos esta empresa</div>

  return (
    <div className="text-center flex flex-col">
      <Typography
        variant="h4"
        className="text-center mt-20 relative flex mx-auto"
      >
        <span className="z-10">{company?.name}</span>
        <Avatar
          src={company?.image}
          className="absolute -top-16 left-[50%] -translate-x-1/2  z-0"
          sx={{ width: 96, height: 96 }}
        ></Avatar>
      </Typography>
      <Typography>{company?.description}</Typography>
      <ContactsList phone={company?.phone} />

      <div>
        <Typography>Productos en renta</Typography>
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2"> */}
        <div className="flex justify-evenly flex-wrap ">
          {company?.categories?.map((category) => (
            <div className="my-2" key={category.name}>
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const CategoryCard = ({ category }: { category: CategoryType }) => {
  return (
    <div
      // style={{ backgroundImage: `url(${category.image})` }}
      className="w-44 aspect-square  relative  rounded-md shadow-md"
    >
      <div className="relative flex flex-col h-full justify-end bg-gradient-to-t from-slate-900 to-transparent p-2 rounded-md text-white  ">
        <Typography className="text-white" variant="h5">
          {category.name}
        </Typography>
        <Typography variant="caption">{category.description}</Typography>
        <Image
          src={category.image || '/images/icons/icon-384x384.png'}
          alt={category.name}
          fill
          className="object-contain rounded-md opacity-25 hover:opacity-90 transition-all duration-500 hover:scale-105"
        />
      </div>
    </div>
  )
}

export default Page
