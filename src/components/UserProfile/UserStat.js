import React from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper()
const columns = [

    columnHelper.accessor(row => row.w, {
        id: 'w',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Поб.</span>,
    }),
    columnHelper.accessor(row => row.l, {
        id: 'l',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Пор.</span>,
    }),
    columnHelper.accessor(row => row.d, {
        id: 'd',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Ничьи</span>,
    }),
    columnHelper.accessor(row => row.all, {
        id: 'all',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Всего</span>,
    }),
    columnHelper.accessor(row => row.percent, {
        id: 'percent',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>%</span>,
    }),
    columnHelper.accessor(row => row.scores, {
        id: 'scores',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Мячей</span>,
    }),
]

function UserStat({ stat }) {
    let { w, d, l } = stat

    stat.all = Number(w + d + l)
    stat.percent = stat.all > 0 ? Math.round((w / stat.all) * 100) : 0

    // eslint-disable-next-line
    const [data, setData] = React.useState(() => [stat])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <table>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            <tfoot>
                {table.getFooterGroups().map(footerGroup => (
                    <tr key={footerGroup.id}>
                        {footerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.footer,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
            </tfoot>
        </table>
    )
}

export default UserStat