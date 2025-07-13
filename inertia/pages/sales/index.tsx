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
            <div className=" grid grid-cols-1 lg:grid-cols-3 gap-5 pb-8">
                {/* Header */}
                <div className="lg:col-span-3">
                    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Sales Dashboard
                                </CardTitle>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Current transaction</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20">
                                    Invoice: YP1902090002
                                </Badge>
                                <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                                    <HugeiconsIcon icon={PrinterIcon} className="mr-2 h-4 w-4" />
                                    Print
                                </Button>
                            </div>
                        </CardHeader>
                    </Card>
                </div>

                {/* Left Column */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Customer Info Card */}
                    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <HugeiconsIcon icon={UserCheck01Icon} className="h-5 w-5 text-blue-500" />
                                <span>Customer Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-gray-600 dark:text-gray-300">Date</Label>
                                <Input value="02/09/2019" readOnly className="bg-gray-50 dark:bg-gray-700" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-600 dark:text-gray-300">Cashier</Label>
                                <Input value="Mohammad Nur Fawalq" readOnly className="bg-gray-50 dark:bg-gray-700" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <Label className="text-gray-600 dark:text-gray-300">Customer</Label>
                                <Input value="Umum" className="bg-gray-50 dark:bg-gray-700" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Product Input Card */}
                    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <HugeiconsIcon icon={BarCode01Icon} className="h-5 w-5 text-green-500" />
                                <span>Product Scanner</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Scan barcode or search product..."
                                    className="flex-1 bg-gray-50 dark:bg-gray-700"
                                />
                                <Input
                                    placeholder="Quantity..."
                                    className="flex-1 bg-gray-50 dark:bg-gray-700"
                                />
                                <Button className="bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600">
                               <HugeiconsIcon icon={Add01Icon} className="mr-2 h-4 w-4" />
                                    Add
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Product List */}
                    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <HugeiconsIcon icon={ShoppingCart01Icon} className="h-5 w-5 text-purple-500" />
                                <span>Cart Items</span>
                                <Badge className="ml-auto bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                                    1 Item
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px] rounded-md">
                                <Table>
                                    <TableHeader className="sticky top-0 bg-gray-100 dark:bg-gray-800">
                                        <TableRow>
                                            <TableHead className="w-[200px]">Product</TableHead>
                                            <TableHead className="text-right">Price</TableHead>
                                            <TableHead className="text-center">Qty</TableHead>
                                            <TableHead className="text-right">Discount</TableHead>
                                            <TableHead className="text-right">Total</TableHead>
                                            <TableHead className="text-center">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50">
                                            <TableCell className="font-medium">Alaskan Druer</TableCell>
                                            <TableCell className="text-right">2,500</TableCell>
                                            <TableCell>
                                                <Input
                                                    type="number"
                                                    value="2"
                                                    className="w-16 mx-auto text-center bg-gray-50 dark:bg-gray-700"
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">0</TableCell>
                                            <TableCell className="text-right font-medium">2,500</TableCell>
                                            <TableCell className="text-center">
                                                <Button variant="ghost" size="icon" className="hover:bg-red-100 dark:hover:bg-red-900/50">
                                                    <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Payment */}
                <div className="space-y-5">
                    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm sticky top-5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <HugeiconsIcon icon={CreditCardIcon} size={20} className="text-blue-500" />
                                <span>Payment Summary</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                                    <span className="font-medium">2,500</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Discount</span>
                                    <span className="font-medium text-red-500">-0</span>
                                </div>
                                <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
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
                                <div className="flex justify-between pt-2">
                                    <span className="text-gray-600 dark:text-gray-300">Change</span>
                                    <span className="font-medium">0</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
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

