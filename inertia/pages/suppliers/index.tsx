import { PageTitle } from '@/components/page-title'
import { Button } from '@/components/ui/button'
import AppLayout from '@/layouts/app-layout'
import { MoreHorizontalCircle01FreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link, router, usePage } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '~/components/datatable/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { SupplierProps } from '~/types'
import { toast } from 'sonner'
const Suppliers = () => {
  const { suppliers } = usePage().props
  console.log(suppliers);

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
      header: "Action",
      cell: () => (
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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

const handleDelete = async (id: number) => {
  if (!confirm('Apakah Anda yakin ingin menghapus supplier ini?')) return

  router.delete(`/suppliers/${id}`, {
    onSuccess: () => toast.success('Supplier berhasil dihapus'),
    onError: () => toast.error('Gagal menghapus supplier'),
  })
}


  return (
    <AppLayout>
      <div className="flex justify-between items-center">
        <PageTitle title="Suppliers" subtitle="Data untuk mengatur suppliers" />
        <Link href="/suppliers/create">
          <Button>Tambah Supplier</Button>
        </Link>
      </div>
      <div>
        <DataTable data={suppliers} columns={columns} />
      </div>
    </AppLayout>
  )
}
export default Suppliers
