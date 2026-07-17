import { useState } from 'react'
import { PageTitle } from '@/components/page-title'
import { Button } from '@/components/ui/button'
import AppLayout from '@/layouts/app-layout'
import { MoreHorizontalCircle01FreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '~/components/datatable/table'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '~/components/ui/dialog'
import { SupplierProps } from '~/types'
import DeleteConfirmation from '~/components/delete-confirmation'
import { PaginatedData } from '../../types/datatable';
import TextInput from '~/components/form/text-input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { toast } from 'sonner'

const Suppliers = () => {
  const { suppliers } = usePage<{ suppliers: PaginatedData<SupplierProps> }>().props
  const [confirm, setConfirm] = useState({ open: false, url: '' })
  const [modal, setModal] = useState<{ open: boolean; supplier?: SupplierProps }>({ open: false })

  const form = useForm({
    _method: 'POST' as 'POST' | 'PUT',
    name: '',
    phone: '',
    address: '',
    description: '',
  })

  const openCreate = () => {
    form.setData({ _method: 'POST', name: '', phone: '', address: '', description: '' })
    setModal({ open: true })
  }

  const openEdit = (supplier: SupplierProps) => {
    form.setData({
      _method: 'PUT',
      name: supplier.name || '',
      phone: supplier.phone || '',
      address: supplier.address || '',
      description: supplier.description || '',
    })
    setModal({ open: true, supplier })
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const isEdit = form.data._method === 'PUT'
    const url = isEdit ? `/suppliers/${modal.supplier?.id}` : '/suppliers'

    const opts = {
      onSuccess: () => {
        toast.success(isEdit ? 'Supplier diperbarui' : 'Supplier ditambahkan')
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

  const columns: ColumnDef<SupplierProps>[] = [
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
      accessorKey: "description",
      header: "Deskripsi",
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => {
        const supplier = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
                <HugeiconsIcon icon={MoreHorizontalCircle01FreeIcons} />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem onClick={() => openEdit(supplier)}>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setConfirm({ open: true, url: `/suppliers/${supplier.id}` })}
              >
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const breadcrumbs = [
    { title: "Beranda", url: "/suppliers" },
    { title: "Suppliers", url: "/suppliers" },
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Suppliers" />
      <div className="flex justify-between items-center">
        <PageTitle title="Suppliers" subtitle="Data untuk mengatur suppliers" />
        <Button onClick={openCreate}>Tambah Supplier</Button>
      </div>

      <DataTable data={suppliers.data} columns={columns} />

      {/* Modal Create / Edit */}
      <Dialog open={modal.open} onOpenChange={(open) => !open && setModal({ open: false })}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{modal.supplier ? 'Edit Supplier' : 'Tambah Supplier'}</DialogTitle>
            <DialogDescription>
              {modal.supplier ? 'Ubah data supplier' : 'Lengkapi data supplier baru'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <TextInput
              label="Nama Supplier"
              placeholder="Masukan nama supplier"
              value={form.data.name}
              onChange={(e) => form.setData('name', e.target.value)}
              error={form.errors.name}
            />
            <div>
              <Label>Nomor Telepon</Label>
              <TextInput
                className="mt-1"
                value={form.data.phone}
                onChange={(e) => form.setData('phone', e.currentTarget.value)}
                placeholder="Masukan nomor telepon"
                error={form.errors.phone}
              />
            </div>
            <div>
              <Label>Alamat</Label>
              <Textarea
                className="mt-1"
                value={form.data.address}
                onChange={(e) => form.setData('address', e.currentTarget.value)}
                placeholder="Masukan alamat supplier"
              />
              {form.errors.address && <div className="text-red-600 text-sm mt-1">{form.errors.address}</div>}
            </div>
            <div>
              <Label>Deskripsi</Label>
              <Textarea
                className="mt-1"
                value={form.data.description}
                onChange={(e) => form.setData('description', e.currentTarget.value)}
                placeholder="Masukan deskripsi supplier"
              />
              {form.errors.description && <div className="text-red-600 text-sm mt-1">{form.errors.description}</div>}
            </div>
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
export default Suppliers
