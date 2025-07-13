import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import AppLayout from "~/layouts/app-layout"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, BarCode01Icon, CreditCardIcon, CreditCardValidationIcon, Delete02Icon, PrinterIcon, ShoppingCart01Icon, UserCheck01Icon } from '@hugeicons/core-free-icons';
import { Head } from "@inertiajs/react"

   const breadcrumbs = [
        { title: "Beranda", url: "/" },
        { title: "Sales", url: "/sales" }
    ];
export default function ModernPOS() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                {/* Header */}
                <div className="lg:col-span-3">
                    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
                        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                            <div className="min-w-0 flex-1">
                                <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                                    Sales Dashboard
                                </CardTitle>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Current transaction</p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                                <Badge variant="outline" className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20 text-xs sm:text-sm">
                                    <span className="truncate max-w-[150px] sm:max-w-none">Invoice: YP1902090002</span>
                                </Badge>
                                <Button variant="outline" className="border-gray-300 dark:border-gray-600 w-full sm:w-auto">
                                    <HugeiconsIcon icon={PrinterIcon} className="mr-2 h-4 w-4" />
                                    Print
                                </Button>
                            </div>
                        </CardHeader>
                    </Card>
                </div>

                {/* Left Column */}
                <div className="lg:col-span-2 space-y-4 lg:space-y-5 overflow-hidden">
                    {/* Customer Info Card */}
                    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <HugeiconsIcon icon={UserCheck01Icon} className="h-5 w-5 text-blue-500 shrink-0" />
                                <span className="truncate">Customer Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2 min-w-0">
                                <Label className="text-gray-600 dark:text-gray-300">Date</Label>
                                <Input value="02/09/2019" readOnly className="bg-gray-50 dark:bg-gray-700" />
                            </div>
                            <div className="space-y-2 min-w-0">
                                <Label className="text-gray-600 dark:text-gray-300">Cashier</Label>
                                <Input value="Mohammad Nur Fawalq" readOnly className="bg-gray-50 dark:bg-gray-700" />
                            </div>
                            <div className="md:col-span-2 space-y-2 min-w-0">
                                <Label className="text-gray-600 dark:text-gray-300">Customer</Label>
                                <Input value="Umum" className="bg-gray-50 dark:bg-gray-700" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Product Input Card */}
                    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <HugeiconsIcon icon={BarCode01Icon} className="h-5 w-5 text-green-500 shrink-0" />
                                <span className="truncate">Product Scanner</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Input
                                    placeholder="Scan barcode or search product..."
                                    className="flex-1 bg-gray-50 dark:bg-gray-700 min-w-0"
                                />
                                <Input
                                    placeholder="Quantity..."
                                    className="flex-1 sm:max-w-[120px] bg-gray-50 dark:bg-gray-700"
                                />
                                <Button className="bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 w-full sm:w-auto shrink-0">
                                    <HugeiconsIcon icon={Add01Icon} className="mr-2 h-4 w-4" />
                                    Add
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Product List */}
                    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col overflow-hidden">
                        <CardHeader className="shrink-0">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <HugeiconsIcon icon={ShoppingCart01Icon} className="h-5 w-5 text-purple-500 shrink-0" />
                                <span className="truncate">Cart Items</span>
                                <Badge className="ml-auto bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 shrink-0">
                                    1 Item
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-hidden p-0">
                            <div className="overflow-x-auto">
                                <div className="min-w-[600px]">
                                    <ScrollArea className="h-[300px] lg:h-[400px]">
                                        <Table>
                                            <TableHeader className="sticky top-0 bg-gray-100 dark:bg-gray-800 z-10">
                                                <TableRow>
                                                    <TableHead className="w-[200px] min-w-[150px]">Product</TableHead>
                                                    <TableHead className="text-right w-[80px]">Price</TableHead>
                                                    <TableHead className="text-center w-[80px]">Qty</TableHead>
                                                    <TableHead className="text-right w-[80px]">Discount</TableHead>
                                                    <TableHead className="text-right w-[100px]">Total</TableHead>
                                                    <TableHead className="text-center w-[80px]">Action</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50">
                                                    <TableCell className="font-medium truncate">Alaskan Druer</TableCell>
                                                    <TableCell className="text-right">2,500</TableCell>
                                                    <TableCell className="p-2">
                                                        <Input
                                                            type="number"
                                                            value="2"
                                                            className="w-16 mx-auto text-center bg-gray-50 dark:bg-gray-700"
                                                        />
                                                    </TableCell>
                                                    <TableCell className="text-right">0</TableCell>
                                                    <TableCell className="text-right font-medium">2,500</TableCell>
                                                    <TableCell className="text-center p-2">
                                                        <Button variant="ghost" size="icon" className="hover:bg-red-100 dark:hover:bg-red-900/50">
                                                            <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </ScrollArea>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Payment */}
                <div className="space-y-4 lg:space-y-5">
                    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm lg:sticky lg:top-0">
                        <CardHeader className="shrink-0">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <HugeiconsIcon icon={CreditCardIcon} size={20} className="text-blue-500 shrink-0" />
                                <span className="truncate">Payment Summary</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-1">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                                    <span className="font-medium">2,500</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-300">Discount</span>
                                    <span className="font-medium text-red-500">-0</span>
                                </div>
                                <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                                    <span className="font-semibold">Grand Total</span>
                                    <span className="font-bold text-lg">2,500</span>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4">
                                <Label className="text-gray-600 dark:text-gray-300">Cash Amount</Label>
                                <Input
                                    value="0"
                                    className="bg-gray-50 dark:bg-gray-700 text-lg font-medium"
                                />
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-gray-600 dark:text-gray-300">Change</span>
                                    <span className="font-medium">0</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="shrink-0">
                            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 text-lg shadow-lg">
                                <HugeiconsIcon icon={CreditCardValidationIcon} className="mr-2 h-5 w-5" />
                                Process Payment
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AppLayout>
    )
}
