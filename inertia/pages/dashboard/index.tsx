import { Head, usePage } from "@inertiajs/react";
import { PageTitle } from "~/components/page-title";
import {
  Card, CardContent, CardHeader,
  CardTitle,
  CardDescription
} from "~/components/ui/card";
import AppLayout from "~/layouts/app-layout";
import { HugeiconsIcon } from "@hugeicons/react";
import { Dollar01FreeIcons, Package02Icon, ShoppingCart01FreeIcons, TruckDeliveryIcon, UserSearch02Icon } from "@hugeicons/core-free-icons";
import { ChartBarDefault } from "~/components/ui/chart-bar-default";
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

const topProducts = [
  {
    id: "PRD-001",
    name: "Smartphone X Pro",
    category: "Elektronik",
    sales: 1245,
    revenue: 1245000000,
    trend: "up",
    trendPercentage: 12.5,
  },
  {
    id: "PRD-002",
    name: "Wireless Headphones",
    category: "Aksesoris",
    sales: 892,
    revenue: 446000000,
    trend: "up",
    trendPercentage: 8.3,
  },
  {
    id: "PRD-003",
    name: "Organic Face Cream",
    category: "Kecantikan",
    sales: 765,
    revenue: 153000000,
    trend: "down",
    trendPercentage: 5.2,
  },
  {
    id: "PRD-004",
    name: "Running Shoes",
    category: "Olahraga",
    sales: 621,
    revenue: 186300000,
    trend: "up",
    trendPercentage: 15.7,
  },
  {
    id: "PRD-005",
    name: "Coffee Maker Deluxe",
    category: "Dapur",
    sales: 543,
    revenue: 325800000,
    trend: "up",
    trendPercentage: 22.1,
  },
];

const breadcrumbs = [
  {
    title: "Beranda",
    url: "/",
  },
]
const DashboardPage = () => {
  // Cara 1: Destructuring langsung
  const { totalSupplier, totalProduct, totalCustomer } = usePage().props
  
  // Debug
  console.log('Total Supplier:', totalSupplier)
  console.log('Total Product:', totalProduct)
  console.log('Total Customer:', totalCustomer)
  console.log('All props:', usePage().props)
  
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
        {/* <Card className="shadow-md py-1 hover:shadow-lg transition duration-300 bg-purple-600">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-muted rounded-full">
              <HugeiconsIcon icon={Dollar01FreeIcons} className="h-10 w-10 text-blue-500" />
            </div>
            <div>
              <NumberTicker className="text-2xl font-bold text-white" value={Number(200000)} />
              <p className="text-sm text-white  ">Pendapatan Hari Ini</p>
            </div>
          </CardContent>
        </Card> */}

        <Card className="shadow-md py-1 hover:shadow-lg transition duration-300 ">
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

        <Card className="shadow-md py-1 hover:shadow-lg transition duration-300 ">
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

        <Card className="shadow-md py-1 hover:shadow-lg transition duration-300 ">
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

        <Card className="shadow-md py-1 hover:shadow-lg transition duration-300 ">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-muted rounded-full">
              <HugeiconsIcon icon={Package02Icon} className="h-10 w-10 text-blue-500" />
            </div>
            <div>
              <NumberTicker className="text-2xl font-bold " value={totalProduct} />
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead> {/* Lebar lebih kecil */}
                <TableHead>Produk</TableHead> {/* Gabungan gambar & nama */}
                <TableHead>Kategori</TableHead>
                <TableHead className="text-right">Penjualan</TableHead>
                <TableHead className="text-right">Pendapatan</TableHead>
                <TableHead className="text-right">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {product.id}
                  </TableCell>
                  <TableCell className="font-medium flex items-center gap-3">
                    <Avatar className="h-8 w-8 rounded-md">
                      {/* <AvatarImage src={product.imageUrl} alt={product.name} /> */}
                      <AvatarFallback className="rounded-md bg-primary/10 text-primary">
                        {product.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{product.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="px-2 py-1">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {product.sales}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    {formatCurrency(product.revenue)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      {product.trend === "up" ? (
                        <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
                      ) : product.trend === "down" ? (
                        <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
                      ) : (
                        <MinusIcon className="h-4 w-4 text-gray-500 mr-1" />
                      )}
                      <span
                        className={`font-medium ${
                          product.trend === "up"
                            ? "text-green-600"
                            : product.trend === "down"
                            ? "text-red-600"
                            : "text-gray-500"
                        }`}
                      >
                        {product.trendPercentage > 0 ? `${product.trendPercentage}%` : ''}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
        </div>
    </AppLayout>
  );
};

export default DashboardPage;
