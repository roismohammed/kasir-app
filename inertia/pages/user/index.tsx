import { AddIcon, Delete02Icon, EditIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Head, Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { PageTitle } from "~/components/page-title";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import AppLayout from "~/layouts/app-layout";
import { UserProps } from "~/types";
import FormUser from "./partials/form";
import DeleteConfirmation from "~/components/delete-confirmation";
import { PaginatedData } from "~/types/datatable";
import { DataTable } from "~/components/datatable/table";
import { ColumnDef } from "@tanstack/react-table";



const breadcrumbs = [
  {
    title: "Beranda",
    url: "/",
  },
  {
    title: "User",
    url: "/user",
  },
];


const UserComponent = () => {
  const { users } = usePage<{ users: PaginatedData<UserProps> }>().props
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<UserProps | null>(null);
  const [confirm, setConfirm] = useState({ open: false, url: "" });

  const columns: ColumnDef<UserProps>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },

    {
      id: "actions",
      header: ({ table }) => {
        return (
          <p className="flex justify-end px-10">
            Aksi
          </p>
        );
      },
      cell: ({ row }) => {
        const userId = row.original?.id || '';
        return (
          <div className="flex justify-end space-x-2">
            <Button
              onClick={() => {
                setIsOpen(true);
                setEditData(users.data.find((user) => user.id === userId) as UserProps | null);
              }}
              variant={'outline'}
              size="xs"
            >
              <HugeiconsIcon icon={EditIcon} size={14} />
            </Button>

            <Button
              size="xs"
              variant="destructive"
              className="text-white"
              onClick={() =>
                setConfirm({
                  open: true,
                  url: `/user/${userId}`,
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
      <Head title="User" />
      <div className="flex justify-between items-center">
        <PageTitle title="User" subtitle="klik simpan untuk membuat data user" />
        <Button onClick={() => {
          setIsOpen(true);
          setEditData(null);
        }}>
          <HugeiconsIcon icon={AddIcon} className="h-5 w-5 " />
          User Baru
        </Button>
      </div>
      <DataTable columns={columns} data={users.data} />
      <Dialog open={isOpen} onOpenChange={setIsOpen} >
        <DialogContent className="w-[450px]">
          <DialogHeader>
            <DialogTitle>{editData ? "Edit" : "Tambah"} User</DialogTitle>
          </DialogHeader>
          <FormUser
            method={editData ? "PUT" : "POST"}
            url={editData ? `/user/${editData.id}` : "/user"}
            user={editData}
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

export default UserComponent;


