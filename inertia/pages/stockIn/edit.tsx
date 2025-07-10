import { Head } from "@inertiajs/react"
import { PageTitle } from "~/components/page-title"
import AppLayout from "~/layouts/app-layout"
import { StockInProps, SupplierProps, ProductProps } from "~/types"
import FormStockIn from "./partials/form"

const EditStockIn = ({ stockIn, supplier, products }: { stockIn: StockInProps, supplier: SupplierProps[], products: ProductProps[] }) => {
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
            title: 'Edit Stock In',
            url: '#'
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Stock In" />
            <PageTitle title="Edit Stock In" subtitle="Edit data stock in" />
            <div className="max-w-lg">
                <FormStockIn
                    method="PUT"
                    url={`/stock-in/${stockIn.id}`}
                    stockIn={stockIn}
                    supplier={supplier}
                    products={products}
                />
            </div>
        </AppLayout>
    )
}

export default EditStockIn

