import { AddIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@inertiajs/react";
import { PageTitle } from "~/components/page-title";
import { Button } from "~/components/ui/button";
import AppLayout from "~/layouts/app-layout";

const ProductPage = () => {
    const breadcrumbs = [
        {
            title: 'Beranda',
            url: '/'
        },
        {
            title: 'Units',
            url: '/customers'
        },
    ]
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex justify-between items-center">
                <PageTitle title="Units" subtitle="Data untuk mengatur Unit Product" />
                <Link href="/unit/create">
                    <Button className='flex gap-0'>
                        <HugeiconsIcon icon={AddIcon} className="h-5 w-5 mr-2" />
                        Unit Baru</Button>
                </Link>
            </div>
        </AppLayout>
    );
};

export default ProductPage;
