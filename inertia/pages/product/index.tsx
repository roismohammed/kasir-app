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
            title: 'Products',
            url: '/customers'
        },
    ]
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex justify-between items-center">
                <PageTitle title="Product Item " subtitle="Data untuk mengatur prooducts" />
                <Link href="/products/create">
                    <Button className='flex gap-0'>
                        <HugeiconsIcon icon={AddIcon} className="h-5 w-5 mr-2" />
                        Item Baru</Button>
                </Link>
            </div>
        </AppLayout>
    );
};

export default ProductPage;
