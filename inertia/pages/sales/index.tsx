import {
    Utensils,
    GlassWater,
    Minus,
    Trash,
    PlusIcon,
    BoxIcon,
    Wallet,
    CreditCard,
    Banknote,
    RefreshCw,
    Search,
    UploadCloud,
} from "lucide-react";
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { CategoriesProps, ProductProps, SalesProps } from "~/types";
import { useEffect, useState } from "react";
import { Label } from "~/components/ui/label";
import { CreditCardIcon } from "@hugeicons/core-free-icons";
import CurrencyInput from "react-currency-input-field";
import { cn } from "~/lib/utils";
import { Input } from "~/components/ui/input";

import ProductCard from "~/components/card-product";
import CashierHeader from "./components/header";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
export default function CashierAppStatic() {
    const { products, categories } = usePage<{
        sales: SalesProps,
        products: ProductProps[],
        categories: CategoriesProps[]
    }>().props
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [cartItems, setCartItems] = useState<ProductProps[]>([])
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'transfer' | 'cash'>('cash')
    const [amountPaid, setAmountPaid] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data, setData, processing } = useForm({
        invoice_number: 'INV-' + Date.now(),
        customer_id: '',
        payment_type: 'cash',
        discount: 0,
        tax: 0,
        // total_price: grandTotal,
        // grand_total: grandTotal,
        notes: '',
        items: cartItems,
    });

    // const pay = () => {
    //     router.post('/payments/midtrans', {
    //         order_id: 'ORDER-' + Date.now(),
    //         amount: 150000,
    //         customer: {
    //             name: 'Roisdev',
    //             email: 'roisdev@mail.com',
    //         }
    //     }, {
    //         onSuccess: (page) => {
    //             window.snap.pay(page.props.token)
    //         }
    //     })
    // }


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('category_id');
        if (categoryId) {
            setActiveCategory(parseInt(categoryId));
        }
        { preserveState: true }
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
    const grandTotal = subTotal;
    console.log("GrandTotal:", grandTotal)

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
    }

    const handlePaymentMethodChange = (method: 'card' | 'transfer' | 'cash') => {
        setSelectedPaymentMethod(method);
        setData('payment_type', method);

        if (method !== 'cash') {
            setAmountPaid(grandTotal);
        } else if (method == 'cash') {

        }
        else {
            setAmountPaid(0);
        }
    };

    const resetAfterSuccess = () => {
        setCartItems([]);
        setAmountPaid(0);
        setSelectedPaymentMethod('cash');

        setData({
            invoice_number: 'INV-' + Date.now(),
            customer_id: '',
            payment_type: 'cash',
            discount: 0,
            tax: 0,
            notes: '',
            items: [],
        });

        // hapus cart dari localStorage
        localStorage.removeItem('cartItems');
    };


    const handleCheckout = (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault?.();

        if (cartItems.length === 0) {
            toast.error('Keranjang masih kosong!');
            return;
        }

        if (selectedPaymentMethod === 'cash' && (!amountPaid || amountPaid < grandTotal)) {
            toast.error('Uang yang dibayar tidak cukup!');
            return;
        }

        const orderData = {
            ...data,
            payment_type: selectedPaymentMethod,
            total_price: grandTotal,
            grand_total: grandTotal,
            items: cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price
            })),
            amount_paid: selectedPaymentMethod === 'cash' ? amountPaid : grandTotal,
            change_amount: selectedPaymentMethod === 'cash' ? Math.max(0, amountPaid - grandTotal) : 0
        };

        router.post('/sales', orderData, {
            preserveScroll: true,
            forceFormData: false,
            onStart: () => setIsSubmitting(true),
            onFinish: () => setIsSubmitting(false),
            onSuccess: () => {
                toast.success('Transaksi berhasil')
                resetAfterSuccess()
            },
            onError: (errors) => {
                toast.error('Gagal menyimpan transaksi!');
                console.error(errors);
            },
        });
    };
    return (
        <div>
            <CashierHeader />
            <Head title="Penjualan" />
            <div className="flex md:flex-row bg-slate-100 h-screen overflow-hidden">
                {/* Main Content */}
                <div className="flex-1 flex flex-col lg:pr-[500px] bg-slate-100">
                    {/* Fixed Header Section */}
                    <div className="bg-slate-100 p-4 space-y-4">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                type="search"
                                placeholder="Cari produk, pelanggan, atau transaksi..."
                                className="pl-8 py-6 bg-slate-100 rounded-xl shadow-none border-gray-200 focus:bg-slate-100"
                            />
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                            {categories.map((categories: CategoriesProps) => (
                                <button
                                    key={categories.id}
                                    onClick={() => {
                                        router.visit(`/sales?category_id=${categories.id}`)
                                    }}
                                    className={`flex flex-col sm:flex-row cursor-pointer items-center justify-center sm:justify-start w-full px-1 sm:px-2 py-2 sm:py-2 rounded-lg shadow-none transition-colors ${isActive(categories.id)
                                            ? "bg-white text-purple-600 border border-purple-600"
                                            : "bg-slate-100 text-gray-700 hover:bg-white border border-gray-200"
                                        }`}
                                >
                                    <div className="flex flex-col items-center sm:items-start">
                                        <span className="text-xs sm:text-sm flex gap-2 font-medium whitespace-nowrap">
                                            <div className={`bg-purple-600 text-white rounded-md p-1 ${isActive(categories.id) ? "bg-purple-600" : ""}`}>
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
                                        <span className={`text-[10px] sm:text-xs ${categories.active ? "text-purple-100" : "text-gray-500"}`}>
                                            {categories.stock}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <h2 className="text-lg font-semibold mb-3 text-gray-800">Lunch Menu</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-2 pb-4">
                            {products.length > 0 ? (
                                products.map((item) => (
                                    <ProductCard key={item.id} product={item} onAddToCart={handleAddToCart} />
                                ))
                            ) : (
                                <div className="p-4 w-full flex flex-col items-center justify-center border border-slate-200 rounded-lg">
                                    <h3 className="font-semibold text-gray-800 mb-1 text-center self-center">
                                        Belum ada produk
                                    </h3>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Desktop Sidebar */}
                <div className="w-full hidden lg:flex lg:w-[500px] fixed right-0 top-0 h-screen">
                    <div className="flex flex-col h-full w-full border-l border-gray-200 bg-white">
                        <div className="p-6 flex-1 flex flex-col overflow-hidden">
                            <h2 className="text-xl font-semibold mb-6 text-gray-800">Order Items ({cartItems.length})</h2>
                            <div className="flex-1 pr-2 max-h-[350px] overflow-y-auto">
                                {cartItems.length > 0 ? (
                                    cartItems.map((product) => (
                                        <div key={product.id} className="flex items-start space-x-3 mb-4 p-2 rounded-lg border border-purple-600/50">
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

                        <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-500px)] scrollbar-hide">
    <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <HugeiconsIcon icon={CreditCardIcon} className="w-5 h-5 text-purple-600" />
            Pilih Metode Pembayaran
        </h3>
        <div className="grid grid-cols-3 gap-3">
            {/* Tunai Button */}
            <button
                className={cn(
                    'p-3 flex flex-col items-center justify-center border rounded-xl',
                    selectedPaymentMethod === 'cash' ? 'bg-blue-50 border-blue-300' : 'hover:border-blue-300 hover:bg-blue-50 transition-all'
                )}
                onClick={() => handlePaymentMethodChange('cash')}
            >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <Banknote className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium">Tunai</span>
            </button>

            {/* Transfer Button */}
            <button
                className={cn(
                    'p-3 flex flex-col items-center justify-center border rounded-xl',
                    selectedPaymentMethod === 'transfer' ? 'bg-green-50 border-green-300' : 'hover:border-green-300 hover:bg-green-50 transition-all'
                )}
                onClick={() => handlePaymentMethodChange('transfer')}
            >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <Wallet className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium">Transfer</span>
            </button>

            {/* QRIS Button */}
            <button
                className={cn(
                    'p-3 flex flex-col items-center justify-center border rounded-xl',
                    selectedPaymentMethod === 'qris' ? 'bg-purple-50 border-purple-300' : 'hover:border-purple-300 hover:bg-purple-50 transition-all'
                )}
                onClick={() => handlePaymentMethodChange('qris')}
            >
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm-2 14h8v-8H3v8zm2-6h4v4H5v-4zm8-10v8h8V3h-8zm6 6h-4V5h4v4zm-6 4h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm2-2h2v2h-2v-2zm0-2h2v2h-2v-2zm-2-2h2v2h-2v-2z"/>
                    </svg>
                </div>
                <span className="text-sm font-medium">QRIS</span>
            </button>
        </div>

        {/* Cash Payment Form */}
        {selectedPaymentMethod === "cash" && (
            <div className="mt-6 space-y-4 w-full">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-purple-600" />
                    Pembayaran Tunai
                </h3>

                <div className="space-y-2">
                    <Label htmlFor="amount-paid" className="text-gray-700 font-medium">
                        Jumlah Uang Diterima
                    </Label>
                    <div className="relative">
                        <span className="absolute text-lg left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none select-none">
                            Rp
                        </span>
                        <CurrencyInput
                            name="amount-paid"
                            autoComplete="off"
                            value={amountPaid}
                            onValueChange={(value) => {
                                const numericValue = Number(value || 0)
                                setAmountPaid(numericValue)
                            }}
                            id="amount-paid"
                            type="text"
                            placeholder="0"
                            className="w-full text-lg py-2 pl-10 pr-4 text-gray-800 rounded-xl bg-gray-50 border border-gray-200 
                focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
                        />
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-sm w-full">
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
        )}

        {/* Transfer Payment */}
        {selectedPaymentMethod === "transfer" && (
            <div className="mt-6 space-y-4 w-full">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-purple-600" />
                    Pembayaran Transfer
                </h3>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="bank" className="text-gray-700 font-medium">
                            Pilih Bank
                        </Label>
                        <Select>
                            <SelectTrigger className="w-full py-2 px-4 text-gray-800 rounded-xl bg-gray-50 border border-gray-200 
                focus:border-green-300 focus:ring-2 focus:ring-green-100">
                                <SelectValue placeholder="Pilih bank tujuan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bca">BCA</SelectItem>
                                <SelectItem value="mandiri">Mandiri</SelectItem>
                                <SelectItem value="bri">BRI</SelectItem>
                                <SelectItem value="bni">BNI</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="bg-green-50 border border-gray-300 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-lg border border-gray-300">
                                <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                                    <Wallet className="w-5 h-5 text-green-600" />
                                </div>
                            </div>
                            <div>
                                <p className="font-medium text-gray-700">Bank Central Asia</p>
                                <p className="text-sm text-gray-500">123-456-7890 (a.n. Mr Shoop)</p>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2">
                            <Label className="text-gray-700 font-medium">
                                Total Transfer
                            </Label>
                            <div className="text-2xl font-bold text-green-600">
                                {formatPrice(grandTotal)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* QRIS Payment */}
        {selectedPaymentMethod === "qris" && (
            <div className="mt-6 space-y-4 w-full">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm-2 14h8v-8H3v8zm2-6h4v4H5v-4zm8-10v8h8V3h-8zm6 6h-4V5h4v4zm-6 4h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm2-2h2v2h-2v-2zm0-2h2v2h-2v-2zm-2-2h2v2h-2v-2z"/>
                    </svg>
                    Pembayaran QRIS
                </h3>

                <div className="bg-white border border-gray-300 rounded-2xl p-6 space-y-4">
                    {/* QR Code */}
                    <div className="flex justify-center">
                        <div className="bg-white p-4 rounded-xl border-4 border-purple-600 shadow-lg">
                            <img 
                                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020101021126660014ID.CO.QRIS.WWW0114ID0000000000000215ID2023010100000303UMI51440014ID.CO.TELKOM.WWW021893600000000000000030303UMI5204549953033605802ID5909Mr%20Shoop6008Surabaya61056100062070703A016304ABCD"
                                alt="QRIS Code"
                                className="w-48 h-48"
                            />
                        </div>
                    </div>

                    {/* Merchant Info */}
                    <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-purple-600">MS</span>
                            </div>
                            <h4 className="font-semibold text-gray-800">Mr Shoop</h4>
                        </div>
                        <p className="text-sm text-gray-500">Scan QR Code untuk pembayaran</p>
                    </div>

                    {/* Total Amount */}
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-gray-300 rounded-xl p-4">
                        <div className="text-center space-y-1">
                            <p className="text-sm text-gray-600">Total Pembayaran</p>
                            <p className="text-3xl font-bold text-purple-600">
                                {formatPrice(grandTotal)}
                            </p>
                        </div>
                    </div>

                    {/* Supported Apps */}
                    <div className="space-y-2">
                        <p className="text-xs text-gray-500 text-center">Didukung oleh:</p>
                        <div className="flex justify-center items-center gap-3 flex-wrap">
                            <div className="px-3 py-1 bg-gray-50 rounded-lg border border-gray-300">
                                <span className="text-xs font-medium text-gray-700">GoPay</span>
                            </div>
                            <div className="px-3 py-1 bg-gray-50 rounded-lg border border-gray-300">
                                <span className="text-xs font-medium text-gray-700">OVO</span>
                            </div>
                            <div className="px-3 py-1 bg-gray-50 rounded-lg border border-gray-300">
                                <span className="text-xs font-medium text-gray-700">DANA</span>
                            </div>
                            <div className="px-3 py-1 bg-gray-50 rounded-lg border border-gray-300">
                                <span className="text-xs font-medium text-gray-700">LinkAja</span>
                            </div>
                            <div className="px-3 py-1 bg-gray-50 rounded-lg border border-gray-300">
                                <span className="text-xs font-medium text-gray-700">ShopeePay</span>
                            </div>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-50 border border-gray-300 rounded-xl p-3">
                        <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-xs text-blue-800 space-y-1">
                                <p className="font-medium">Cara Pembayaran:</p>
                                <ol className="list-decimal list-inside space-y-0.5 text-blue-700">
                                    <li>Buka aplikasi e-wallet Anda</li>
                                    <li>Pilih menu Scan/Bayar</li>
                                    <li>Scan QR code di atas</li>
                                    <li>Konfirmasi pembayaran</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
</div>
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
                            <button
                                disabled={cartItems.length === 0}
                                onClick={handleCheckout}
                                className={`w-full cursor-pointer h-14 text-white text-lg font-semibold rounded-xl transition-all active:scale-[0.98] shadow-sm 
                            ${cartItems.length === 0
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl"
                                    }`}
                            >
                                Bayar {formatPrice(grandTotal)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}