import AppLayout from "~/layouts/app-layout";
import FormProduct from "./partials/form";
import { PageTitle } from '../../components/page-title';
import { Head, usePage } from "@inertiajs/react";
import { CategoriesProps, UnitsProps } from "~/types";
import { PaginatedData } from "~/types/datatable";

const CreateCategory = () => {
    const {categories,unit:units} = usePage<{categories:CategoriesProps[],unit:UnitsProps[]}>().props
    
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
            title: 'Create-product',
            url: '#'
        },
    ]
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product"/>
            <PageTitle title="Create Product" subtitle="Create data product"/>
            <div className="max-w-lg ">
                <FormProduct method={'POST'} url={'/products'} categories={categories} unit={units}/>
            </div>
        </AppLayout>
    )
}

export default CreateCategory;