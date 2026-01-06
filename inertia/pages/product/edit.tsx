import { CategoriesProps, ProductProps, UnitsProps } from "~/types"
import FormProduct from "./partials/form"
import AppLayout from "~/layouts/app-layout"
import { Head } from "@inertiajs/react"
import { PageTitle } from "~/components/page-title"

const EditProduct = ({
    categories,
    unit,
    product
}: {
    categories: CategoriesProps[],
    unit: UnitsProps[],
    product: ProductProps[]
}) => {


    const breadcrumbs = [
        {
            title: 'Beranda',
            url: '/'
        },
        {
            title: 'Products',
            url: '/products'
        },
        {
            title: 'Edit-Product',
            url: '#'
        },
    ]
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />
            <div className="max-w-xl mt-6 mx-auto">
                <PageTitle title="Edit Product" subtitle="Edit data product" />
                <FormProduct method={"PUT"} url={`/products/${product.id}`} categories={categories} unit={unit} product={product} />
            </div>
        </AppLayout>
    )
}

export default EditProduct