'use client'

import { useState } from 'react'
import { PageTitle } from '@/components/page-title'
import { Button } from '@/components/ui/button'
import AppLayout from '@/layouts/app-layout'
import { MoreHorizontalCircle01FreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link, router, usePage } from '@inertiajs/react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '~/components/datatable/table'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { SupplierProps } from '~/types'
import { toast } from 'sonner'
import DeleteConfirmation from '~/components/delete-confirmation'

const Suppliers = () => {
  const { suppliers } = usePage<{ suppliers: SupplierProps[] }>().props
  const [confirm, setConfirm] = useState({
    open: false,
    url: '',
  });

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
      cell: ({ row }) => {
        const supplierId = row.original.id
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
                <Link href={`/suppliers/${supplierId}/edit`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  setConfirm({
                    open: true,
                    url: `/suppliers/${supplierId}`,
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
    <AppLayout>
      <div className="flex justify-between items-center ">
        <PageTitle title="Suppliers" subtitle="Data untuk mengatur suppliers" />
        <Link href="/suppliers/create">
          <Button>Tambah Supplier</Button>
        </Link>
      </div>

      <DataTable data={suppliers} columns={columns} />

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
export default Suppliers
