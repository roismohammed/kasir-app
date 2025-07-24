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

export default function SalesReportPage() {
    return (
        <AppLayout>
            <div className="min-h-screen bg-background">
                {/* Header */}
                <div className="border-b">
                    <div className="">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-1">
                                <h1 className="text-3xl font-bold tracking-tight">Laporan Penjualan</h1>
                                <p className="text-muted-foreground">
                                    Dashboard komprehensif untuk analisis penjualan dan performa bisnis
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Select defaultValue="30days">
                                    <SelectTrigger className="w-[140px]">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="today">Hari Ini</SelectItem>
                                        <SelectItem value="7days">7 Hari</SelectItem>
                                        <SelectItem value="30days">30 Hari</SelectItem>
                                        <SelectItem value="90days">90 Hari</SelectItem>
                                        <SelectItem value="1year">1 Tahun</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline">
                                    <Download className="w-4 h-4 mr-2" />
                                    Export
                                </Button>
                                <Button>
                                    <BarChart3 className="w-4 h-4 mr-2" />
                                    Analisis
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto  py-6">
                    <Tabs defaultValue="overview" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="products">Produk</TabsTrigger>
                            <TabsTrigger value="customers">Pelanggan</TabsTrigger>
                            <TabsTrigger value="analytics">Analitik</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6">
                            {/* Key Metrics */}
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Total Penjualan</CardTitle>
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">Rp 2.847.500.000</div>
                                        <div className="flex items-center text-xs text-emerald-600 mt-1">
                                            <ArrowUpRight className="w-3 h-3 mr-1" />
                                            +12.5% dari bulan lalu
                                        </div>
                                        <Progress value={75} className="mt-2" />
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
                                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">1.247</div>
                                        <div className="flex items-center text-xs text-emerald-600 mt-1">
                                            <ArrowUpRight className="w-3 h-3 mr-1" />
                                            +8.2% dari bulan lalu
                                        </div>
                                        <Progress value={68} className="mt-2" />
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Pelanggan Baru</CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">342</div>
                                        <div className="flex items-center text-xs text-red-600 mt-1">
                                            <ArrowDownRight className="w-3 h-3 mr-1" />
                                            -2.1% dari bulan lalu
                                        </div>
                                        <Progress value={45} className="mt-2" />
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Rata-rata Pesanan</CardTitle>
                                        <Activity className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">Rp 2.284.500</div>
                                        <div className="flex items-center text-xs text-emerald-600 mt-1">
                                            <ArrowUpRight className="w-3 h-3 mr-1" />
                                            +4.7% dari bulan lalu
                                        </div>
                                        <Progress value={82} className="mt-2" />
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-7">
                                {/* Sales Chart */}
                                <Card className="lg:col-span-4">
                                    <CardHeader>
                                        <CardTitle>Tren Penjualan</CardTitle>
                                        <CardDescription>Grafik penjualan dalam 30 hari terakhir</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[350px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-blue-200">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <BarChart3 className="w-8 h-8 text-white" />
                                                </div>
                                                <p className="font-medium text-gray-700">Grafik Tren Penjualan</p>
                                                <p className="text-sm text-gray-500 mt-1">Visualisasi data penjualan harian</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Top Products */}
                                <Card className="lg:col-span-3">
                                    <CardHeader>
                                        <CardTitle>Produk Terlaris</CardTitle>
                                        <CardDescription>5 produk dengan penjualan tertinggi</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-[350px]">
                                            <div className="space-y-4">
                                                {[
                                                    {
                                                        name: "Laptop Gaming ROG",
                                                        sales: 127,
                                                        revenue: "25.5M",
                                                        color: "bg-blue-500",
                                                        trend: "+15%",
                                                    },
                                                    {
                                                        name: "iPhone 15 Pro Max",
                                                        sales: 89,
                                                        revenue: "18.2M",
                                                        color: "bg-emerald-500",
                                                        trend: "+12%",
                                                    },
                                                    { name: "MacBook Pro M3", sales: 76, revenue: "15.8M", color: "bg-purple-500", trend: "+8%" },
                                                    {
                                                        name: "Samsung Galaxy S24",
                                                        sales: 64,
                                                        revenue: "12.1M",
                                                        color: "bg-orange-500",
                                                        trend: "+5%",
                                                    },
                                                    { name: 'iPad Pro 12.9"', sales: 52, revenue: "9.8M", color: "bg-red-500", trend: "+3%" },
                                                ].map((product, index) => (
                                                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                                                        <div className="flex items-center space-x-3">
                                                            <div className={`w-10 h-10 ${product.color} rounded-lg flex items-center justify-center`}>
                                                                <Package className="w-5 h-5 text-white" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-sm">{product.name}</p>
                                                                <p className="text-xs text-muted-foreground">{product.sales} terjual</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-semibold text-sm">Rp {product.revenue}</p>
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
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Transaksi Terbaru</CardTitle>
                                            <CardDescription>Daftar transaksi penjualan terbaru</CardDescription>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="relative">
                                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input placeholder="Cari transaksi..." className="pl-8 w-[250px]" />
                                            </div>
                                            <Button variant="outline" size="sm">
                                                <Filter className="w-4 h-4 mr-2" />
                                                Filter
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Pesanan</TableHead>
                                                <TableHead>Pelanggan</TableHead>
                                                <TableHead>Produk</TableHead>
                                                <TableHead>Tanggal</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Total</TableHead>
                                                <TableHead className="w-[50px]"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                {
                                                    id: "#ORD-2024-001",
                                                    customer: { name: "Ahmad Rizki", email: "ahmad.rizki@email.com", avatar: "AR" },
                                                    product: "Laptop Gaming ROG Strix",
                                                    date: "24 Jan 2024",
                                                    status: "completed",
                                                    total: "25,500,000",
                                                    location: "Jakarta",
                                                },
                                                {
                                                    id: "#ORD-2024-002",
                                                    customer: { name: "Siti Nurhaliza", email: "siti.nur@email.com", avatar: "SN" },
                                                    product: "iPhone 15 Pro Max 256GB",
                                                    date: "24 Jan 2024",
                                                    status: "processing",
                                                    total: "22,999,000",
                                                    location: "Bandung",
                                                },
                                                {
                                                    id: "#ORD-2024-003",
                                                    customer: { name: "Budi Santoso", email: "budi.santoso@email.com", avatar: "BS" },
                                                    product: 'MacBook Pro M3 14"',
                                                    date: "23 Jan 2024",
                                                    status: "shipped",
                                                    total: "28,999,000",
                                                    location: "Surabaya",
                                                },
                                                {
                                                    id: "#ORD-2024-004",
                                                    customer: { name: "Maya Sari", email: "maya.sari@email.com", avatar: "MS" },
                                                    product: "Samsung Galaxy S24 Ultra",
                                                    date: "23 Jan 2024",
                                                    status: "completed",
                                                    total: "18,999,000",
                                                    location: "Medan",
                                                },
                                                {
                                                    id: "#ORD-2024-005",
                                                    customer: { name: "Dedi Kurniawan", email: "dedi.k@email.com", avatar: "DK" },
                                                    product: 'iPad Pro 12.9" M2',
                                                    date: "22 Jan 2024",
                                                    status: "cancelled",
                                                    total: "16,999,000",
                                                    location: "Yogyakarta",
                                                },
                                            ].map((order) => (
                                                <TableRow key={order.id}>
                                                    <TableCell className="font-medium">{order.id}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center space-x-3">
                                                            <Avatar className="h-8 w-8">
                                                                <AvatarFallback className="text-xs">{order.customer.avatar}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="font-medium text-sm">{order.customer.name}</p>
                                                                <p className="text-xs text-muted-foreground">{order.customer.email}</p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium text-sm">{order.product}</p>
                                                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                                                                <MapPin className="w-3 h-3 mr-1" />
                                                                {order.location}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center text-sm">
                                                            <Clock className="w-3 h-3 mr-1 text-muted-foreground" />
                                                            {order.date}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                order.status === "completed"
                                                                    ? "default"
                                                                    : order.status === "processing"
                                                                        ? "secondary"
                                                                        : order.status === "shipped"
                                                                            ? "outline"
                                                                            : "destructive"
                                                            }
                                                        >
                                                            {order.status === "completed"
                                                                ? "Selesai"
                                                                : order.status === "processing"
                                                                    ? "Diproses"
                                                                    : order.status === "shipped"
                                                                        ? "Dikirim"
                                                                        : "Dibatalkan"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right font-semibold">Rp {order.total}</TableCell>
                                                    <TableCell>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                                                <DropdownMenuItem>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    Lihat Detail
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <FileText className="mr-2 h-4 w-4" />
                                                                    Download Invoice
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem className="text-red-600">Batalkan Pesanan</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="products" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Analisis Produk</CardTitle>
                                    <CardDescription>Performa dan statistik produk secara detail</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[400px] flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg border-2 border-dashed border-green-200">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                            <Card>
                                <CardHeader>
                                    <CardTitle>Analisis Pelanggan</CardTitle>
                                    <CardDescription>Segmentasi dan perilaku pelanggan</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[400px] flex items-center justify-center bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg border-2 border-dashed border-purple-200">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Analisis Mendalam</CardTitle>
                                        <CardDescription>Insights dan prediksi bisnis</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 rounded-lg border-2 border-dashed border-orange-200">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <PieChart className="w-8 h-8 text-white" />
                                                </div>
                                                <p className="font-medium text-gray-700">Advanced Analytics</p>
                                                <p className="text-sm text-gray-500 mt-1">Prediksi dan forecasting</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Performance Metrics</CardTitle>
                                        <CardDescription>KPI dan target pencapaian</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span>Target Penjualan Bulanan</span>
                                                    <span className="font-medium">75%</span>
                                                </div>
                                                <Progress value={75} />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span>Kepuasan Pelanggan</span>
                                                    <span className="font-medium">92%</span>
                                                </div>
                                                <Progress value={92} />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span>Conversion Rate</span>
                                                    <span className="font-medium">68%</span>
                                                </div>
                                                <Progress value={68} />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span>Return Rate</span>
                                                    <span className="font-medium">15%</span>
                                                </div>
                                                <Progress value={15} />
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
