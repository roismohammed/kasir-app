import { Head } from "@inertiajs/react";
import { PageTitle } from "~/components/page-title";
import AppLayout from "~/layouts/app-layout";
import FormStockOut from "./partials/form";
import { ProductProps, SupplierProps } from "~/types";
  const breadcrumbs = [
        {
            title: 'Beranda',
            url: '/'
        },
        {
            title: 'Stock Out',
            url: '/stock-in'
        },
        {
            title: 'Create Stock Out',
            url: '#'
        },
    ]

const CreateStockOut = ({suppliers, products}:{suppliers: SupplierProps[], products: ProductProps[]}) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title=" Stock Out" />
            <PageTitle title="Create Data Stock out" subtitle=" data stock out yang di input oleh bagian logistik secara profesional" />
            <div className="max-w-lg">
                <FormStockOut url={'/stock-out'} method="POST" supplier={suppliers} products={products}/>
            </div>
        </AppLayout>
    )
}

export default CreateStockOut;