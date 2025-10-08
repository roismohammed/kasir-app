import { Head, usePage } from "@inertiajs/react";
import { PageTitle } from "~/components/page-title";
import {
  Card, CardContent, CardHeader,
  CardTitle,
  CardDescription
} from "~/components/ui/card";
import AppLayout from "~/layouts/app-layout";
import { HugeiconsIcon } from "@hugeicons/react";
import { Package02Icon, ShoppingCart01FreeIcons, TruckDeliveryIcon, UserSearch02Icon } from "@hugeicons/core-free-icons";
import { NumberTicker } from "~/components/magicui/numberTicker";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import SaleProduct from "#models/sale_product";


const breadcrumbs = [
  {
    title: "Beranda",
    url: "/",
  },
]
const DashboardPage = () => {
  const { totalSupplier, totalProduct, totalCustomer, productTerlaris } = usePage().props

  console.log(productTerlaris);


  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (

    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard Admin" />
      <PageTitle title="Dashboard" subtitle="Anda bisa melihat statistik dashboard" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <Card className="shadow-none border border-gray-200 py-1 hover:shadow-lg transition duration-300 ">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-muted rounded-full">
              <HugeiconsIcon icon={TruckDeliveryIcon} className="h-10 w-10 text-green-500" />
            </div>
            <div>
              <NumberTicker className="text-2xl font-bold " value={Number(30)} />
              <p className="text-sm text-muted-foreground ">Suppliers</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border border-gray-200 py-1 hover:shadow-lg transition duration-300 ">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-muted rounded-full">
              <HugeiconsIcon icon={UserSearch02Icon} className="h-10 w-10 text-yellow-500" />
            </div>
            <div>
              <NumberTicker className="text-2xl font-bold " value={Number(12)} />
              <p className="text-sm text-muted-foreground ">Customers</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border border-gray-200 py-1 hover:shadow-lg transition duration-300 ">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-muted rounded-full">
              <HugeiconsIcon icon={ShoppingCart01FreeIcons} className="h-10 w-10 text-red-500" />
            </div>
            <div>
              <NumberTicker className="text-2xl font-bold " value={Number(12)} />
              <p className="text-sm text-muted-foreground ">Users</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border border-gray-200 py-1 hover:shadow-lg transition duration-300 ">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-muted rounded-full">
              <HugeiconsIcon icon={Package02Icon} className="h-10 w-10 text-blue-500" />
            </div>
            <div>
              <NumberTicker className="text-2xl font-bold " value={10} />
              <p className="text-sm text-muted-foreground ">Products</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold">Produk Terlaris</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Daftar 5 produk dengan penjualan tertinggi
                </CardDescription>
              </div>
              <Badge variant="outline" className="px-3 py-1 text-sm font-semibold">
                Bulan Ini
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead> 
                  <TableHead>Produk</TableHead> 
                  <TableHead>Kategori</TableHead>
                  <TableHead className="text-right">Penjualan</TableHead>
                  <TableHead className="text-right">Pendapatan</TableHead>
                  <TableHead className="text-right">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productTerlaris.map((product:SaleProduct) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {product.product.id}
                    </TableCell>
                    <TableCell className="font-medium flex items-center gap-3">
                      <Avatar className="h-8 w-8 rounded-md">
                        <AvatarImage src={ '/storage/products/' +  product.product.image} alt={product.product.name} />
                        <AvatarFallback className="rounded-md bg-primary/10 text-primary">
                          {product.product.image}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold">{product.product.name}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="px-2 py-1">
                        {product.product.category.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">

                    </TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      {formatCurrency(product.product.price)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        {product.quantity >= 5 ? (
                          <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
                        ) : product.quantity < 5 ? (
                          <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
                        ) : (
                          <MinusIcon className="h-4 w-4 text-gray-500 mr-1" />
                        )}
                        <span
                          className={`font-medium ${product.quantity >= 5
                              ? "text-green-600"
                              : product.quantity < 5

                                ? "text-red-600"
                                : "text-gray-500"
                            }`}
                        >
                          {product.quantity >= 5 ? `+${product.quantity - 5}%` : product.quantity < 5 ? `-${5 - product.quantity}%` : ''}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> */}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;