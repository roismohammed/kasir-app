import { AddIcon, MoreHorizontalCircle01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Head, Link, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "~/components/datatable/table";
import DeleteConfirmation from "~/components/delete-confirmation";
import { PageTitle } from "~/components/page-title";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import AppLayout from "~/layouts/app-layout";
import { ProductProps } from "~/types";
import { PaginatedData } from "~/types/datatable";

const ProductPage = () => {
    const { products } = usePage<{ products: PaginatedData<ProductProps> }>().props
    const [confirm,setConfirm] = useState({
        open:false,
        url:'',
    })
    const breadcrumbs = [
        {
            title: 'Beranda',
            url: '/'
        },
        {
            title: 'Products',
            url: '/customers'
        },
    ]
    const columns: ColumnDef<ProductProps>[] = [
        {
            accessorKey: "name",
            header: "Nama",
        },
        {
            accessorKey: "barcode",
            header: "Barcode",
        },
        {
            accessorKey: "category.name",
            header: "Category",
        },
        {
            accessorKey: "unit.name",
            header: "Satuan Unit",
        },
        {
            accessorKey: "price",
            header: "Harga",
        },
        {
            id: "actions",
            header: "Action",
            cell: ({ row }) => {
                const productId = row.original?.id || '';
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
                                <Link href={`/products/${productId}/edit`}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={() =>
                                    setConfirm({
                                        open: true,
                                        url: `/products/${productId}`,
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
            <Head title="Product" />
            <div className="flex justify-between items-center">
                <PageTitle title="Product Item " subtitle="Data untuk mengatur prooducts" />
                <Link href="/products/create">
                    <Button className='flex gap-0'>
                        <HugeiconsIcon icon={AddIcon} className="h-5 w-5 mr-2" />
                        Item Baru</Button>
                </Link>
            </div>
            <DataTable columns={columns} data={products.data} />
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
    );
};

export default ProductPage;
