import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { PaginatedData } from '@/types/datatable';
import { ArrowLeft01FreeIcons, ArrowLeftDoubleIcon, ArrowRight01Icon, ArrowRightDoubleFreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Table } from '@tanstack/react-table';
import { Fragment } from 'react';

interface TableFooterProps<TData> {
    table: Table<TData>;
    data: PaginatedData<TData>;
    perPage?: string;
    handleChangePerPage: (value: string) => void | '';
}

export default function TableFooter<TData>({ table, data, perPage, handleChangePerPage }: TableFooterProps<TData>) {
    return (
        <>
            {data.meta && (
                <Fragment>
                    <div className="flex w-full items-center justify-between gap-2">
                        <div className="left-section flex items-center justify-around gap-2 md:flex-1 md:justify-start">
                            <button
                                className={cn(
                                    'border-light-subtle cursor-pointer rounded border bg-white p-1',
                                    data.meta.current_page == 1 ? 'bg-gray-100' : '',
                                )}
                                onClick={() => table.setPageIndex(0)}
                                disabled={data.meta.current_page == 1}
                            >
                                {<HugeiconsIcon icon={ArrowLeftDoubleIcon} size={16} />}
                            </button>
                            <button
                                className={cn(
                                    'border-light-subtle cursor-pointer rounded border bg-white p-1',
                                    data.meta.current_page == 1 ? 'bg-gray-100' : '',
                                )}
                                onClick={() => table.setPageIndex(data.meta.current_page - 1)}
                                disabled={data.meta.current_page === 1}
                            >
                                <HugeiconsIcon icon={ArrowLeft01FreeIcons} size={16} />
                            </button>
                            <button
                                className={cn(
                                    'border-light-subtle cursor-pointer rounded border bg-white p-1',
                                    data.meta.current_page === data.meta.last_page ? 'bg-gray-100' : '',
                                )}
                                onClick={() => table.setPageIndex(Number(data.meta.current_page) + 1)}
                                disabled={data.meta.current_page === data.meta.last_page}
                            >
                                {<HugeiconsIcon icon={ArrowRight01Icon} size={16} />}
                            </button>
                            <button
                                className={cn(
                                    'border-light-subtle cursor-pointer rounded border bg-white p-1',
                                    data.meta.current_page === data.meta.last_page ? 'bg-gray-100' : '',
                                )}
                                onClick={() => table.setPageIndex(data.meta.last_page)}
                                disabled={data.meta.current_page === data.meta.last_page}
                            >
                                <HugeiconsIcon icon={ArrowRightDoubleFreeIcons} size={16} />
                            </button>
                            <div className="hidden items-center gap-1 text-sm font-medium text-slate-800 md:flex">
                                <span className={'text-sm font-semibold'}>{data.meta.current_page}</span>
                                dari
                                <span className={'text-sm font-semibold'}>{data.meta.last_page}</span>
                                Halaman
                            </div>
                            <div className="hidden items-center gap-1 text-sm font-medium text-slate-800 md:inline-flex">
                                <span>| Ke Halaman:</span>
                                <div>
                                    <Input
                                        min={1}
                                        max={data.meta.last_page}
                                        type="text"
                                        defaultValue={table.getState().pagination.pageIndex + 1}
                                        onChange={(e) => {
                                            table.setPageIndex(parseFloat(e.target.value));
                                        }}
                                        className="h-7 w-14 text-center focus-visible:ring-0"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="right-section">
                            <div className="hidden items-center gap-2 md:flex">
                                <div className="page-info flex gap-1 text-sm text-slate-700 shadow-none">
                                    Menampilkan <strong>{data.meta.from}</strong> dari <strong>{data.meta.to}</strong> Data
                                </div>
                                <div>
                                    <Select defaultValue={perPage} onValueChange={(value) => handleChangePerPage(value)}>
                                        <SelectTrigger className={'h-7 w-full focus-visible:ring-0'}>
                                            <SelectValue placeholder={'Set Perpage'}></SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {['10', '15', '25', '50', '100', '200', '500'].map((pageSize) => (
                                                <SelectItem value={pageSize} key={pageSize}>
                                                    {pageSize} Baris
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex md:hidden">Total {data.meta.total} Data</div>
                        </div>
                    </div>
                </Fragment>
            )}
        </>
    );
}
