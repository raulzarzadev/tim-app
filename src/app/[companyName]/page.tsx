'use client'

import AppIcon from '@/components/AppIcon'
import CompanyPublicDetails from '@/components/CompanyPublicDetails'
import Modal from '@/components/Modal'
import { ContactsList } from '@/components/ModalContactClient'
import { useUserCompaniesContext } from '@/context/userCompaniesContext2'
import { findCompanyByName, getCompany } from '@/firebase/companies'
import useModal from '@/hooks/useModal'
import asNumber from '@/lib/asNumber'
import { CategoryType } from '@/types/category'
import { CompanyType } from '@/types/company'
import { Avatar, Button, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Page = (props: { params: { companyName: string } }) => {
  const companyName = decodeURIComponent(props.params.companyName)
  const router = useRouter()
  const [company, setCompany] = useState<undefined | null | CompanyType>(
    undefined
  )
  useEffect(() => {
    findCompanyByName(companyName)
      .then((res) => setCompany(res[0] || null))
      .catch(console.error)
  }, [companyName])

  if (company === undefined) return <div>Buscando empresa</div>

  if (company === null)
    return (
      <>
        <div className="text-center my-6">No encontramos esta empresa</div>
        <div className="flex justify-center">
          <Button onClick={() => router.push('/market')}>
            Volver al mercado
          </Button>
        </div>
      </>
    )

  return (
    <div className="text-center flex flex-col">
      <CompanyPublicDetails company={company} />
      <div>
        <Typography>Productos en renta</Typography>
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2"> */}
        <div className="flex justify-evenly flex-wrap ">
          {company?.categories?.map((category) => (
            <div className="my-2" key={category.name}>
              <CategoryCard category={category} company={company} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const CategoryCard = ({
  category,
  company
}: {
  category: CategoryType
  company: CompanyType
}) => {
  const modal = useModal({ title: 'Preguntar por disponibilidad' })
  const [form, setForm] = useState<{ [key: string]: string }>({})
  const handleChange = (field: string, value: string) => {
    setForm((form) => ({ ...form, [field]: value }))
  }
  // Encontre tu negocio en https://bajarent.app. \n
  const askText = `Hola, soy ${form.name || ''}. \n
 ¿Aún tienes ${category.name}?`

  const infoText = `
  
  Dirección: ${form.address || ''}, \n
  Descripción: ${form.description || ''}. \n `
  const text = company.shippingEnabled ? askText + infoText : askText
  const disabled = !!(asNumber(form?.name?.length) < 3)
  return (
    <div
      // style={{ backgroundImage: `url(${category.image})` }}
      className="w-44 aspect-square  relative  rounded-md shadow-md "
    >
      <Modal {...modal}>
        <div className="grid gap-2">
          <TextField
            label="Nombre"
            onChange={(e) => handleChange('name', e.target.value)}
            helperText={disabled && 'Ingresa tu nombre'}
          />
          {company.shippingEnabled && (
            <div>
              <Typography>
                Este negocio cuenta con entregas a domicilio.{' '}
              </Typography>
              <Typography variant="caption">
                Por favor agrega estos datos para faclilitar la entrega.
              </Typography>
              <TextField
                label="Dirección"
                onChange={(e) => handleChange('address', e.target.value)}
              />
              <TextField
                label="Descripción (entre calles, color de casa, etc)"
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>
          )}

          <Button
            disabled={disabled}
            variant="outlined"
            endIcon={<AppIcon color="success" icon="whatsapp" />}
            LinkComponent={Link}
            target="_blank"
            href={`
            https://wa.me/${company?.phone
              ?.replaceAll('+', '')
              .replaceAll(' ', '')}?text=${text}`}
          >
            Preguntar por disponibilidad
          </Button>
        </div>
      </Modal>
      <div className="group  relative flex flex-col h-full justify-end bg-gradient-to-t from-slate-900 to-transparent p-2 rounded-md text-white  ">
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
        {company?.phone && (
          <Button
            className="hidden group-hover:block "
            variant="contained"
            color="success"
            onClick={modal.onOpen}
          >
            Pedir
          </Button>
        )}
      </div>
    </div>
  )
}

export default Page
