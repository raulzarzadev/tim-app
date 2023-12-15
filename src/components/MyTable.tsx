import { get } from 'lodash'
import { ReactNode, useEffect, useState } from 'react'
import ErrorBoundary from './ErrorBoundary'
import { Typography } from '@mui/material'
import Modal from './Modal'
import useModal from '@/hooks/useModal'
import SearchInput from './SearchInput'

export type MyTableHeader = {
  key: string
  label: string
  value?: (value: any) => string
  format?: (value: any) => ReactNode
}
export type MyTableHeaders = MyTableHeader[]
export type MyTableData = {
  headers: MyTableHeaders
  body: any[]
}

export type MyTableProps = {
  data: MyTableData
  onRowClick?: (id: string) => void
  title?: string
  search?: boolean
  modalChildren?: (value: any) => ReactNode
  modalTitle?: string
}

const MyTable = ({
  data,
  onRowClick,
  title,
  search,
  modalChildren,
  modalTitle = 'Detalles de elemento'
}: MyTableProps) => {
  const [filteredData, setFilteredData] = useState<MyTableData['body']>(
    data.body || []
  )

  useEffect(() => {
    setFilteredData(data.body || [])
  }, [data.body])

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
      data?.body?.filter(
        ({ id } = {}) => !!res?.find((res) => res?.id === id)
      ) || []
    )
  }

  const modal = useModal({ title: modalTitle })
  const [rowSelected, setRowSelected] = useState<any>()
  return (
    <>
      {modalChildren && <Modal {...modal}>{modalChildren(rowSelected)}</Modal>}
      {search && (
        <SearchInput
          handleSetSearch={handleSearch}
          placeholder="Buscar en esta tabla"
        />
      )}
      <div className="overflow-x-auto">
        {title && <Typography variant="h6">{title}</Typography>}

        <ErrorBoundary componentName={`MyTable ${title}`}>
          <table className="w-full text-center max-w-full ">
            <thead>
              <tr>
                {data.headers.map((h, i) => (
                  <th key={`${h.key}-${i}`} className="whitespace-pre">
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((b, i) => (
                <tr
                  key={b?.id || i}
                  className={`${
                    onRowClick || modalChildren
                      ? ' hover:bg-slate-200 cursor-pointer '
                      : ''
                  } `}
                  onClick={() => {
                    onRowClick?.(b.id)
                    if (modalChildren) {
                      modal.onOpen()
                      setRowSelected(b)
                    }
                  }}
                >
                  {data.headers.map((h, i) => (
                    <td key={`${h.key}-${i}`} className="">
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

export default MyTable
