import { AddIcon, MoreHorizontalCircle01FreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Head, Link, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '~/components/datatable/table';
import { PageTitle } from '~/components/page-title';
import { Button } from '~/components/ui/button';
import AppLayout from '~/layouts/app-layout';
import { CustomersProps } from '~/types';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import DeleteConfirmation from '~/components/delete-confirmation';
import { useState } from 'react';
import { PaginatedData } from '~/types/datatable';

const IndexCustomers = () => {
      const { customers } = usePage<{ customers: PaginatedData<CustomersProps> }>().props
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
            title: 'Customers',
            url: '/customers'
        },
    ]

    const columns: ColumnDef<CustomersProps>[] = [
        {
            accessorKey: "name",
            header: "Nama",
        },
        {
            accessorKey: "phone",
            header: "Nomor Telepon",
        },
        {
            accessorKey: "address",
            header: "Alamat",
        },
        {
            accessorKey: "gender",
            header: "Jenis Kelamin",
        },
        {
            id: "actions",
            header: "Action",
            cell: ({ row }) => {
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
                                <Link href={`/customers/${row.original?.id}/edit`}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={() =>
                                    setConfirm({
                                        open: true,
                                        url: `/customers/${row.original?.id}`,
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
            <Head title="Customers" />
            <div className="flex justify-between items-center">
                <PageTitle title="Customers " subtitle="Data untuk mengatur customers" />
                <Link href="/customers/create">
                    <Button className='flex gap-0'>
                        <HugeiconsIcon icon={AddIcon} className="h-5 w-5 mr-2" />
                        Customers Baru</Button>
                </Link>
            </div>
            <div>
                <DataTable data={customers.data} columns={columns} />
            </div>

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

export default IndexCustomers;
