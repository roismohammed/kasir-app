import { PageTitle } from '~/components/page-title';
import AppLayout from '~/layouts/app-layout';
import FormSupplier from './partials/form';
const CreateSupplier = () => {
    return (
        <AppLayout>
            <div className="flex justify-between items-center">
                <PageTitle title="Create Supplier" subtitle="Create data supplier" />
            </div>
            <div className='max-w-lg'>
                <FormSupplier method="POST" url="/suppliers" />
            </div>
        </AppLayout>
    )
}
export default CreateSupplier;
