import { PageTitle } from '~/components/page-title';
import AppLayout from '~/layouts/app-layout';
import FormSupplier from './partials/form';
const breadcrumbs = [
    {
        title: "Beranda",
        url: "/suppliers",
    },
    {
        title: "Suppliers",
        url: "/suppliers",
    },
       {
        title: "create-supplier",
        url: "/suppliers",
    },
]
const CreateSupplier = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex justify-between items-center">
                <PageTitle title="Create Supplier" subtitle="Create data supplier" />
            </div>
            <div className='max-w-lg mt-6'>
                <FormSupplier method="POST" url="/suppliers" />
            </div>
        </AppLayout>
    )
}
export default CreateSupplier;
