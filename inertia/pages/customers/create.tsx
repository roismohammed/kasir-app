import { PageTitle } from '~/components/page-title';
import AppLayout from '~/layouts/app-layout';
const CraeteCustomers = () => {
    return (
        <AppLayout>
            <div className="flex justify-between items-center">
                <PageTitle title="Customers " subtitle="klik simpan untuk membuat data customers" />
            </div>
        </AppLayout>
    )
}

export default CraeteCustomers;