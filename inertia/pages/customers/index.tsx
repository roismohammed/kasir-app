import { Link } from '@inertiajs/react';
import { PageTitle } from '~/components/page-title';
import { Button } from '~/components/ui/button';
import AppLayout from '~/layouts/app-layout';
const IndexCustomers = () => {
    return (
        <AppLayout>
            <div className="flex justify-between items-center">
                <PageTitle title="Customers " subtitle="Data untuk mengatur customers" />
                <Link href="/customers/create">
                    <Button>Customers Baru</Button>
                </Link>
            </div>
        </AppLayout>
    )
}

export default IndexCustomers;