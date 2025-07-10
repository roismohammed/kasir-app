import { AddIcon, MoreHorizontalCircle01FreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Head, Link, usePage } from "@inertiajs/react"
import { useState } from "react"
import { PageTitle } from "~/components/page-title"
import { Button } from "~/components/ui/button"
import AppLayout from "~/layouts/app-layout"
import { StockInProps } from "~/types"
import { PaginatedData } from "~/types/datatable"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "~/components/datatable/table"
import DeleteConfirmation from "~/components/delete-confirmation"

const IndexStockIn = () => {
    const { stock_in } = usePage<{ stock_in: PaginatedData<StockInProps> }>().props
    console.log(stock_in);

    const [confirm, setConfirm] = useState({
        open: false,
        url: '',
    })
    const breadcrumbs = [
        {
            title: 'Beranda',
            url: '/'
        },
        {
            title: 'Stock In',
            url: '/stock-in'
        },
    ]

    const columns: ColumnDef<StockInProps>[] = [
        {
            accessorKey: "products.barcode",
            header: "Barcode",
        },
        {
            accessorKey: "products.name",
            header: "Nama",
        },
        // {
        //     accessorKey: "unit.name",
        //     header: "Satuan Unit",
        // },
        // {
        //     accessorKey: "date",
        //     header: "Tanggal",
        //     cell: ({ getValue }) => {
        //         const date = new Date(getValue<string>('Date'));
        //         return date.toLocaleDateString('id-ID', {
        //             year: 'numeric',
        //             month: 'long',
        //             day: 'numeric',
        //         });
        //     },
        // },
        {
            accessorKey: "quantity",
            header: "Stock",
        },
        {
            accessorKey: "products.price",
            header: "Harga",
        },
        {
            id: "actions",
            header: "Action",
            cell: ({ row }) => {
                const stockIn = row.original?.id || '';
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                                size="icon"
                            >
                                <HugeiconsIcon icon={MoreHorizontalCircle01FreeIcons} />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem>
                                <Link href={`/stock-in/${stockIn}/edit`}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={() =>
                                    setConfirm({
                                        open: true,
                                        url: `/stock-in/${stockIn}`,
                                    })
                                }
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title=" Stock In" />
            <div className="flex items-center justify-between">
                <PageTitle title="Data Stock In" subtitle=" data stock in" />
                <Link href="/stock-in/create" >
                    <Button> <HugeiconsIcon icon={AddIcon} className="h-5 w-5 " />StockIn Baru</Button>
                </Link>
            </div>
            <DataTable columns={columns} data={stock_in.data} />
            <DeleteConfirmation
                url={confirm.url}
                open={confirm.open}
                handleClose={() =>
                    setConfirm({
                        open: false,
                        url: '',
                    })
                }
            />
        </AppLayout>
    )
}

export default IndexStockIn
