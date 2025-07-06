import { AddIcon, MoreHorizontalCircle01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import AppLayout from "~/layouts/app-layout";
import { Button } from "~/components/ui/button";
import { PageTitle } from "~/components/page-title";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { DataTable } from "~/components/datatable/table";
import FormCategory from "./partials/form";
import DeleteConfirmation from "~/components/delete-confirmation";
import { CategoriesProps } from "~/types";
import { PaginatedData } from "~/types/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

const CategoryPage = () => {
  const { categories } = usePage<{ categories: PaginatedData<CategoriesProps> }>().props;
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<CategoriesProps | null>(null);
  const [confirm, setConfirm] = useState({ open: false, url: "" });

  const handleSuccess = (message: string) => {
    toast.success(message);
  };

  const columns: ColumnDef<CategoriesProps>[] = [
    { accessorKey: "name", header: "Nama" },
    { accessorKey: "description", header: "Deskripsi" },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const category = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <HugeiconsIcon icon={MoreHorizontalCircle01FreeIcons} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {
                setEditData(category);
                setIsOpen(true);
              }}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setConfirm({ open: true, url: `/categories/${category.id}` })}>
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

   const breadcrumbs = [
        {
            title: 'Beranda',
            url: '/'
        },
        {
            title: 'Categories',
            url: '/categories'
        },
    ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Category" />
      <div className="flex justify-between items-center ">
        <PageTitle title="Category" subtitle="Data untuk mengatur Unit Category" />
        <Button onClick={() => {
          setIsOpen(true);
          setEditData(null);
        }}>
          <HugeiconsIcon icon={AddIcon} className="h-5 w-5 " />
          Category Baru
        </Button>
      </div>

      <DataTable data={categories.data} columns={columns} />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editData ? "Edit" : "Tambah"} Category</DialogTitle>
          </DialogHeader>
          <FormCategory
            method={editData ? "PUT" : "POST"}
            url={editData ? `/categories/${editData.id}` : "/categories"}
            category={editData}

            onSuccess={() => {
              handleSuccess(editData ? "Berhasil diperbarui" : "Berhasil ditambahkan");
              setIsOpen(false);
              setEditData(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <DeleteConfirmation
        open={confirm.open}
        url={confirm.url}
        handleClose={() => setConfirm({ open: false, url: "" })}
      />
    </AppLayout>
  );
};

export default CategoryPage;

