import { get } from 'lodash'
import { ReactNode } from 'react'

export type MyTableData = {
  headers: { key: string; label: string; format?: (value: any) => ReactNode }[]
  body: any[]
}
const MyTable = ({
  data,
  onRowClick
}: {
  data: MyTableData
  onRowClick?: (id: string) => void
}) => {
  return (
    <table className="w-full text-center max-w-full">
      <thead>
        <tr>
          {data.headers.map((h) => (
            <th key={h.key}>{h.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.body.map((b) => (
          <tr
            key={b?.id}
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
  )
}

export default MyTable
