import { useState } from 'react'
import { Head, router, useForm, usePage } from '@inertiajs/react';
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
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '~/components/ui/dialog'
import DeleteConfirmation from '~/components/delete-confirmation';
import { PaginatedData } from '~/types/datatable';
import TextInput from '~/components/form/text-input';
import TextareaInput from '~/components/form/textarea-input';
import SelectInput from '~/components/form/select-input';
import { MoreHorizontalCircle01FreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';

const IndexCustomers = () => {
    const { customers } = usePage<{ customers: PaginatedData<CustomersProps> }>().props
    const [confirm, setConfirm] = useState({ open: false, url: '' })
    const [modal, setModal] = useState<{ open: boolean; customer?: CustomersProps }>({ open: false })

    const form = useForm({
        _method: 'POST' as 'POST' | 'PUT',
        name: '',
        phone: '',
        address: '',
        gender: '',
    })

    const openCreate = () => {
        form.setData({ _method: 'POST', name: '', phone: '', address: '', gender: '' })
        setModal({ open: true })
    }

    const openEdit = (customer: CustomersProps) => {
        form.setData({
            _method: 'PUT',
            name: customer.name || '',
            phone: customer.phone || '',
            address: customer.address || '',
            gender: customer.gender || '',
        })
        setModal({ open: true, customer })
    }

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        const isEdit = form.data._method === 'PUT'
        const url = isEdit ? `/customers/${modal.customer?.id}` : '/customers'

        const opts = {
            onSuccess: () => {
                toast.success(isEdit ? 'Pelanggan diperbarui' : 'Pelanggan ditambahkan')
                setModal({ open: false })
                router.reload()
            },
            onError: (err: any) => toast.error(Object.values(err).flat().join('. ')),
        }

        if (isEdit) {
            router.put(url, form.data, opts)
        } else {
            form.post(url, opts)
        }
    }

    const breadcrumbs = [
        { title: 'Beranda', url: '/' },
        { title: 'Pelanggan', url: '/customers' },
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
            cell: ({ row }) => row.original.gender === 'male' ? 'Laki-laki' : 'Perempuan',
        },
        {
            id: "actions",
            header: "Aksi",
            cell: ({ row }) => {
                const customer = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
                                <HugeiconsIcon icon={MoreHorizontalCircle01FreeIcons} />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem onClick={() => openEdit(customer)}>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onClick={() => setConfirm({ open: true, url: `/customers/${customer.id}` })}>
                                Hapus
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pelanggan" />
            <div className="flex justify-between items-center">
                <PageTitle title="Pelanggan" subtitle="Data pelanggan" />
                <Button onClick={openCreate} className="flex gap-2">
                    <Plus className="w-4 h-4" />
                    Pelanggan Baru
                </Button>
            </div>

            <DataTable data={customers.data} columns={columns} />

            {/* Modal Create / Edit */}
            <Dialog open={modal.open} onOpenChange={(open) => !open && setModal({ open: false })}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{modal.customer ? 'Edit Pelanggan' : 'Tambah Pelanggan'}</DialogTitle>
                        <DialogDescription>
                            {modal.customer ? 'Ubah data pelanggan' : 'Lengkapi data pelanggan baru'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit} className="space-y-4">
                        <TextInput
                            label="Nama Pelanggan"
                            placeholder="Masukan nama pelanggan"
                            value={form.data.name}
                            onChange={(e) => form.setData("name", e.target.value)}
                            error={form.errors.name}
                        />
                        <SelectInput
                            label="Jenis Kelamin"
                            options={[
                                { value: "male", label: "Laki-laki" },
                                { value: "female", label: "Perempuan" }
                            ]}
                            value={form.data.gender}
                            onSelect={(value) => form.setData("gender", value)}
                            placeholder="Pilih jenis kelamin"
                            errors={form.errors.gender}
                        />
                        <TextInput
                            label="Nomor Telepon"
                            placeholder="Masukan nomor telepon"
                            value={form.data.phone}
                            onChange={(e) => form.setData("phone", e.currentTarget.value)}
                            error={form.errors.phone}
                        />
                        <TextareaInput
                            label="Alamat"
                            placeholder="Masukan alamat pelanggan"
                            value={form.data.address}
                            onChange={(e) => form.setData("address", e.currentTarget.value)}
                            error={form.errors.address}
                        />
                        <div className="flex justify-end gap-2 pt-2">
                            <Button variant="outline" type="button" onClick={() => setModal({ open: false })}>
                                Batal
                            </Button>
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

export default IndexCustomers;
