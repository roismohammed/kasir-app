import useTableSorting from '@/components/datatable/use-table-sorting'
import SelectInput from '@/components/form/select-input'
import TextInput from '@/components/form/text-input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Toggle } from '@/components/ui/toggle'
import {
    Cancel01Icon, Configuration01Icon,
    Delete03Icon,
    EditTableIcon,
    FilterAddFreeIcons,
    FilterHorizontalIcon,
    FilterVerticalFreeIcons, PreferenceHorizontalFreeIcons,
    ReloadIcon,
    Search01Icon,
    SlidersVerticalIcon,
    SortByDown02Icon,
    SortByUp02Icon,
    Sorting05Icon, Tablet01FreeIcons,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Column, Table } from '@tanstack/react-table'

import moment from 'moment'
import React from 'react'

type FilterProps<TData> = {
    filterKey: keyof TData;
    placeholder: string;
    type: string;
    startLabel?: string;
    endLabel?: string;
};

interface TableToolbarProps<TData, TValue> {
    table: Table<TData>;
    filters?: FilterProps<TData>;
    handleReset: () => void;
}

type ColumnWithFilterMeta<TData> = Column<TData> & {
    columnDef: {
        header?: string | (() => React.ReactNode) | unknown;
        meta?: {
            filterVariant?: 'multi_select' | 'text' | string;
            filterOptions?: { value: string | number; label: string }[];
        };
    };
};

