import { PageTitle } from '~/components/page-title';
import AppLayout from '~/layouts/app-layout';
import { SupplierProps } from '~/types';
import FormSupplier from './partials/form';

const breadcrumbs = [
    {
        title: "Beranda",
        url: "/",
    },
    {
        title: "Suppliers",
        url: "/suppliers",
    },
       {
        title: "edit-supplier",
        url: "/suppliers",
    },
]
const EditSupplier = ({ supplier }:{ supplier: SupplierProps}) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex justify-between items-center">
        <PageTitle title="Edit Supplier" subtitle="Edit data supplier" />
      </div>
      <div className='max-w-lg mt-6'>
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

