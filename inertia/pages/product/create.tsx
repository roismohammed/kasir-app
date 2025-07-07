import AppLayout from "~/layouts/app-layout";
import FormProduct from "./partials/form";
import { PageTitle } from '../../components/page-title';

const CreateCategory = () => {
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
            title: 'Create-product',
            url: '/customers'
        },
    ]
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <PageTitle title="Create Product" subtitle="Create data product"/>
            <div className="max-w-lg ">
                <FormProduct method={'POST'} url={'/products/create'} />
            </div>
        </AppLayout>
    )
}

export default CreateCategory;