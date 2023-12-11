'use client'
import MarketGrid, { MarketGridContext } from '@/components/MarketGrid'
import { MarketProvider } from '@/context/marketContext'
import { Chip, Stack, TextField } from '@mui/material'

const Page = () => {
  return (
    <div>
      <MarketProvider>
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
        <div className="p-2">
          <MarketGridContext
          // items={items.map((i) => ({
          //   //@ts-ignore
          //   companyId: i.companyId,
          //   id: i.id || '',
          //   img: i.image || '',
          //   size: 'sm',
          //   title: `${i.category}`
          // }))}
          />
        </div>
      </MarketProvider>

      {/* <div className="flex justify-center flex-wrap my-4 ">
        {companies.map((company) => (
          <div key={company.id} className="m-2">
            <CompanyMarketCard company={company} />
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default Page
