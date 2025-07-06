import { PageTitle } from '~/components/page-title';
import AppLayout from '~/layouts/app-layout';
import { CustomersProps } from '~/types';
import FormCustomers from './partials/form';
const EditCustomers = ({ customers }: { customers: CustomersProps }) => {
    const breadcrumbs = [
        {
            title: 'Beranda',
            url: '/'
        },
        {
            title: 'Customers',
            url: '/customers'
        },
        {
            title: 'Edit-Customers',
            url: '/customers'
        },
    ]
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex justify-between items-center">
                <PageTitle title="Customers " subtitle="klik simpan untuk membuat data customers" />
            </div>
            <div className='max-w-lg'>
                <FormCustomers method={'PUT'} url={`/customers/${customers?.id}`} customers={customers} />
            </div>
        </AppLayout>
    )
}

export default EditCustomers;