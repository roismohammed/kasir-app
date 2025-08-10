"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Calendar,
    Download,
    Filter,
    Search,
    DollarSign,
    ShoppingCart,
    Users,
    Package,
    MoreHorizontal,
    Eye,
    FileText,
    BarChart3,
    PieChart,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    MapPin,
    Clock,
} from "lucide-react"
import AppLayout from "~/layouts/app-layout"
import { Head, usePage } from "@inertiajs/react"
import { OrderData } from "~/types"
import { ChartBarDefault } from "~/components/ui/chart-bar-default"
const breadcrumbs = [
    {
        title: "Beranda",
        url: "/",
    },
    {
        title: "Laporan",
        url: "/sales",
    },
    {
        title: "Penjualan",
        url: "/sales/order",
    },
];

type PageProps = {
    sale: OrderData[];
    totalSales: number;
    totalProducts: number;
    totalSold: number;
    productTerlaris: {
        quantity: number;
        trend?: string;
        product: {
            image: string;
            name: string;
            price: number;
        };
    }[];
};
export default function SalesReportPage() {
    const { totalSales, totalProducts, totalSold, productTerlaris, newTransaksi } = usePage<PageProps>().props
    console.log(newTransaksi);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Penjualan" />
            <div className="min-h-screen bg-background">
                {/* Modern Purple Header */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-8 shadow-lg rounded-lg">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold text-white tracking-tight">Laporan Penjualan</h1>
                                <p className="text-purple-100">
                                    Dashboard komprehensif untuk analisis penjualan dan performa bisnis
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Select defaultValue="30days">
                                    <SelectTrigger className="w-[140px] bg-white/10 text-white border-white/20 hover:bg-white/20">
                                        <Calendar className="w-4 h-4 mr-2 text-purple-100" />
                                        <SelectValue className="text-white" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-gray-200">
                                        <SelectItem value="today">Hari Ini</SelectItem>
                                        <SelectItem value="7days">7 Hari</SelectItem>
                                        <SelectItem value="30days">30 Hari</SelectItem>
                                        <SelectItem value="90days">90 Hari</SelectItem>
                                        <SelectItem value="1year">1 Tahun</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white">
                                    <Download className="w-4 h-4 mr-2" />
                                    Export
                                </Button>
                                <Button className="bg-white text-white  hover:bg-white/90">
                                    <BarChart3 className="w-4 h-4 mr-2" />
                                    Analisis
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" mx-auto py-6 ">
                    <Tabs defaultValue="overview" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800">
                            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-purple-900 dark:data-[state=active]:bg-gray-900">
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value="products" className="data-[state=active]:bg-white data-[state=active]:text-purple-900 dark:data-[state=active]:bg-gray-900">
                                Produk
                            </TabsTrigger>
                            <TabsTrigger value="customers" className="data-[state=active]:bg-white data-[state=active]:text-purple-900 dark:data-[state=active]:bg-gray-900">
                                Pelanggan
                            </TabsTrigger>
                            <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:text-purple-900 dark:data-[state=active]:bg-gray-900">
                                Analitik
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6">
                            {/* Key Metrics */}
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card className="border-0 shadow-lg">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2    ">
                                        <CardTitle className="text-sm font-medium text-gray-500">Total Penjualan</CardTitle>
                                        <div className="p-2 rounded-full bg-purple-100">
                                            <DollarSign className="h-4 w-4 text-purple-600" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-purple-900">{formatPrice(totalSales)}</div>
                                        <div className="flex items-center text-xs text-emerald-600 mt-1">
                                            <ArrowUpRight className="w-3 h-3 mr-1" />
                                            +12.5% dari bulan lalu
                                        </div>
                                        {/* <Progress value={75} className="mt-2 bg-purple-100" indicatorClassName="bg-purple-600" /> */}
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-lg">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-500">Total Pesanan</CardTitle>
                                        <div className="p-2 rounded-full bg-purple-100">
                                            <ShoppingCart className="h-4 w-4 text-purple-600" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-purple-900">{totalProducts}</div>
                                        <div className="flex items-center text-xs text-emerald-600 mt-1">
                                            <ArrowUpRight className="w-3 h-3 mr-1" />
                                            +8.2% dari bulan lalu
                                        </div>
                                        {/* <Progress value={68} className="mt-2 bg-purple-100" indicatorClassName="bg-purple-600" /> */}
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-lg">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-500">Product Terjual</CardTitle>
                                        <div className="p-2 rounded-full bg-purple-100">
                                            <Users className="h-4 w-4 text-purple-600" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-purple-900">{totalSold}</div>
                                        <div className="flex items-center text-xs text-red-600 mt-1">
                                            <ArrowDownRight className="w-3 h-3 mr-1" />
                                            -2.1% dari bulan lalu
                                        </div>
                                        {/* <Progress value={45} className="mt-2 bg-purple-100" indicatorClassName="bg-purple-600" /> */}
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-lg">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-500">Rata-rata Pesanan</CardTitle>
                                        <div className="p-2 rounded-full bg-purple-100">
                                            <Activity className="h-4 w-4 text-purple-600" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-purple-900">Rp 2.284.500</div>
                                        <div className="flex items-center text-xs text-emerald-600 mt-1">
                                            <ArrowUpRight className="w-3 h-3 mr-1" />
                                            +4.7% dari bulan lalu
                                        </div>
                                        {/* <Progress value={82} className="mt-2 bg-purple-100" indicatorClassName="bg-purple-600" /> */}
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-7">
                                {/* Sales Chart */}
                                <Card className="lg:col-span-4 border-0 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-purple-900">Tren Penjualan</CardTitle>
                                        <CardDescription className="text-gray-500">Grafik penjualan dalam 30 hari terakhir</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {/* <div className="h-[350px] flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-2 border-dashed border-purple-200">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <BarChart3 className="w-8 h-8 text-white" />
                                                </div>
                                                <p className="font-medium text-gray-700">Grafik Tren Penjualan</p>
                                                <p className="text-sm text-gray-500 mt-1">Visualisasi data penjualan harian</p>
                                            </div>
                                        </div> */}
                                        <ChartBarDefault/>
                                    </CardContent>
                                </Card>

                                {/* Top Products */}
                                <Card className="lg:col-span-3 border-0 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-purple-900">Produk Terlaris</CardTitle>
                                        <CardDescription className="text-gray-500">5 produk dengan penjualan tertinggi</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-[350px]">
                                            <div className="space-y-4">
                                                {productTerlaris.map((product, index) => (
                                                    <div key={index} className="flex items-center justify-between p-2 rounded-lg border border-gray-200 hover:bg-purple-50 transition-colors">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-12 h-12 flex items-center justify-center">
                                                                <img src={'/storage/products/' + product.product.image} alt={product.product.name} className="w-full h-full object-cover rounded-md" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-sm text-gray-900">{product.product.name}</p>
                                                                <p className="text-xs text-gray-500">{product.quantity} terjual</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-semibold text-sm text-purple-900">Rp {product.product.price}</p>
                                                            <p className="text-xs text-emerald-600">{product.trend}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Recent Sales */}
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg text-purple-900">Transaksi Terbaru</CardTitle>
                                            <CardDescription className="text-gray-500">
                                                Daftar transaksi penjualan terbaru
                                            </CardDescription>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="relative">
                                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                                <Input
                                                    placeholder="Cari transaksi..."
                                                    className="pl-8 w-[250px] bg-white"
                                                />
                                            </div>
                                            <Button variant="outline" size="sm" className="bg-white">
                                                <Filter className="w-4 h-4 mr-2" />
                                                Filter
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-lg border border-gray-200 overflow-hidden">
                                        <Table>
                                            <TableHeader className="bg-purple-50">
                                                <TableRow className="hover:bg-transparent">
                                                    <TableHead className="font-medium text-gray-500">Pesanan</TableHead>
                                                    <TableHead className="font-medium text-gray-500">Produk</TableHead>
                                                    <TableHead className="font-medium text-gray-500">Tanggal</TableHead>
                                                    
                                                    <TableHead className="font-medium text-gray-500 text-right">Total</TableHead>
                                                    <TableHead className="w-[50px]"></TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody className="bg-white">
                                                {newTransaksi.map((order) => (
                                                    <TableRow
                                                        key={order.id}
                                                        className="border-t hover:bg-purple-50 transition-colors"
                                                    >
                                                        <TableCell className="font-medium text-purple-900">
                                                            {order.sale.invoiceNumber}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center space-x-3">
                                                                <div className="w-12 h-12 flex items-center justify-center">
                                                                    <img src={`/storage/products/${order.product.image}`} alt={order.product.name} className="w-full h-full object-cover rounded-md" />
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium text-sm text-gray-900">
                                                                        {order.product.name}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div>
                                                                <p className="font-medium text-sm text-gray-900">
                                                                    {new Intl.DateTimeFormat('id-ID', { dateStyle: 'short' }).format(new Date(order.sale.createdAt))}
                                                                </p>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center text-sm text-gray-500">
                                                                {order.createdAt}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>

                                                        </TableCell>
                                                        <TableCell className="text-right font-semibold text-purple-900">
                                                            Rp {order.price.toLocaleString('id-ID')}
                                                        </TableCell>
                                                        <TableCell>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button
                                                                        variant="ghost"
                                                                        className="h-8 w-8 p-0 hover:bg-purple-100"
                                                                    >
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                        <span className="sr-only">Open menu</span>
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent
                                                                    align="end"
                                                                    className="w-48 bg-white border-gray-200"
                                                                >
                                                                    <DropdownMenuLabel className="text-gray-900">
                                                                        Aksi
                                                                    </DropdownMenuLabel>
                                                                    <DropdownMenuItem className="hover:bg-purple-50">
                                                                        <Eye className="mr-2 h-4 w-4" />
                                                                        <span>Lihat Detail</span>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem className="hover:bg-purple-50">
                                                                        <FileText className="mr-2 h-4 w-4" />
                                                                        <span>Download Invoice</span>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator className="bg-gray-200" />
                                                                    <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                                                                        <span>Batalkan Pesanan</span>
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    {/* Pagination */}
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="text-sm text-gray-500">
                                            Menampilkan 1 sampai 5 dari 25 transaksi
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button variant="outline" size="sm" className="bg-white">
                                                Sebelumnya
                                            </Button>
                                            <Button variant="outline" size="sm" className="bg-white">
                                                Selanjutnya
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="products" className="space-y-6">
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-purple-900">Analisis Produk</CardTitle>
                                    <CardDescription className="text-gray-500">Performa dan statistik produk secara detail</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[400px] flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-2 border-dashed border-purple-200">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Package className="w-8 h-8 text-white" />
                                            </div>
                                            <p className="font-medium text-gray-700">Analisis Produk</p>
                                            <p className="text-sm text-gray-500 mt-1">Data performa dan kategori produk</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="customers" className="space-y-6">
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-purple-900">Analisis Pelanggan</CardTitle>
                                    <CardDescription className="text-gray-500">Segmentasi dan perilaku pelanggan</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[400px] flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-2 border-dashed border-purple-200">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Users className="w-8 h-8 text-white" />
                                            </div>
                                            <p className="font-medium text-gray-700">Analisis Pelanggan</p>
                                            <p className="text-sm text-gray-500 mt-1">Segmentasi dan loyalitas pelanggan</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="analytics" className="space-y-6">
                            <div className="grid gap-6 lg:grid-cols-2">
                                <Card className="border-0 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-purple-900">Analisis Mendalam</CardTitle>
                                        <CardDescription className="text-gray-500">Insights dan prediksi bisnis</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-2 border-dashed border-purple-200">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <PieChart className="w-8 h-8 text-white" />
                                                </div>
                                                <p className="font-medium text-gray-700">Advanced Analytics</p>
                                                <p className="text-sm text-gray-500 mt-1">Prediksi dan forecasting</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-purple-900">Performance Metrics</CardTitle>
                                        <CardDescription className="text-gray-500">KPI dan target pencapaian</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500">Target Penjualan Bulanan</span>
                                                    <span className="font-medium text-purple-900">75%</span>
                                                </div>
                                                <Progress value={75} className="bg-purple-100" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500">Kepuasan Pelanggan</span>
                                                    <span className="font-medium text-purple-900">92%</span>
                                                </div>
                                                <Progress value={92} className="bg-purple-100" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500">Conversion Rate</span>
                                                    <span className="font-medium text-purple-900">68%</span>
                                                </div>
                                                <Progress value={68} className="bg-purple-100" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500">Return Rate</span>
                                                    <span className="font-medium text-purple-900">15%</span>
                                                </div>
                                                <Progress value={15} className="bg-purple-100" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    )
}