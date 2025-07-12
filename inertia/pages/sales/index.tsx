import AppLayout from "~/layouts/app-layout";
import { PageTitle } from '~/components/page-title';
import { Link } from "@inertiajs/react";
import { Button } from "~/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { AddIcon } from "@hugeicons/core-free-icons";

const IndexSale = () => {
    const breadcrumbs = [
        { title: "Home", url: "/" },
        { title: "Sales", url: "/sales" }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex items-center justify-between">
                <PageTitle title="Data Penjualan" subtitle=" data penjualan" />
                <Link href="/penjualan/create" >
                    <Button> <HugeiconsIcon icon={AddIcon} className="h-5 w-5 " />Tambah Penjualan</Button>
                </Link>
            </div>
            <h1>Index Sale</h1>
        </AppLayout>
    );
}

export default IndexSale;
