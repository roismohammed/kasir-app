import { useState } from 'react'
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/datatable/table";
import DeleteConfirmation from "~/components/delete-confirmation";
import { PageTitle } from "~/components/page-title";
import { Button } from "~/components/ui/button";
import AppLayout from "~/layouts/app-layout";
import { CategoriesProps, ProductProps, UnitsProps } from "~/types";
import { PaginatedData } from "~/types/datatable";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '~/components/ui/dialog'
import TextInput from '~/components/form/text-input'
import SelectInput from '~/components/form/select-input'
import { Label } from '~/components/ui/label'
import CurrencyInput from 'react-currency-input-field'
import { Upload, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const ProductPage = () => {
    const { products, categories, unit } = usePage<{
      products: PaginatedData<ProductProps>,
      categories: CategoriesProps[],
      unit: UnitsProps[],
    }>().props

    const [confirm, setConfirm] = useState({ open: false, url: '' })
    const [modal, setModal] = useState<{ open: boolean; product?: ProductProps }>({ open: false })

    const form = useForm({
        _method: 'POST' as 'POST' | 'PUT',
        image: '',
        barcode: '',
        name: '',
        price: '',
        category_id: '',
        unit_id: '',
    })

    const rupiah = (number: number) =>
        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(number)

    const openCreate = () => {
        form.setData({ _method: 'POST', image: '', barcode: '', name: '', price: '', category_id: '', unit_id: '' })
        setModal({ open: true })
    }

    const openEdit = (product: ProductProps) => {
        form.setData({
            _method: 'PUT',
            image: product.image || '',
            barcode: product.barcode || '',
            name: product.name || '',
            price: String(product.price || ''),
            category_id: String(product.category_id ?? product.category?.id ?? ''),
            unit_id: String(product.unit_id ?? product.unit?.id ?? ''),
        })
        setModal({ open: true, product })
    }

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        const isEdit = form.data._method === 'PUT'
        const url = isEdit ? `/products/${modal.product?.id}` : '/products'

        const opts = {
            onSuccess: () => {
                toast.success(isEdit ? 'Produk diperbarui' : 'Produk ditambahkan')
                setModal({ open: false })
                router.reload()
            },
            onError: (err: any) => toast.error(Object.values(err).flat().join('. ')),
        }

        if (isEdit) {
            router.put(url, { ...form.data, _method: undefined }, opts)
        } else {
            router.post(url, form.data, opts)
        }
    }

    const breadcrumbs = [
        { title: 'Beranda', url: '/' },
        { title: 'Produk', url: '/products' },
    ]

    const columns: ColumnDef<ProductProps>[] = [
        {
            accessorKey: "image",
            header: "Gambar",
            cell: ({ row }) => (
                <img
                    src={'/storage/products/' + row.original.image}
                    className="h-12 w-12 object-cover rounded-md"
                    alt={row.original.name}
                />
            )
        },
        { accessorKey: "name", header: "Nama" },
        { accessorKey: "barcode", header: "Barcode" },
        { accessorKey: "category.name", header: "Kategori" },
        { accessorKey: "unit.name", header: "Satuan" },
        { accessorKey: "stock", header: "Stok" },
        {
            accessorFn: (row) => rupiah(row.price),
            header: "Harga",
        },
        {
            id: "actions",
            header: "Aksi",
            cell: ({ row }) => {
                const product = row.original
                return (
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openEdit(product)}>
                            <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setConfirm({ open: true, url: `/products/${product.id}` })}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                )
            },
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk" />
            <div className="flex justify-between items-center">
                <PageTitle title="Produk" subtitle="Data produk" />
                <Button onClick={openCreate} className="flex gap-2">
                    <Plus className="w-4 h-4" />
                    Produk Baru
                </Button>
            </div>

            <DataTable columns={columns} data={products.data} />

            {/* Modal Create / Edit */}
            <Dialog open={modal.open} onOpenChange={(open) => !open && setModal({ open: false })}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{modal.product ? 'Edit Produk' : 'Tambah Produk'}</DialogTitle>
                        <DialogDescription>
                            {modal.product ? 'Ubah data produk' : 'Lengkapi data produk baru'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit} className="space-y-4">
                        {/* Image */}
                        <div>
                            <Label className="mb-1.5 block text-sm font-medium">Gambar Produk</Label>
                            <div className="relative w-full h-40 border-2 border-dashed rounded-xl bg-gray-50 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition group">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => form.setData("image", e.target.files?.[0] || form.data.image)}
                                />
                                {form.data.image ? (
                                    typeof form.data.image === "string" ? (
                                        <img src={`/storage/products/${form.data.image}`} className="w-full h-full object-contain rounded-xl p-2" alt="Preview" />
                                    ) : (
                                        <img src={URL.createObjectURL(form.data.image)} className="w-full h-full object-contain rounded-xl p-2" alt="Preview" />
                                    )
                                ) : (
                                    <div className="flex flex-col items-center text-gray-400 group-hover:text-blue-500 transition-colors">
                                        <Upload className="w-8 h-8 mb-2" />
                                        <p className="text-sm font-medium">Upload gambar</p>
                                        <span className="text-xs mt-0.5">PNG, JPG, WebP</span>
                                    </div>
                                )}
                            </div>
                            {form.errors.image && <p className="text-sm text-red-500 mt-1">{form.errors.image}</p>}
                        </div>

                        {/* Barcode + Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <TextInput label="Barcode" placeholder="Masukkan barcode" value={form.data.barcode}
                                onChange={(e) => form.setData("barcode", e.target.value)} error={form.errors.barcode} />
                            <TextInput label="Nama Produk" placeholder="Masukkan nama produk" value={form.data.name}
                                onChange={(e) => form.setData("name", e.target.value)} error={form.errors.name} />
                        </div>

                        {/* Category + Unit */}
                        <div className="grid grid-cols-2 gap-4">
                            <SelectInput label="Kategori" value={form.data.category_id} placeholder="Pilih kategori"
                                onSelect={(v) => form.setData("category_id", v)}
                                options={categories.map((c) => ({ value: String(c.id), label: c.name }))}
                                errors={form.errors.category_id} />
                            <SelectInput label="Satuan" value={form.data.unit_id} placeholder="Pilih satuan"
                                onSelect={(v) => form.setData("unit_id", v)}
                                options={unit.map((u) => ({ value: String(u.id), label: u.name }))}
                                errors={form.errors.unit_id} />
                        </div>

                        {/* Price */}
                        <div>
                            <Label className="mb-1.5 block text-sm font-medium">Harga</Label>
                            <CurrencyInput name="price" placeholder="Masukkan harga" defaultValue={form.data.price}
                                decimalsLimit={2} onValueChange={(v) => form.setData("price", v)} prefix="Rp "
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none" />
                            {form.errors.price && <p className="text-sm text-red-500 mt-1">{form.errors.price}</p>}
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button variant="outline" type="button" onClick={() => setModal({ open: false })}>Batal</Button>
                            <Button type="submit" disabled={form.processing}>
                                {form.processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <DeleteConfirmation
                url={confirm.url}
                open={confirm.open}
                handleClose={() => setConfirm({ open: false, url: '' })}
            />
        </AppLayout>
    )
}

export default ProductPage
