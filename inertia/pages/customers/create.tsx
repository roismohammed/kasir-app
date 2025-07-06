import { Head } from '@inertiajs/react';
import { PageTitle } from '~/components/page-title';
import AppLayout from '~/layouts/app-layout';
import FormCustomers from './partials/form';
const CraeteCustomers = () => {
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
            title: 'Create-Customers',
            url: '/customers'
        },
    ]
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="flex justify-between items-center">
                <PageTitle title="Customers " subtitle="klik simpan untuk membuat data customers" />
            </div>
        <div className='max-w-lg'>
            <FormCustomers method={'POST'} url='/customers' />
        </div>
        </AppLayout>
    )
}

export default CraeteCustomers;