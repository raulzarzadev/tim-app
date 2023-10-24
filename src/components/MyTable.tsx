import { get } from 'lodash'
import { ReactNode } from 'react'
import ErrorBoundary from './ErrorBoundary'
import { Typography } from '@mui/material'

export type MyTableData = {
  headers: { key: string; label: string; format?: (value: any) => ReactNode }[]
  body: any[]
}

export type MyTableProps = {
  data: MyTableData
  onRowClick?: (id: string) => void
  title?: string
}

const MyTable = ({ data, onRowClick, title }: MyTableProps) => {
  return (
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
            {data.body.map((b, i) => (
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
  )
}

export default MyTable