export default function TableToolbar<TData, TValue>({ table, handleReset }: TableToolbarProps<TData, TValue>) {
    const totalFilterableColumns = table.getHeaderGroups().reduce((acc, headerGroup) => {
        const filterableHeaders = headerGroup.headers.filter((header) => header.column.getCanFilter())
        return acc + filterableHeaders.length
    }, 0)

    const filterApplied = table.getState().columnFilters

    const filteredColumnNames = filterApplied.map((filter) => {
        // Ambil kolom berdasarkan ID filter
        const column = table.getColumn(filter.id) as ColumnWithFilterMeta<TData>

        const filterValue = (() => {
            switch (column?.columnDef.meta?.filterVariant) {
                case 'multi_select':
                    return column.columnDef.meta.filterOptions?.find((option) => String(option.value) === String(filter.value))?.label || ''
                case 'date_range':
                    if (Array.isArray(filter.value)) {
                        return filter.value.map((date) => moment(date).format('DD MMM YY')).join(' - ')
                    }
                    break
                default:
                    return filter.value || ''
            }
            return ''
        })()

        const columnName = (() => {
            switch (typeof column?.columnDef.header) {
                case 'string':
                    return column.columnDef.header
                case 'function':
                    return column?.columnDef.header?.toString() || ''
                default:
                    return ''
            }
        })()

        return {
            columnName,
            columnId: column?.id || '',
            filterValue,
            filterVariant: column?.columnDef.meta?.filterVariant || '',
        }
    })

    const { columnSorted, typeSort, setColumnSorted, setTypeSort } = useTableSorting()

    // Fungsi menerapkan sorting
    const handleSorting = () => {
        if (columnSorted) {
            table.setSorting([{ id: columnSorted, desc: typeSort === 'desc' }])
            // Ubah tipe sorting (toggle antara asc ke desc)
            setTypeSort((prev) => (prev === 'asc' ? 'desc' : 'asc'))
        }
    }

    return (
        <div className={'flex w-full items-center justify-between gap-2 px-0'}>
            <div className="right-section flex items-center gap-1">


                {filteredColumnNames.length > 0 && (
                    <div>
                        <div className="flex flex-wrap gap-2">
                            {filteredColumnNames.map((column) => {
                                return (
                                    <Badge
                                        key={column.columnName}
                                        className="flex h-6 items-center gap-1 rounded-sm border-slate-200 bg-white text-gray-700 shadow-none transition-colors hover:bg-slate-100/20"
                                    >
                                        <HugeiconsIcon icon={FilterHorizontalIcon} size={12}
                                                       className={'text-slate-500'} />
                                        <Label className={'text-xs'}>{column.columnName}</Label>
                                        <Separator orientation={'vertical'} className={'mx-1 bg-slate-200/80'} />
                                        <Label className={'text-xs'}>{String(column.filterValue)}</Label>
                                        <Button
                                            onClick={() => {
                                                const updatedFilters = filterApplied.filter((f) => f.id !== column.columnId)
                                                table.setColumnFilters(updatedFilters)
                                            }}
                                            variant={'ghost'}
                                            className={'ms-1 h-4 px-0 [&_svg]:size-3'}
                                        >
                                            <HugeiconsIcon icon={Cancel01Icon} size={10} className={'text-slate-500'} />
                                        </Button>
                                    </Badge>
                                )
                            })}
                        </div>
                    </div>
                )}

                {totalFilterableColumns > 0 && (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={'ghost'} size={'sm'} className={'h-6 border-slate-200/80 px-1'}>
                                <HugeiconsIcon icon={FilterAddFreeIcons} />
                                Filter
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            onOpenAutoFocus={(e) => e.preventDefault()}
                            className={'min-w-[350px] border-slate-100 shadow-md'}
                            align={'start'}
                        >
                            <h5 className={'text-sm font-semibold'}>Filter Semua Data</h5>
                            <p className={'text-sm font-light text-slate-700'}>Lihat data berdasarkan data yang sudah
                                kamu filter</p>
                            <div className="my-5">
                                {table.getHeaderGroups().map((headerGroup) =>
                                    headerGroup.headers.map((header, index) => {
                                        return header.column.getCanFilter() && header.column.columnDef?.meta?.filterTitle !== undefined ? (
                                            <div className={'my-4'} key={index}>
                                                <Label>{header.column.columnDef.meta?.filterTitle}</Label>
                                                {/*<Filter
                                                    column={header.column}
                                                />*/}
                                            </div>
                                        ) : null
                                    }),
                                )}
                            </div>
                            <div className={'flex justify-end'}>
                                {table.getState().columnFilters.length > 0 && (
                                    <Button
                                        size={'sm'}
                                        variant={'outline'}
                                        onClick={() => {
                                            table.resetColumnFilters()
                                        }}
                                    >
                                        <HugeiconsIcon icon={ReloadIcon} />
                                        Reset
                                    </Button>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>
                )}
            </div>
            <div className="left-section flex gap-2 items-center">
                <div className="flex items-center gap-1">
                    <div className="relative">
                        <DebouncedInput
                            placeholder="Cari data..."
                            className="h-7 w-[150px] lg:w-[200px]"
                            onChange={(value) => table.setGlobalFilter({keyword: String(value)})} value={''} />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <HugeiconsIcon icon={Search01Icon} size={14} className="text-gray-400" />
                        </div>
                    </div>
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            size={'sm'}
                            className="z-0 ml-auto h-6 rounded-sm w-auto gap-1 border-slate-200/80 px-2 select-none focus-visible:ring-0"
                        >
                            <HugeiconsIcon icon={SlidersVerticalIcon} size={14} />
                            <span className={'hidden md:block'}>Tampilan</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        onOpenAutoFocus={(e) => e.preventDefault()}
                        className={'w-[350px] min-w-[350px] rounded-md border-slate-100 p-0 shadow-md'}
                        align="end"
                    >
                        <div className="dropdown-header border-b border-slate-100 p-3">
                            <h5 className={'flex items-center gap-1 px-2 text-sm font-normal capitalize'}>
                                <HugeiconsIcon icon={PreferenceHorizontalFreeIcons} size={12} />
                                Sesuaikan tampilan tabel
                            </h5>
                        </div>
                        <div className="sorting-wrapper grid gap-2 p-3">
                            <div className="grid w-full grid-cols-2 items-center gap-2">
                                <div className="flex items-center gap-1 text-sm">
                                    <HugeiconsIcon icon={Sorting05Icon} size={14} />
                                    <span>Urutkan</span>
                                </div>
                                <div className={'flex items-center gap-1'}>
                                    <Select onValueChange={setColumnSorted}>
                                        <SelectTrigger className="h-7 w-full text-xs shadow-none">
                                            <SelectValue placeholder="Pilih Kolom" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {table.getAllColumns().map((column) => (
                                                    <SelectItem className={'text-xs'} key={column.id} value={column.id}>
                                                        {column.columnDef.header?.toString() || column.id}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        variant="outline"
                                        className="flex h-7 w-7 items-center justify-center gap-1 p-1 shadow-none"
                                        onClick={handleSorting}
                                        disabled={columnSorted === undefined}
                                        aria-label={typeSort === 'asc' ? 'Urutkan berdasarkan kolom terpilih' : 'Urutkan berdasarkan kolom terpilih'}
                                    >
                                        {typeSort === 'asc' ? <HugeiconsIcon icon={SortByDown02Icon} /> :
                                            <HugeiconsIcon icon={SortByUp02Icon} />}
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-2 grid w-full grid-cols-2 items-center justify-between gap-2">
                                <div className="flex flex-col items-start gap-1 text-sm">
                                    <div className="title flex items-center gap-2">
                                        <HugeiconsIcon icon={Delete03Icon} size={14} />
                                        <span>Tampilkan Trash</span>
                                    </div>
                                </div>
                                <div className={'flex justify-end'}>
                                    <Switch />
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div className="page-size-wrapper p-3">
                            <div className="grid w-full grid-cols-2 items-center gap-2">
                                <div className="flex items-center gap-1 text-sm">
                                    <HugeiconsIcon icon={FilterVerticalFreeIcons} size={14} />
                                    <span>Data</span>
                                </div>
                                <div className={'flex items-center gap-1'}>
                                    <Select>
                                        <SelectTrigger className="h-7 w-full text-xs shadow-none">
                                            <SelectValue placeholder="Pilih Data" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem key="this_month" value="this_month" className={'text-xs'}>
                                                    Bulan Ini
                                                </SelectItem>
                                                <SelectItem key="this_year" value="this_year" className={'text-xs'}>
                                                    Tahun Ini
                                                </SelectItem>
                                                <SelectItem key="last_year" value="last_year" className={'text-xs'}>
                                                    Tahun Lalu
                                                </SelectItem>
                                                <SelectItem key="two_years_ago_2" value="two_years_ago"
                                                            className={'text-xs'}>
                                                    2 Tahun Lalu
                                                </SelectItem>
                                                <SelectItem key="two_years_ago_3" value="two_years_ago"
                                                            className={'text-xs'}>
                                                    3 Tahun Lalu
                                                </SelectItem>
                                                <SelectItem key="all" value="all" className={'text-xs'}>
                                                    Semuanya
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div className="colum-visibility-wrapper p-3">
                            <h5 className={'text-sm'}>Pilih kolom</h5>
                            <div className="flex flex-wrap gap-1">
                                <Toggle
                                    size={'sm'}
                                    variant="outline"
                                    className="h-7 cursor-pointer py-1 text-xs capitalize data-[state=on]:bg-white"
                                    aria-label="Pilih semua"
                                    pressed={table.getIsAllColumnsVisible()}
                                    onPressedChange={(value) => table.getToggleAllColumnsVisibilityHandler()(value)}
                                >
                                    Pilih semua
                                </Toggle>
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <Toggle
                                                key={column.id}
                                                variant={column.getIsVisible() ? 'outline' : undefined}
                                                size={'sm'}
                                                className="data-[state=on]:border-slate-150 h-7 cursor-pointer bg-white py-1 text-xs font-normal text-nowrap capitalize shadow-xs data-[state=on]:bg-white data-[state=on]:shadow-xs"
                                                aria-label={`Toggle visibility for ${column.columnDef.header?.toString()}`}
                                                pressed={column.getIsVisible()}
                                                onPressedChange={(value) => column.toggleVisibility(!!value)}
                                            >
                                                {column.columnDef.header?.toString()}
                                            </Toggle>
                                        )
                                    })}
                            </div>
                        </div>
                        <Separator />
                        <div className={'flex items-center justify-end gap-2 px-3 py-2'}>
                            <Button onClick={() => handleReset()} variant={'ghost'} size={'sm'} className={'h-7'}>
                                Reset
                            </Button>
                            <Button variant={'outline'} size={'sm'} className={'h-7'}>
                                Simpan Preferensi
                            </Button>
                        </div>
                        <Separator />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

function Filter({ column }: { column: Column<string> }) {
    const columnFilterValue = column.getFilterValue()
    const { filterVariant } = column.columnDef.meta ?? {}
    return filterVariant === 'number_range' ? (
        <div>
            <div className="flex w-full space-x-2">
                {/* See faceted column filters example for min max values functionality */}
                <DebouncedInput
                    type="number"
                    value={(columnFilterValue as [number, number])?.[0] ?? ''}
                    onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
                    placeholder={`Min`}
                    className="w-24 rounded border shadow-none"
                    name={column.columnDef.id?.toString()}
                />
                <DebouncedInput
                    type="number"
                    value={(columnFilterValue as [number, number])?.[1] ?? ''}
                    onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
                    placeholder={`Max`}
                    className="w-24 rounded border shadow-none"
                    name={column.columnDef.id?.toString()}
                />
            </div>
            <div className="h-1" />
        </div>
    ) : filterVariant === 'date_range' ? (
        <div>
            <div className="flex w-full space-x-2">
                <TextInput
                    type={'date'}
                    value={(columnFilterValue as [string, string])?.[0] ?? ''}
                    onChange={(e) => column.setFilterValue((old: [string, string]) => [e.target.value, old?.[1]])}
                    placeholder={`Min`}
                    className="rounded border shadow-none"
                    name={column.columnDef.id?.toString()}
                />
                <TextInput
                    type={'date'}
                    value={(columnFilterValue as [string, string])?.[1] ?? ''}
                    onChange={(e) => column.setFilterValue((old: [string, string]) => [old?.[0], e.target.value])}
                    placeholder={`Max`}
                    className="rounded border shadow-none"
                    name={column.columnDef.id?.toString()}
                />
            </div>
            <div className="h-1" />
        </div>
    ) : filterVariant === 'select' ? (
        <SelectInput
            variant={'simple'}
            onSelect={(value) => column.setFilterValue(value)}
            value={columnFilterValue?.toString() || ''}
            options={column.columnDef.meta?.filterOptions ?? []}
            name={column.columnDef.id?.toString()}
            placeholder={'Pilih ' + column.columnDef.header?.toString()}
            className={'shadow-none'}
        />
    ) : filterVariant === 'multi_select' ? (
        <SelectInput
            onSelect={(value) => column.setFilterValue(value)}
            value={columnFilterValue?.toString() || ''}
            options={column.columnDef.meta?.filterOptions ?? []}
            name={column.columnDef.id?.toString()}
            placeholder={'Pilih ' + column.columnDef.header?.toString()}
            className={'shadow-none'}
        />
    ) : (
        <DebouncedInput
            className="w-full rounded border shadow-none"
            onChange={(value) => column.setFilterValue(value)}
            placeholder={`Kata Kunci...`}
            type="text"
            value={(columnFilterValue ?? '') as string}
            name={column.columnDef.id?.toString()}
        />
        // See faceted column filters example for datalist search suggestions
    )
}

function DebouncedInput({
                            value: initialValue,
                            onChange,
                            debounce = 500,
                            ...props
                        }: {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = React.useState(initialValue)
    const isFirstRender = React.useRef(true)
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    React.useEffect(() => {
        if (!isFirstRender.current) {
            const timeout = setTimeout(() => onChange(value), debounce)
            return () => clearTimeout(timeout)
        }
        isFirstRender.current = false
    }, [value])
    return <TextInput className={'border shadow-none'} {...props} value={value}
                      onChange={(e) => setValue(e.target.value)} />
}
