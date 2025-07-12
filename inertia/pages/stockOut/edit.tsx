import { Head } from "@inertiajs/react"
import { PageTitle } from "~/components/page-title"
import AppLayout from "~/layouts/app-layout"
import { SupplierProps, ProductProps, StockOutProps } from "~/types"
import FormStockIn from "./partials/form"
const EditStockOut = ({ stockOut, supplier, products }: { stockOut: StockOutProps, supplier: SupplierProps[], products: ProductProps[] }) => {
    const breadcrumbs = [
        {
            title: 'Beranda',
            url: '/'
        },
        {
            title: 'Stock Out',
            url: '/stock-out'
        },
        {
            title: 'Edit Stock Out',
            url: '#'
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Stock Out" />
            <PageTitle title="Edit Stock Out" subtitle="Edit data stock Out" />
            <div className="max-w-lg">
                <FormStockIn
                    method="PUT"
                    url={`/stock-out/${stockOut.id}`}
                    stockOut={stockOut}
                    supplier={supplier}
                    products={products}
                />
            </div>
        </AppLayout>
    )
}

export default EditStockOut

