import { AddIcon, Delete02Icon, EditIcon, MoreHorizontalCircle01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Head, Link, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { log } from "node:console";
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
    const [confirm, setConfirm] = useState({
        open: false,
        url: '',
    })
    console.log(products);


    const rupiah = (number: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }
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
            accessorKey: "image",
            header: "Gambar",
            cell: ({ row }) => {
                const image = row.original.image
                const name = row.original.name

                return (
                    <div className="flex items-center gap-2">
                        <img
                            src={'/storage/products/' + image}
                            className="h-12 w-12 object-cover rounded-md"
                            alt={name}
                        />
                    </div>
                )
            }
        },
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
            accessorKey: "stock",
            header: "Stock",
        },
        {
            accessorFn: (row) => rupiah(row.price),
            header: "Harga",
        },
        {
            id: "actions",
            header: "Action",
            cell: ({ row }) => {
                const productId = row.original?.id || '';
                return (
                    <div className="flex gap-2">
                        <Link href={`/products/${productId}/edit`}>
                            <Button
                                variant={'outline'}
                                size="xs"
                            >
                                <HugeiconsIcon icon={EditIcon} size={14} />
                            </Button>
                        </Link>
                        <Button
                            size="xs"
                            variant="destructive"
                            className="text-white"
                            onClick={() =>
                                setConfirm({
                                    open: true,
                                    url: `/products/${productId}`,
                                })
                            }
                        >
                            <HugeiconsIcon icon={Delete02Icon} size={14} />
                        </Button>
                    </div>
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
                        Product Baru</Button>
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
