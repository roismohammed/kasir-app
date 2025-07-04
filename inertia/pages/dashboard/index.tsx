import { Head } from "@inertiajs/react";
import { PageTitle } from "~/components/page-title";
import { Card, CardContent } from "~/components/ui/card";
import AppLayout from "~/layouts/app-layout";
import { HugeiconsIcon } from "@hugeicons/react";
import { Package02Icon, ShoppingCart01FreeIcons, TruckDeliveryIcon, UserSearch02Icon } from "@hugeicons/core-free-icons";
import { ChartBarDefault } from "~/components/ui/chart-bar-default";

const stats = [
  {
    title: "Items",
    icon: <HugeiconsIcon icon={Package02Icon} className="h-10 w-10 text-blue-500" />,
    count: "128",
  },
  {
    title: "Suppliers",
    icon: <HugeiconsIcon icon={TruckDeliveryIcon} className="h-10 w-10 text-green-500" />,
    count: "12",
  },
  {
    title: "Customers",
    icon: <HugeiconsIcon icon={UserSearch02Icon} className="h-10 w-10 text-yellow-500" />,
    count: "78",
  },
  {
    title: "Users",
    icon: <HugeiconsIcon icon={ShoppingCart01FreeIcons} className="h-10 w-10 text-red-500" />,
    count: "4",
  },
];

const DashboardPage = () => {
  return (
    <AppLayout>
      <Head title="Dashboard Admin" />
      <PageTitle title="Dashboard" subtitle="Anda bisa melihat statistik dashboard" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-md py-1 hover:shadow-lg transition duration-300">
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="p-3 bg-muted rounded-full">
                {stat.icon}
              </div>
              <div>
                <p className="text-lg font-semibold">{stat.count}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <ChartBarDefault/>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
