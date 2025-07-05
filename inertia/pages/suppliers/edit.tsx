import { PageTitle } from '~/components/page-title';
import AppLayout from '~/layouts/app-layout';
import { SupplierProps } from '~/types';
import FormSupplier from './partials/form';
const EditSupplier = ({ supplier }:{ supplier: SupplierProps}) => {
  return (
    <AppLayout>
      <div className="flex justify-between items-center">
        <PageTitle title="Edit Supplier" subtitle="Edit data supplier" />
      </div>
      <div className='max-w-lg'>
        <FormSupplier
          method="PUT"
          url={`/suppliers/${supplier?.id}`}
          supplier={supplier}
        />
      </div>
    </AppLayout>
  );
};
export default EditSupplier;

