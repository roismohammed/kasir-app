import { Minus, Trash, PlusIcon, Wallet, CreditCard, Banknote, Search, Receipt, Printer } from "lucide-react";
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { CategoriesProps, ProductProps, SalesProps } from "~/types";
import { useEffect, useState } from "react";
import { Label } from "~/components/ui/label";
import CurrencyInput from "react-currency-input-field";
import { cn } from "~/lib/utils";
import { Input } from "~/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '~/components/ui/dialog'
import ProductCard from "~/components/card-product";
import CashierHeader from "./components/header";
import { toast } from "sonner";

function PrintContent({ lastSale }: { lastSale: { id: number; items: ProductProps[]; grandTotal: number; paid: number; change: number; paymentType: string } }) {
    return (
        <div className="text-sm space-y-3 print:space-y-2">
            <div className="text-center border-b border-gray-300 pb-3">
                <h2 className="font-bold text-lg">PayLoop</h2>
                <p className="text-gray-500 text-xs">Jl. Rongdurin No. 123, Bangkalan</p>
                <p className="text-gray-500 text-xs">Telp: (021) 123-4567</p>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
                <span>INV-{lastSale.id}</span>
                <span>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="border-y border-gray-200 py-2 space-y-1.5">
                {lastSale.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-xs">
                        <div className="flex-1">
                            <span className="text-gray-800">{item.name}</span>
                            <span className="text-gray-400 ml-1">x{item.quantity}</span>
                        </div>
                        <span className="font-medium">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                    </div>
                ))}
            </div>
            <div className="space-y-1 text-xs">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>Rp {lastSale.grandTotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-gray-900 border-t border-gray-200 pt-1">
                    <span>Total</span>
                    <span>Rp {lastSale.grandTotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Bayar ({lastSale.paymentType})</span>
                    <span>Rp {lastSale.paid.toLocaleString('id-ID')}</span>
                </div>
                {lastSale.change > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                        <span>Kembali</span>
                        <span>Rp {lastSale.change.toLocaleString('id-ID')}</span>
                    </div>
                )}
            </div>
            <div className="text-center text-xs text-gray-400 border-t border-gray-200 pt-2">
                <p>Terima kasih atas pembelian Anda</p>
                <p className="mt-0.5">Barang yang sudah dibeli tidak dapat ditukar kembali</p>
            </div>
        </div>
    )
}

