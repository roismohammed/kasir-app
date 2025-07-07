import { AddIcon, MoreHorizontalCircle01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { PageTitle } from "~/components/page-title";
import { Button } from "~/components/ui/button";
import AppLayout from "~/layouts/app-layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import FormUnits from "./partials/form";
import { toast } from "sonner";
import { usePage } from "@inertiajs/react";
import { PaginatedData } from "~/types/datatable";
import { UnitsProps } from "~/types";
import { ColumnDef } from "@tanstack/react-table";
import DeleteConfirmation from "~/components/delete-confirmation";
import { DataTable } from "~/components/datatable/table";

const UnitsPage = () => {
    const { units } = usePage<{ units: PaginatedData<UnitsProps> }>().props;
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState<UnitsProps | null>(null);
    const [confirm, setConfirm] = useState({
        open: false,
        url: ""
    });

    const handleSuccess = (message: string) => {
        toast.success(message);
    };

    const breadcrumbs = [
        {
            title: 'Beranda',
            url: '/'
        },
        {
            title: 'Units',
            url: '/units'
        },
    ];

    const columns: ColumnDef<UnitsProps>[] = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Nama" },
        { accessorKey: "description", header: "Deskripsi" },
        {
            id: "actions",
            header: "Action",
            cell: ({ row }) => {
                const unit = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <HugeiconsIcon icon={MoreHorizontalCircle01FreeIcons} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                                setEditData(unit);
                                setIsOpen(true);
                            }}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem variant="destructive" onClick={() => setConfirm({ open: true, url: `/units/${unit.id}` })}>
                                Hapus
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex justify-between items-center">
                <PageTitle title="Units" subtitle="Data untuk mengatur Unit Product" />
                <Button className='flex gap-0'
                    onClick={() => {
                        setIsOpen(true);
                        setEditData(null);
                    }}
                >
                    <HugeiconsIcon icon={AddIcon} className="h-5 w-5 mr-2" />
                    Unit Baru
                </Button>
            </div>
            <DataTable columns={columns} data={units.data} />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="w-[450px]">
                    <DialogHeader>
                        <DialogTitle>{editData ? "Edit" : "Tambah"} Units</DialogTitle>
                    </DialogHeader>
                    <FormUnits
                        method={editData ? "PUT" : "POST"}
                        url={editData ? `/units/${editData.id}` : "/units"}
                        units={editData}
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

export default UnitsPage;

