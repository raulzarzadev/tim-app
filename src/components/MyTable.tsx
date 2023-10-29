import { get } from 'lodash'
import { ReactNode, useState } from 'react'
import ErrorBoundary from './ErrorBoundary'
import { TextField, Typography } from '@mui/material'

export type MyTableData = {
  headers: {
    key: string
    label: string
    value?: (value: any) => string
    format?: (value: any) => ReactNode
  }[]
  body: any[]
}

export type MyTableProps = {
  data: MyTableData
  onRowClick?: (id: string) => void
  title?: string
  search?: boolean
}

const MyTable = ({ data, onRowClick, title, search }: MyTableProps) => {
  const [filteredData, setFilteredData] = useState<MyTableData['body']>(
    data.body
  )
  console.log({ b: data.body })

  const formattedData = data.body.map((row, i) => {
    let newRow: Record<string, any> = { ...row }
    data.headers.forEach((h) => {
      newRow[h.key as string] =
        h.value?.(get(row, h.key)) ??
        h.format?.(get(row, h.key)) ??
        get(row, h.key)
    })
    return newRow
  })

  const handleSearch = (search: string) => {
    const res = formattedData.filter((item) => {
      const itemContainSearchValue = Object.values(item).filter((value) =>
        value?.toString()?.toLowerCase()?.includes(search.toLowerCase())
      )
      return !!itemContainSearchValue.length
    })
    setFilteredData(
      data?.body?.filter(({ id }) => !!res?.find((res) => res?.id === id)) || []
    )
  }
  console.log({ filteredData })
  return (
    <>
      {search && <SearchInput handleSetSearch={handleSearch} />}
      <div className="overflow-x-auto">
        {title && <Typography variant="h6">{title}</Typography>}

        <ErrorBoundary componentName={`MyTable ${title}`}>
          <table className="w-full text-center max-w-full ">
            <thead>
              <tr>
                {data.headers.map((h) => (
                  <th key={h.key}>{h.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((b, i) => (
                <tr
                  key={b?.id || i}
                  className={`${
                    onRowClick ? ' hover:bg-slate-200 cursor-pointer ' : ''
                  } `}
                  onClick={() => onRowClick?.(b.id)}
                >
                  {data.headers.map((h) => (
                    <td key={h.key} className="">
                      <span className=" ">
                        {h.format
                          ? h.format(get(b, h.key))
                          : get(b, h?.key)?.toString() || '-'}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </ErrorBoundary>
      </div>
    </>
  )
}

const SearchInput = ({
  handleSetSearch
}: {
  handleSetSearch?: (value: string) => void
}) => {
  const [value, setValue] = useState('')

  return (
    <>
      <TextField
        size="small"
        fullWidth
        placeholder="Buscar"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setTimeout(() => {
            handleSetSearch?.(e.target.value)
          }, 300)
        }}
      />
    </>
  )
}

export default MyTable
