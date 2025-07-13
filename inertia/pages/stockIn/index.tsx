import { AddIcon, Delete02Icon, EditIcon, MoreHorizontalCircle01FreeIcons } from "@hugeicons/core-free-icons"
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
import { Dialog, DialogContent, DialogTitle } from "~/components/ui/dialog"

const IndexStockIn = () => {
  const { stock_in } = usePage<{ stock_in: PaginatedData<StockInProps> }>().props
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStockIn, setSelectedStockIn] = useState<StockInProps | null>(null);
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

  const handleOpenModal = (stock: StockInProps) => {
    setSelectedStockIn(stock);
    setModalOpen(true);
  };

  const columns: ColumnDef<StockInProps>[] = [
    {
      accessorKey: "products.barcode",
      header: "Barcode",
    },
    {
      accessorKey: "products.name",
      header: "Nama",
    },
    {
      accessorKey: "quantity",
      header: "Qty",
    },
    {
      accessorKey: "date",
      header: "Tanggal",
      cell: ({ getValue }) => {
        const date = getValue() as string
        return new Date(date).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }
    },
    {
      id: "actions",
      header: ({ table }) => {
        return (
          <p className="flex justify-end px-10">
            Aksi
          </p>
        )
      },
      enableSorting: false,
      cell: ({ row }) => {
        const stockIn = row.original?.id || '';
        return (
          <div className="flex justify-end space-x-2">
            <Button
              onClick={() => handleOpenModal(row.original)}
              variant={'outline'}
              size="xs"
            >
              <HugeiconsIcon icon={MoreHorizontalCircle01FreeIcons} size={14} />
            </Button>

            <Link href={`/stock-in/${stockIn}/edit`}>
              <Button
                variant={'outline'}
                size="xs"
              >
                <HugeiconsIcon icon={EditIcon} size={14} />
              </Button>
            </Link>

            <Button
              size="xs"
              variant={'destructive'}
              className="text-white"
              onClick={() =>
                setConfirm({
                  open: true,
                  url: `/stock-in/${stockIn}`,
                })
              }
            >
              <HugeiconsIcon icon={Delete02Icon} size={14} />
            </Button>
          </div>
        );
      },
    },
  ];


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

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogTitle>Detail Produk</DialogTitle>

          {selectedStockIn && (
            <div className="space-y-2">
              <p><strong>Barcode:</strong> {selectedStockIn.product_id}</p>
              <p><strong>Nama Produk:</strong> {selectedStockIn.name}</p>
              <p><strong>Stok:</strong> {selectedStockIn.stock}</p>
              <p><strong>Satuan:</strong> {selectedStockIn.unit?.name}</p>
              <p><strong>Supplier:</strong> {selectedStockIn.supplier?.name}</p>
              <p><strong>Deskripsi:</strong> {selectedStockIn.description}</p>
              <p><strong>Tanggal:</strong> {selectedStockIn.date}</p>
              <p><strong>Jumlah Masuk:</strong> {selectedStockIn.quantity}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </AppLayout>
  )
}

export default IndexStockIn
