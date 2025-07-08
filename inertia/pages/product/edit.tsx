import { CategoriesProps, ProductProps, UnitsProps } from "~/types"
import FormProduct from "./partials/form"
import AppLayout from "~/layouts/app-layout"
import { Head } from "@inertiajs/react"
import { PageTitle } from "~/components/page-title"

const EditProduct = ({
    categories,
    unit,
    products
}: {
    categories: CategoriesProps[],
    unit: UnitsProps[],
    products: ProductProps
}) => {

     const breadcrumbs = [
        {
            title: 'Beranda',
            url: '/'
        },
        {
            title: 'Products',
            url: '/customers'
        },
          {
            title: 'Edit-Product',
            url: '/customers'
        },
    ]
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />
            <PageTitle title="Edit Product" subtitle="Edit data product" />
            <FormProduct method={"PUT"} url={'/products'} categories={categories} unit={unit} product={products} />
        </AppLayout>
    )
}

export default EditProduct