export default function CashierAppStatic() {
    const { products, categories } = usePage<{
        sales: SalesProps,
        products: ProductProps[],
        categories: CategoriesProps[]
    }>().props
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [cartItems, setCartItems] = useState<ProductProps[]>([])
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'cash' | 'transfer' | 'qris'>('cash')
    const [amountPaid, setAmountPaid] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [showInvoice, setShowInvoice] = useState(false);
    const [lastSale, setLastSale] = useState<{ id: number; items: ProductProps[]; grandTotal: number; paid: number; change: number; paymentType: string } | null>(null);
    const { data, setData } = useForm({
        invoice_number: 'INV-' + Date.now(),
        customer_id: '',
        payment_type: 'cash',
        discount: 0,
        tax: 0,
        notes: '',
        items: cartItems,
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('category_id');
        if (categoryId) setActiveCategory(parseInt(categoryId));
    }, []);

    const handleAddToCart = (product: ProductProps) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const handleRemove = (id: number) => setCartItems(prev => prev.filter((item) => item.id !== id));
    const handleDecrement = (id: number) =>
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) } : item
        ));

    useEffect(() => {
        const stored = localStorage.getItem('cartItems');
        if (stored) setCartItems(JSON.parse(stored));

        // Cek invoice dari sessionStorage (setelah redirect)
        const savedInvoice = sessionStorage.getItem('lastInvoice');
        if (savedInvoice) {
            setLastSale(JSON.parse(savedInvoice));
            setShowInvoice(true);
            sessionStorage.removeItem('lastInvoice');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const subTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const grandTotal = subTotal;

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);

    const openPayment = () => {
        if (cartItems.length === 0) { toast.error('Keranjang masih kosong!'); return; }
        setAmountPaid(0);
        setSelectedPaymentMethod('cash');
        setShowPayment(true);
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) { toast.error('Keranjang masih kosong!'); return; }
        if (selectedPaymentMethod === 'cash' && (!amountPaid || amountPaid < grandTotal)) {
            toast.error('Uang yang dibayar tidak cukup!');
            return;
        }

        // Ambil snapshot data sebelum submit
        const snapshotItems = [...cartItems];
        const snapshotTotal = grandTotal;
        const snapshotPaid = selectedPaymentMethod === 'cash' ? amountPaid : grandTotal;
        const snapshotChange = selectedPaymentMethod === 'cash' ? Math.max(0, amountPaid - grandTotal) : 0;
        const snapshotPayment = selectedPaymentMethod;

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
                toast.success('Transaksi berhasil');
                setCartItems([]);
                setShowPayment(false);
                setAmountPaid(0);
                setSelectedPaymentMethod('cash');
                setData({
                    invoice_number: 'INV-' + Date.now(), customer_id: '', payment_type: 'cash',
                    discount: 0, tax: 0, notes: '', items: [],
                });
                localStorage.removeItem('cartItems');
                // Pasang lastSale + showInvoice bareng di akhir
                setTimeout(() => {
                    setLastSale({
                        id: Date.now(),
                        items: snapshotItems,
                        grandTotal: snapshotTotal,
                        paid: snapshotPaid,
                        change: snapshotChange,
                        paymentType: snapshotPayment,
                    });
                    setShowInvoice(true);
                }, 300);
            },
            onError: () => toast.error('Gagal menyimpan transaksi!'),
        });
    };

    const paymentMethods = [
        { key: 'cash' as const, label: 'Tunai', icon: Banknote },
        { key: 'transfer' as const, label: 'Transfer', icon: Wallet },
        { key: 'qris' as const, label: 'QRIS', icon: CreditCard },
    ];

    return (
        <div>
            <CashierHeader />
            <Head title="Penjualan" />
            <div className="flex md:flex-row bg-gray-50 h-screen overflow-hidden">
                {/* Main Content */}
                <div className="flex-1 flex flex-col lg:mr-[420px]">
                    {/* Search & Categories */}
                    <div className="bg-white border-b border-gray-200 p-3 space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input type="search" placeholder="Cari produk..." className="pl-9 py-4 bg-gray-50 border-gray-200 focus:bg-white text-sm" />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            <button
                                onClick={() => router.visit('/sales')}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border",
                                    !activeCategory ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                )}
                            >
                                Semua
                            </button>
                            {categories.map((cat) => (
                                <button key={cat.id}
                                    onClick={() => router.visit(`/sales?category_id=${cat.id}`)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border",
                                        activeCategory === cat.id ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                    )}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1 overflow-y-auto p-3">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {products.length > 0 ? (
                                products.map((item) => (
                                    <ProductCard key={item.id} product={item} onAddToCart={handleAddToCart} />
                                ))
                            ) : (
                                <div className="col-span-full p-8 text-center text-gray-400">Belum ada produk</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Cart Sidebar */}
                <div className="w-[420px] hidden lg:flex fixed right-0 top-0 h-screen">
                    <div className="flex flex-col h-full w-full border-l border-gray-200 bg-white">
                        <div className="p-4 border-b border-gray-100">
                            <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                                <Receipt className="w-4 h-4 text-blue-600" />
                                Pesanan ({cartItems.length})
                            </h2>
                        </div>

                        <div className="flex-1 overflow-y-auto p-3 space-y-2">
                            {cartItems.length > 0 ? (
                                cartItems.map((product) => (
                                    <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg border border-gray-100 bg-white hover:border-gray-200 transition-colors">
                                        <img src={`/storage/products/${product.image}`} alt={product.name}
                                            className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-800 text-sm truncate">{product.name}</p>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                <button onClick={() => handleDecrement(product.id)}
                                                    className="w-5 h-5 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600">
                                                    <Minus size={12} />
                                                </button>
                                                <span className="text-xs font-medium w-5 text-center">{product.quantity}</span>
                                                <button onClick={() => handleAddToCart(product)}
                                                    className="w-5 h-5 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600">
                                                    <PlusIcon size={12} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-sm text-gray-900">{formatPrice(product.price * product.quantity)}</p>
                                            <button onClick={() => handleRemove(product.id)}
                                                className="text-gray-300 hover:text-red-500 transition-colors mt-1">
                                                <Trash size={12} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-400 text-sm">Belum ada item</div>
                            )}
                        </div>

                        {/* Bottom: total + bayar button */}
                        <div className="border-t border-gray-100 p-4 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-medium text-gray-800">{formatPrice(subTotal)}</span>
                            </div>
                            <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-100 pt-3">
                                <span>Total</span>
                                <span className="text-blue-600">{formatPrice(grandTotal)}</span>
                            </div>
                            <button
                                disabled={cartItems.length === 0}
                                onClick={openPayment}
                                className="w-full py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl transition-colors cursor-pointer"
                            >
                                Bayar {formatPrice(grandTotal)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <Dialog open={showPayment} onOpenChange={setShowPayment}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-lg">
                            <Receipt className="w-5 h-5 text-blue-600" />
                            Pembayaran
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-5">
                        {/* Metode Pembayaran */}
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-3">Metode Pembayaran</p>
                            <div className="grid grid-cols-3 gap-2">
                                {paymentMethods.map((method) => (
                                    <button key={method.key}
                                        className={cn(
                                            'py-3 flex flex-col items-center justify-center border rounded-xl text-sm transition-colors',
                                            selectedPaymentMethod === method.key
                                                ? method.key === 'cash' ? 'bg-blue-50 border-blue-300 text-blue-700'
                                                    : method.key === 'transfer' ? 'bg-green-50 border-green-300 text-green-700'
                                                        : 'bg-purple-50 border-purple-300 text-purple-700'
                                                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                                        )}
                                        onClick={() => {
                                            setSelectedPaymentMethod(method.key);
                                            if (method.key !== 'cash') setAmountPaid(grandTotal);
                                            else setAmountPaid(0);
                                        }}
                                    >
                                        <method.icon className="w-5 h-5 mb-1" />
                                        <span className="text-xs font-medium">{method.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Cash Input */}
                        {selectedPaymentMethod === 'cash' && (
                            <div className="space-y-2">
                                <Label className="text-sm text-gray-600">Uang Diterima</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">Rp</span>
                                    <input
                                        type="number"
                                        value={amountPaid || ''}
                                        onChange={(e) => setAmountPaid(Number(e.target.value))}
                                        placeholder="0"
                                        className="w-full py-3 pl-10 pr-3 text-lg font-semibold rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
                                        autoFocus
                                    />
                                </div>
                                {/* Quick amount buttons */}
                                <div className="flex gap-2 flex-wrap">
                                    {[
                                        { label: 'Rp20.000', value: 20000 },
                                        { label: 'Rp50.000', value: 50000 },
                                        { label: 'Rp100.000', value: 100000 },
                                        { label: 'Tepat', value: grandTotal },
                                    ].map((btn) => (
                                        <button
                                            key={btn.value}
                                            type="button"
                                            onClick={() => setAmountPaid(btn.value)}
                                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                                                amountPaid === btn.value
                                                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            {btn.label}
                                        </button>
                                    ))}
                                </div>
                                {amountPaid >= grandTotal && (
                                    <div className="flex justify-between items-center bg-green-50 border border-green-200 rounded-xl p-3">
                                        <span className="text-sm text-green-700 font-medium">Kembalian</span>
                                        <span className="text-lg font-bold text-green-600">{formatPrice(amountPaid - grandTotal)}</span>
                                    </div>
                                )}
                                {amountPaid > 0 && amountPaid < grandTotal && (
                                    <div className="text-xs text-red-500">Kurang {formatPrice(grandTotal - amountPaid)}</div>
                                )}
                            </div>
                        )}

                        {/* Total */}
                        <div className="border-t border-gray-100 pt-3 space-y-1.5">
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Subtotal</span>
                                <span>{formatPrice(subTotal)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-900">
                                <span>Total</span>
                                <span className="text-blue-600">{formatPrice(grandTotal)}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => setShowPayment(false)} className="py-3.5 text-sm font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors cursor-pointer">
                                Batal
                            </button>
                            <button
                                disabled={isSubmitting || (selectedPaymentMethod === 'cash' && (!amountPaid || amountPaid < grandTotal))}
                                onClick={handleCheckout}
                                className="py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl transition-colors cursor-pointer"
                            >
                                {isSubmitting ? 'Memproses...' : `Bayar Rp ${grandTotal.toLocaleString('id-ID')}`}
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Invoice Modal */}
            {showInvoice && lastSale && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 print:bg-white print:!block print:!p-0 animate-fade-in" id="invoice-modal">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6 print:!rounded-none print:!shadow-none print:!max-w-full print:!mx-0 print:!p-4 print:!min-h-screen animate-scale-in">
                        <div className="print:hidden flex justify-end gap-2 mb-3">
                            <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2 cursor-pointer active:scale-95 transition-all">
                                <Printer className="w-4 h-4" /> Print
                            </button>
                            <button onClick={() => { setShowInvoice(false); setLastSale(null); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm cursor-pointer active:scale-95 transition-all">
                                Tutup
                            </button>
                        </div>
                        <PrintContent lastSale={lastSale} />
                    </div>
                </div>
            )}
        </div>
    );
}
