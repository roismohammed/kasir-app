import {
    Utensils,
    Plus,
    GlassWater,
    CreditCard,
    Wallet,
    Minus,
    Trash,
    PlusIcon,
    BoxIcon,
    Banknote,
    CheckCircle,
    RefreshCw,
    Circle,
    Printer,
} from "lucide-react";
import AppLayout from "~/layouts/app-layout";
import sajiku from '../../assets/image/makanan.jpeg'
import { Head, router, usePage } from '@inertiajs/react';
import { CategoriesProps, ProductProps, SalesProps } from "~/types";
import { useEffect, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Badge } from "~/components/ui/badge";
import { CreditCardIcon, CreditCardValidationIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import CurrencyInput from "react-currency-input-field";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
const breadcrumbs = [
    {
        title: "Beranda",
        url: "/",
    },
    {
        title: "Cashier",
        url: "/sales",
    },
    {
        title: "Order",
        url: "/sales/order",
    },
];

export default function CashierAppStatic() {
    const { sales, products, categories } = usePage<{
        sales: SalesProps,
        products: ProductProps,
        categories: CategoriesProps[]
    }>().props
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [cartItems, setCartItems] = useState<ProductProps[]>([])
    const [amountPaid, setAmountPaid] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [openModal, setOpenModal] = useState(false)

    const handleSubmitOrder = () => {
        if (amountPaid < grandTotal) {
            alert('Jumlah uang tidak cukup!')
            return
        }

        console.log({ customerName, amountPaid, total: grandTotal })
        setOpenModal(true)
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('category_id');
        if (categoryId) {
            setActiveCategory(parseInt(categoryId));
        }
    }, []);

    const isActive = (id: number) => {
        return activeCategory === id;
    }

    const handleAddToCart = (product: ProductProps) => {
        const existing = cartItems.find(item => item.id === product.id);
        if (existing) {
            const quantity = existing ? existing.quantity + 1 : 1;
            setCartItems(cartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity }
                    : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const handleRemove = (id: number) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    }

    const handleDecrement = (id: number) => {
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: (item.quantity || 1) - 1 } : item))
    }

    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const subTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const pajak = subTotal - subTotal / 1.1;
    const grandTotal = subTotal;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Penjualan" />
            <div className="flex flex-col md:flex-row gap-4 ">
                {/* Main Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* <div className="mb-4">
                        <Input placeholder="Cari product di sini.."  className="shadow-none"/>
                    </div> */}
                    <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                        {categories.map((categories: CategoriesProps) => (
                            <button
                                key={categories.id}
                                onClick={() => {
                                    router.visit(`/sales?category_id=${categories.id}`)
                                }}
                                className={`flex flex-col sm:flex-row cursor-pointer items-center justify-center sm:justify-start w-full px-1 sm:px-2 py-2 sm:py-2 rounded-lg shadow-sm transition-colors ${isActive(categories.id) ? "bg-white text-purple-600 border border-purple-600" : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                                    }`}
                            >
                                {/* Text - Centered on mobile */}
                                <div className="flex flex-col items-center sm:items-start">
                                    <span className="text-xs sm:text-sm flex gap-2 font-medium whitespace-nowrap">
                                        <div className={`bg-purple-600 text-white rounded-md p-1 ${isActive(categories.id) ? " bg-text-purple-600" : ""}`}>
                                            {(() => {
                                                switch (categories.name.toLowerCase()) {
                                                    case "makanan":
                                                        return <Utensils size={20} />
                                                    case "minuman":
                                                        return <GlassWater size={20} />
                                                    case "barang":
                                                        return <BoxIcon size={20} />
                                                    default:
                                                        return <BoxIcon size={20} />
                                                }
                                            })()}
                                        </div>
                                        {categories.name}
                                    </span>
                                    <span className={`text-[10px] sm:text-xs ${categories.active ? "text-purple-100" : "text-gray-500"
                                        }`}>
                                        {categories.stock}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                    <h2 className="text-lg font-semibold mb-3 text-gray-800">Lunch Menu</h2>


                    {/* Menu Items Grid - Changes on mobile */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {products.length > 0 ? (
                                products.map((item: any) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-row md:flex-col rounded-lg overflow-hidden shadow-md bg-white py-0 px-2 lg:px-0 border border-slate-200 lg:p-0 "
                                    >
                                        <img
                                            src={`/storage/products/${item.image}`}
                                            alt={item.name}
                                            className=" h-[100px] w-[130px] md:w-full md:h-45 object-cover flex-shrink-0 rounded-lg lg:rounded-tr-lg  mt-3 md:mt-0 lg:mt-0"
                                        />
                                        <div className="p-3 md:p-4 flex flex-col justify-between flex-grow">
                                            <div>
                                                <h3 className="font-semibold text-gray-800 mb-1">
                                                    {item.name}
                                                </h3>
                                                <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between mt-auto">
                                                <span className="font-bold text-gray-900">
                                                    {formatPrice(item.price)}
                                                </span>
                                                <button
                                                    className="w-8 h-8 rounded-full shadow-md cursor-pointer bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center transition-colors"
                                                    onClick={() => handleAddToCart(item)}
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 w-full flex flex-col items-center justify-center border border-slate-200 ">
                                    <h3 className="font-semibold text-gray-800 mb-1 text-center self-center">
                                        Belum ada produk
                                    </h3>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Desktop Sidebar */}
                <div className="w-full md:w-96 hidden md:block">
                    <div className="flex flex-col h-[calc(92vh-32px)] border border-gray-200 rounded-lg shadow-lg bg-white sticky top-4">
                        <div className="p-6 flex-1 flex flex-col overflow-hidden">
                            <h2 className="text-xl font-semibold mb-6 text-gray-800">Order Items ({cartItems.length})</h2>
                            <div className="flex-1 pr-2 max-h-[350px] overflow-y-scroll">
                                {cartItems.length > 0 ? (
                                    cartItems.map((product) => (
                                        <div key={product.id} className="flex items-start space-x-3 mb-4 p-2 rounded-lg border  border-purple-600/50">
                                            <img
                                                src={`/storage/products/${product.image}`}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                                            />
                                            <div className="flex-grow">
                                                <h3 className="font-medium text-gray-800">{product.name}</h3>
                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => handleDecrement(product.id)}
                                                            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                                                        >
                                                            <Minus size={16} />
                                                        </button>
                                                        <span className="text-xs text-gray-500">{product.quantity}</span>
                                                        <button
                                                            onClick={() => handleAddToCart(product)}
                                                            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                                                        >
                                                            <PlusIcon size={16} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemove(product.id)}
                                                        className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                                                    >
                                                        <Trash size={16} className="text-red-500" />
                                                    </button>
                                                </div>
                                            </div>
                                            <span className="font-semibold text-gray-900">
                                                {formatPrice(product.price * (product.quantity || 1))}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="h-full flex items-center justify-center min-h-[280px]">
                                        <div className="text-gray-400 text-sm text-center">Belum ada item di keranjang</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment Summary */}
                        <div className="p-6 border-t">
                            <div className="space-y-2 text-sm text-gray-700 bg-muted p-4 rounded-xl mb-4">
                                <div className="flex justify-between">
                                    <span>Sub Total</span>
                                    <span>{Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(subTotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>$5.2</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg text-gray-900 mt-4 border-t border-gray-300 pt-4">
                                    <span>Total Payment</span>
                                    <span>{Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(grandTotal)}</span>
                                </div>
                            </div>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <button className="w-full cursor-pointer h-14 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold hover:from-purple-700 hover:to-indigo-700 rounded-xl transition-all  hover:shadow-xl active:scale-[0.98]">
                                        Bayar {formatPrice(grandTotal)}
                                    </button>
                                </SheetTrigger>

                                <SheetContent className="bg-white max-w-xl w-full p-0 overflow-y-auto">
                                    <div className="sticky top-0 bg-white z-10 border-b px-4 pb-4 shadow-sm">
                                        <SheetHeader>
                                            <SheetTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                                <HugeiconsIcon icon={CreditCardValidationIcon} className="w-6 -mt-1 h-6 text-purple-600" />
                                                Pembayaran
                                            </SheetTitle>
                                        </SheetHeader>

                                        <div className="mt-2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-5 border border-purple-100 ">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-gray-600">Total Tagihan</span>
                                                <span className="font-medium text-gray-800 text-lg">
                                                    {Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(grandTotal)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center mt-3 pt-3 border-t border-purple-100">
                                                <span className="text-gray-600">Status Pembayaran</span>
                                                <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-600">
                                                    <Circle className="w-2 h-2 mr-2 animate-pulse" />
                                                    Belum Dibayar
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="p-6 space-y-8">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <HugeiconsIcon icon={CreditCardIcon} className="w-5 h-5 text-purple-600" />
                                                Pilih Metode Pembayaran
                                            </h3>
                                            <div className="grid grid-cols-3 gap-3">
                                                <button className="p-3 flex flex-col items-center justify-center border rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                                        <CreditCard className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <span className="text-sm font-medium">Kartu</span>
                                                </button>
                                                <button className="p-3 flex flex-col items-center justify-center border rounded-xl hover:border-green-300 hover:bg-green-50 transition-all">
                                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                                        <Wallet className="w-5 h-5 text-green-600" />
                                                    </div>
                                                    <span className="text-sm font-medium">Transfer</span>
                                                </button>
                                                <button className="p-3 flex flex-col items-center justify-center border rounded-xl bg-blue-50 border-blue-200 hover:bg-blue-100 transition-all">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                                        <Banknote className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <span className="text-sm font-medium">Tunai</span>
                                                </button>
                                            </div>
                                        </div>


                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                                <Banknote className="w-5 h-5 text-purple-600" />
                                                Pembayaran Tunai
                                            </h3>

                                            <div className="space-y-2">
                                                <Label htmlFor="amount-paid" className="text-gray-700 font-medium">
                                                    Jumlah Uang Diterima
                                                </Label>
                                                <div className="relative">
                                                    {/* Label "Rp" di dalam input */}
                                                    <span className="absolute text-lg left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none select-none ">
                                                        Rp
                                                    </span>

                                                    <CurrencyInput
                                                        name="amount-paid"
                                                        autoComplete="off"
                                                        value={amountPaid}
                                                        onValueChange={(value) => setAmountPaid(value)}
                                                        id="amount-paid"
                                                        type="text"
                                                        placeholder="0"
                                                        className="w-full text-lg py-2 pl-10 pr-4 text-gray-800 rounded-xl bg-gray-50 border border-gray-200 
    focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
                                                    />
                                                </div>

                                            </div>

                                            {/* Change Calculation */}
                                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-sm">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <RefreshCw className="w-4 h-4 text-green-600" />
                                                        <span className="font-medium text-gray-700">Kembalian</span>
                                                    </div>
                                                    <span className="text-2xl font-bold text-green-600">
                                                        {formatPrice(Math.max(0, amountPaid - grandTotal))}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Sticky Footer */}
                                    <div className="fixed w-96 bottom-0 bg-white border-t pt- shadow-lg">
                                        <SheetFooter>
                                            <button
                                                onClick={handleSubmitOrder}
                                                className="w-full h-14 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold 
            hover:from-purple-700 hover:to-indigo-700 rounded-xl transition-all shadow-lg hover:shadow-xl
            flex items-center justify-center active:scale-[0.98]"
                                            >
                                                <CheckCircle className="w-5 h-5 mr-2" />
                                                <span>Bayar Sekarang</span>
                                            </button>
                                            {/* <SheetClose asChild>
                                                <Button
                                                    variant="outline"
                                                    className="w-full mt-3 h-12 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100"
                                                >
                                                    Batalkan Transaksi
                                                </Button>
                                            </SheetClose> */}
                                        </SheetFooter>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>

                {/* Mobile Bottom Panel */}
                <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow-lg p-4">
                    {/* Mobile Invoice Items - Horizontal Scroll */}
                    <div className="overflow-x-auto whitespace-nowrap pb-2">
                        <div className="inline-flex space-x-3">
                            {[1, 2].map((item) => (
                                <div key={item} className="inline-flex items-center space-x-2 p-2 border rounded-lg">
                                    <img
                                        src={sajiku}
                                        alt="Spicy Fried Chicken"
                                        className="w-12 h-12 object-cover rounded-md"
                                    />
                                    <div>
                                        <div className="font-medium">Spicy Fried Chicken</div>
                                        <div className="text-xs text-gray-500">2x • $45.7</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <div>
                            <span className="text-gray-600">Total</span>
                            <span className="font-bold text-lg ml-2">$136.4</span>
                        </div>
                        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>

            <AlertDialog open={openModal} onOpenChange={setOpenModal}>
                <AlertDialogContent className="max-w-md rounded-2xl">
                    <div className="p-6 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>

                        <AlertDialogHeader className="space-y-2">
                            <AlertDialogTitle className="text-2xl text-center font-bold text-gray-900">
                                Transaksi Berhasil!
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-600">
                                Pembayaran sebesar{' '}
                                <span className="font-semibold text-purple-600">
                                    {Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR'
                                    }).format(grandTotal)}
                                </span>{' '}
                                telah berhasil diproses.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <div className="mt-6 space-y-3 text-sm text-left bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="flex justify-between">
                                <span className="text-gray-500">No. Transaksi</span>
                                <span className="font-medium">TRX-{Date.now().toString().slice(-6)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Tanggal</span>
                                <span className="font-medium">
                                    {new Date().toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Metode</span>
                                <span className="font-medium">Tunai</span>
                            </div>
                        </div>

                        <AlertDialogFooter className="mt-6 flex flex-col sm:flex-row gap-3">
                            <AlertDialogCancel className="w-full bg-white border-gray-300 hover:bg-gray-50 text-gray-700">
                                Tutup
                            </AlertDialogCancel>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700 gap-2">
                                <Printer className="h-4 w-4" />
                                Cetak Struk
                            </Button>
                        </AlertDialogFooter>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
