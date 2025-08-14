import { AddIcon, Delete02Icon, EditIcon, MoreHorizontalCircle01FreeIcons, ViewFreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Head, Link, usePage } from "@inertiajs/react"
import { useState } from "react"
import { PageTitle } from "~/components/page-title"
import { Button } from "~/components/ui/button"
import AppLayout from "~/layouts/app-layout"
import { StockInProps, StockOutProps } from "~/types"
import { PaginatedData } from "~/types/datatable"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "~/components/datatable/table"
import DeleteConfirmation from "~/components/delete-confirmation"
import { Dialog, DialogContent, DialogTitle } from "~/components/ui/dialog"

const IndexStockOut = () => {
  const { stock_out } = usePage<{ stock_out: PaginatedData<StockOutProps> }>().props
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
      accessorKey: "description",
      header: "Deskripsi",
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
            Actions
          </p>
        )
      },
      enableSorting: false,
      cell: ({ row }) => {
        const stockOut = row.original?.id || '';
        return (
          <div className="flex items-center justify-end space-x-2">
            <Button
              onClick={() => handleOpenModal(row.original)}
              variant={'outline'}
              size="xs"
            >
                <HugeiconsIcon icon={ViewFreeIcons} size={14} />
            </Button>

            <Link href={`/stock-out/${stockOut}/edit`}>
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
                  url: `/stock-out/${stockOut}`,
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
      <Head title=" Stock Out" />
      <div className="flex items-center justify-between">
        <PageTitle title="Data Stock Out" subtitle="Daftar data stock out yang di input oleh bagian logistik" />
        <Link href="/stock-out/create" >
          <Button> <HugeiconsIcon icon={AddIcon} className="h-5 w-5 " />StockOut Baru</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={stock_out.data} />
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
            <div className="max-h-[80vh] overflow-y-auto">
              {/* Gambar Produk */}
              <div className="w-full bg-gray-50 p-3 flex justify-center border-b rounded-md">
                <img
                  className="rounded-lg object-cover h-48 w-auto"
                  src={'/storage/products/' + selectedStockIn.products[0]?.image}
                  alt={selectedStockIn.products[0]?.name}
                />
              </div>

              {/* Informasi Produk */}
              <div className="p-4 space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{selectedStockIn.products[0]?.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">Barcode: {selectedStockIn.products[0]?.barcode}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Kolom Kiri */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Stok Saat Ini</p>
                      <p className="text-base">
                        {selectedStockIn.products[0]?.stock} {selectedStockIn.unit[0]?.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">Satuan</p>
                      <p className="text-base">{selectedStockIn.unit[0]?.name || '-'}</p>
                    </div>
                  </div>

                  {/* Kolom Kanan */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Stok keluar</p>
                      <p className="text-base font-medium text-red-500">
                        -{selectedStockIn.quantity} {selectedStockIn.unit[0]?.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">Tanggal</p>
                      <p className="text-base">{new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(selectedStockIn.date))}</p>
                    </div>
                  </div>
                </div>

                {/* Informasi Tambahan */}
                <div className="pt-2 space-y-3">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Supplier</p>
                    <p className="text-base">{selectedStockIn.supplier[0]?.name || '-'}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-500">Deskripsi</p>
                    <p className="text-base text-gray-700">
                      {selectedStockIn.description || 'Tidak ada deskripsi tambahan'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </AppLayout>
  )
}

export default IndexStockOut
