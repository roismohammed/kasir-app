import { Link } from '@inertiajs/react';
import { PageTitle } from '~/components/page-title';
import { Button } from '~/components/ui/button';
import AppLayout from '~/layouts/app-layout';
const Suppliers = () => {
    return (
        <AppLayout>
            <div className='flex justify-between items-center'>
                <PageTitle title='Suppliers' subtitle='Data untuk mengatur suppliers' />
                <Link
                    href="/suppliers/create">
                    <Button>Tambah Supplier</Button>
                </Link>
            </div>
        </AppLayout>
    )
}
export default Suppliers;
