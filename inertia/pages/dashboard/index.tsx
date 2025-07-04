import { Head } from "@inertiajs/react";
import { PageTitle } from "~/components/page-title";
import { Card } from "~/components/ui/card";
import AppLayout from "~/layouts/app-layout";

const DashboardPage = () => {
  return (
    <AppLayout >
      <Head title="Dashboard Admin" />
      <PageTitle title="Dashboard" subtitle="anda bisa melihat statistick dashboard"/>
      <div className="grid lg:grid-cols-4 gap-2">
        <Card>
          <div>Items</div>
        </Card>
        <Card>
          <div>Supplier</div>
        </Card>
        <Card>
          <div>Customers</div>
        </Card>
        <Card>
          <div>Usrs</div>
        </Card>
      </div>
    </AppLayout>
  )
}
export default DashboardPage;