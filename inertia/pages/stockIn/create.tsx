import { Head } from "@inertiajs/react"
import { PageTitle } from "~/components/page-title"
import AppLayout from "~/layouts/app-layout"
import { ProductProps, SupplierProps } from "~/types"
import FormStockIn from "./partials/form"

const CreateStockIn = ({ products, supplier }: { products: ProductProps[], supplier: SupplierProps[] }) => {
    const breadcrumbs = [
        {
            title: 'Beranda',
            url: '/'
        },
        {
            title: 'Stock In',
            url: '/stock-in'
        },
        {
            title: 'Create Stock In',
            url: '#'
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title=" Stock In" />
            <PageTitle title="Create Data Stock In" subtitle=" data stock in" />
            <div className="max-w-lg">
                <FormStockIn method={"POST"} url={'/stock-in'} supplier={supplier} products={products} />
            </div>
        </AppLayout>
    )
}

export default CreateStockIn
