import TableFooter from '@/components/datatable/footer'
import TableToolbar from '@/components/datatable/toolbar'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { DatatableProps } from '@/types/datatable'
import { HugeiconsProps } from '@hugeicons/react'
import { router, usePage } from '@inertiajs/react'
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowSelectionState,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table'
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import NoDataIllustration from '../../../assets/img/no-data.svg'
import { SharedData } from '@/types'
import { toast } from 'sonner'

declare module '@tanstack/table-core' {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    interface ColumnMeta<TData extends RowData, TValue> {
        align?: 'left' | 'right' | 'center';
        noWrap?: boolean;
        filterVariant?: 'text' | 'date_range' | 'select' | 'number_range' | 'boolean' | 'multi_select' | 'checklist';
        filterTitle?: string;
        filterOptions?: {
            value: string;
            label: string;
        }[];
        columnIcon?: HugeiconsProps['icon']; // Fixed typo: changed 'columIcon' to 'columnIcon'
    }
}

const fallbackData: RowData[] = []
// Define your row data type
type RowData = {
    id: string;
    // other row data fields
};

const Datatable = <TData, TValue>({ data, columns }: DatatableProps<TData>) => {
    const { auth } = usePage<SharedData>().props
    const userId = auth.user.id
    const routeName = route().current()
    const storageKey = `table-params:${userId}:${routeName}`

    // Ambil dari localStorage saat awal
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}')

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(saved.columnFilters || [])

    const [globalFilter, setGlobalFilter] = useState<{
        keyword?: string;
        filterBetween?: Record<string, [string, string]>;
    }>(saved.globalFilter || {})

    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

    const [sorting, setSorting] = React.useState<SortingState>(saved.sorting || [])
    const [loading, setLoading] = useState(false)
    const [perPage, setPerPage] = useState(10) // [10, 25, 50, 100, false]
    const isFirstRender = useRef(true)
    const [{ pageIndex, pageSize }, setPagination] = useState(saved.pagination || { pageIndex: 0, pageSize: 10 })

    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(() => {
        const savedPrefs = localStorage.getItem('userColumnVisibilityPrefs')
        return savedPrefs ? JSON.parse(savedPrefs) : ['id']
    })

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize],
    )

    const table = useReactTable({
        data: data.data ?? fallbackData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualFiltering: true,
        manualSorting: true,
        manualGrouping: true,
        enableRowSelection: true,
        filterFns: {},
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
        onRowSelectionChange: setRowSelection,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        getRowId: (row) => row.id, // Use a unique row identifier
        state: {
            globalFilter: globalFilter,
            pagination,
            columnFilters,
            columnVisibility,
            sorting,
            rowSelection,
        },
    })
    const handleSetPerPage = (value: number) => {
        setPerPage(value)
    }

    const formattedFilters = columnFilters.reduce(
        (acc, filter) => {
            if (filter.id && filter.value !== undefined) {
                acc[filter.id] = String(filter.value)
            }
            return acc
        },
        {} as { [key: string]: string },
    )

    const formattedSorting = sorting.reduce(
        (acc, sort) => {
            acc['orderBy'] = String(sort.id)
            acc['type'] = sort.desc ? 'desc' : 'asc'
            return acc
        },
        {} as { orderBy: string; type: 'asc' | 'desc' },
    )

    const handleResetFilters = () => {
        localStorage.removeItem(storageKey)
        // Reset semua state terkait filter
        setColumnFilters([])
        setSorting([])
        setPagination({ pageIndex: 0, pageSize: 10 })
        setGlobalFilter({ keyword: '' })
        toast.success('Filter berhasil di reset')
    }

    const params: Record<string, string | Record<string, string | [string, string]>> = {
        _method: 'get',
        filter: formattedFilters,
        sort: formattedSorting,
        ...(globalFilter.keyword ? { search: String(globalFilter.keyword) } : {}),
        page: String(pageIndex),
        perPage: String(pageSize),
    }


    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
        } else {
            localStorage.setItem(storageKey, JSON.stringify({
                columnFilters,
                sorting,
                pagination,
            }))
            router.visit(data.meta.path, {
                method: 'post',
                data: { ...params } as Record<string, string>,
                preserveState: true,
                replace: true,
                showProgress: false,
                onStart: () => setLoading(true),
                onSuccess: () => {
                    setLoading(false)
                },
            })
        }
    }, [columnFilters, sorting, pagination, globalFilter])

    useEffect(() => {
        localStorage.setItem('userColumnVisibilityPrefs', JSON.stringify(columnVisibility))
    }, [columnVisibility])

    return (
        <Fragment>
            <div
                className="table-wrapper min-w-full  max-w-[calc(100vw-20rem)] overflow-hidden rounded-md border border-slate-100 shadow-xs">
                <div className="flex w-full items-center px-4 py-3">
                    <TableToolbar table={table} handleReset={handleResetFilters} />
                </div>
                <div className="w-full">
                    <Table>
                        <TableHeader
                            className={
                                'bg-gradient-to-r from-indigo-100/10 to-indigo-50/20 px-6 font-medium text-nowrap text-zinc-900 hover:bg-gradient-to-r hover:from-indigo-100/10 hover:to-indigo-50/20'
                            }
                        >
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                    className={
                                        'group border-slate-100 bg-gradient-to-r from-indigo-100/10 to-indigo-50/20 px-6 font-medium text-nowrap text-zinc-900 hover:bg-gradient-to-r hover:from-indigo-100/10 hover:to-indigo-50/20'
                                    }
                                >
                                    <TableHead className={'w-[10px] ps-4'}>
                                        <Checkbox
                                            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                                            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                                            aria-label="Select all"
                                            className={cn(
                                                'invisible cursor-pointer shadow-none group-hover:visible data-[state=checked]:visible data-[state=checked]:border-blue-500/40 data-[state=checked]:bg-blue-500/10 data-[state=checked]:text-blue-500/80 data-[state=indeterminate]:visible data-[state=indeterminate]:text-blue-500',
                                            )}
                                        />
                                    </TableHead>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            className={cn(
                                                'bg-gradient-to-r from-indigo-100/10 to-indigo-50/20 px-6 ps-2 font-medium text-nowrap text-zinc-900 hover:bg-gradient-to-r hover:from-indigo-100/10 hover:to-indigo-50/20',
                                                header.column.columnDef.header == 'Aksi' ? 'text-right' : '',
                                                `text-${header.column.columnDef.meta?.align}`,
                                            )}
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody className={'px-6'}>
                            {loading ? (
                                Array.from({ length: 15 }).map((_, index) => (
                                    <TableRow key={index} className={'h-8 animate-pulse border-slate-100'}>
                                        <TableCell className={'ps-4'} />
                                        {columns.map((column: ColumnDef<TData, TValue>, colIndex: number) => (
                                            <TableCell
                                                key={colIndex}
                                                className={cn(
                                                    'min-h-8 px-6 ps-2 font-normal text-zinc-600',
                                                    column.header === 'Aksi' ? 'text-right' : '',
                                                    `text-${column.meta?.align}`,
                                                    column.meta?.noWrap ? 'text-nowrap' : '',
                                                )}
                                            >
                                                <div className={'h-4 w-3/4 rounded bg-slate-200'}></div>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map((row) => (
                                    <Fragment key={row.id}>
                                        <TableRow key={row.id} className={'group h-8 border-slate-100'}>
                                            <TableCell className={'ps-4'}>
                                                <Checkbox
                                                    checked={row.getIsSelected()}
                                                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                                                    aria-label="Select row"
                                                    className={cn(
                                                        'invisible cursor-pointer shadow-none group-hover:visible data-[state=checked]:visible data-[state=checked]:border-blue-500/40 data-[state=checked]:bg-blue-500/10 data-[state=checked]:text-blue-500/80',
                                                    )}
                                                />
                                            </TableCell>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell
                                                    key={cell.id}
                                                    className={cn(
                                                        'px-6 ps-2 font-normal text-zinc-600',
                                                        cell.column.columnDef.header == 'Aksi' ? 'text-right' : '',
                                                        `text-${cell.column.columnDef.meta?.align}`,
                                                        cell.column.columnDef.meta?.noWrap ? 'text-nowrap' : '',
                                                    )}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </Fragment>
                                ))
                            ) : (
                                <TableRow className={'bg-white hover:bg-white'}>
                                    <TableCell colSpan={columns.length} className={'py-16 text-center'}>
                                        <img src={NoDataIllustration} className={'mx-auto h-52'} alt={'No Data'} />
                                        <h4 className={'text-primary/80 mt-5 text-lg font-semibold'}>Data tidak
                                            ditemukan</h4>
                                        <p className="text-sm font-light text-slate-500">
                                            Silahkan anda tambahkan terlebih dahulu, kemudiah refresh halaman ini
                                            kembali.
                                        </p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <div className={'flex items-center border-t bg-slate-100/20 px-4 py-6'}>
                        <TableFooter
                            data={data}
                            table={table}
                            perPage={perPage.toString()}
                            handleChangePerPage={(value: string) => handleSetPerPage(parseInt(value))}
                        />
                    </div>
                </div>
            </div>
            {Object.keys(rowSelection).length > 0 && (
                <div
                    className={cn(
                        'floating-bottom fixed bottom-5 left-1/2 flex h-10 max-w-sm min-w-sm -translate-x-1/2 transform items-center rounded-lg border-b border-b-slate-200 px-2 shadow-xs transition-transform',
                        'translate-y-0 opacity-100 duration-150',
                    )}
                >
                    <span
                        className={'text-primary rounded-full rounded-md bg-slate-50 px-3 py-1 text-sm font-light shadow-none'}>
                        {Object.keys(rowSelection).length} dipilih
                    </span>
                </div>
            )}
        </Fragment>
    )
}

export default Datatable
