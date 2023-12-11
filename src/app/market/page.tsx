'use client'
import { MarketGridContext } from '@/components/MarketGrid'
import SearchInput from '@/components/SearchInput'
import { ItemTagType } from '@/components/TagsInput'
import useMarketContext, { MarketProvider } from '@/context/marketContext'
import { Button, Chip, Stack } from '@mui/material'

const Page = () => {
  return (
    <div>
      <MarketProvider>
        <div className="p-2">
          <ChipsTags />
        </div>
        <div className="p-2">
          <MarketGridContext />
        </div>
      </MarketProvider>
    </div>
  )
}

const ChipsTags = () => {
  const { items, onFilterTag, filterBy, onFilterItems } = useMarketContext()
  const handleFilterBy = (label: string) => {
    onFilterTag?.(label)
  }
  const tags: ItemTagType[] = items.reduce(
    (acc, curr) => {
      curr?.tags?.forEach((t) => {
        const alreadyIn = acc.find((a) => a?.title === t.title)
        if (alreadyIn) return
        acc.push(t)
      })
      return acc
    },
    [{ title: 'Todos' }] as ItemTagType[]
  )

  return (
    <div>
      <div className=" ">
        <SearchInput
          placeholder={filterBy || 'Buscar'}
          handleSetSearch={(value) => {
            onFilterItems?.(value)
          }}
        />
      </div>
      <div className=" overflow-x-auto py-2 pb-4 ">
        <Stack direction="row" className="justify-start gap-2 ">
          {tags.map((t) => (
            <Chip
              color={
                filterBy?.toLowerCase() === t.title?.toLocaleLowerCase()
                  ? 'primary'
                  : 'default'
              }
              key={t.title}
              label={t.title}
              component={Button}
              onClick={(e) => {
                handleFilterBy(t.title)
              }}
            />
          ))}
        </Stack>
      </div>
    </div>
  )
}

export default Page
