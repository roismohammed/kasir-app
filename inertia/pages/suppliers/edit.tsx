import { PageTitle } from '~/components/page-title';
import AppLayout from '~/layouts/app-layout';
const EditSupplier = () => {
  return (
    <AppLayout>
      <div className="flex justify-between items-center">
        <PageTitle title="Edit Supplier" subtitle="Edit data supplier" />
      </div>
    </AppLayout>
  )
}
export default EditSupplier;
