import {
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Label } from "~/components/ui/label";
import { CreditCardIcon, CreditCardValidationIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import CurrencyInput from "react-currency-input-field";
import { cn } from "~/lib/utils";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useRef, useState } from "react";
import {
    CreditCard,
    Wallet,
    Banknote,
    CheckCircle,
    RefreshCw,
    UploadCloud,
    Calendar,
    Hash,
    ArrowRight,
    Printer,
} from "lucide-react";
import { router, useForm } from '@inertiajs/react';
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ProductProps } from "~/types";
import { Button } from "~/components/ui/button";
import { useReactToPrint } from "react-to-print";
import Invoice from "./invoice";
interface SheetTransactionProps {
    cartItems: ProductProps[];
    grandTotal: number;
    onSuccess: () => void;
    setOpenSheet: (open: boolean) => void;
}

export default function SheetTransaction({
    cartItems = [],
    grandTotal = 0,
    onSuccess,
    setOpenSheet,
}: SheetTransactionProps) {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'transfer' | 'cash'>('cash')
    const [amountPaid, setAmountPaid] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const { data, setData, processing } = useForm({
        invoice_number: 'INV-' + Date.now(),
        customer_id: '',
        payment_type: 'cash',
        discount: 0,
        tax: 0,
        total_price: grandTotal,
        grand_total: grandTotal,
        notes: '',
        items: cartItems,
    });
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    const invoiceDate = new Date().toLocaleDateString("id-ID")
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
    }

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
                setOpenModal(true);
                setOpenSheet(false);
                toast.success('Transaksi berhasil disimpan!');
            },
            onError: (errors) => {
                toast.error('Gagal menyimpan transaksi!', errors);
            },
        });
    };

    const handlePaymentMethodChange = (method: 'card' | 'transfer' | 'cash') => {
        setSelectedPaymentMethod(method);
        setData('payment_type', method);

        if (method !== 'cash') {
            setAmountPaid(grandTotal);
        } else {
            setAmountPaid(0);
        }
    };

    return (
        <div>
            <div>
                <SheetContent className="bg-white max-w-xl w-full p-0 overflow-y-auto">
                    <div className="sticky top-0 bg-white z-10 border-b px-4 pb-4 shadow-sm">
                        <SheetHeader>
                            <SheetTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <HugeiconsIcon icon={CreditCardValidationIcon} className="w-6 -mt-1 h-6 text-purple-600" />
                                Pembayaran
                            </SheetTitle>
                        </SheetHeader>

                        <div className="mt-2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-5 border border-purple-100 ">
                            <div className="flex justify-between items-center mb-">
                                <span className="text-gray-600">Total Tagihan</span>
                                <span className=" text-gray-800 text-lg font-bold">
                                    {formatPrice(grandTotal)}
                                </span>
                            </div>
                        </div>
                    </div>


                    <div className="p-6 space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <HugeiconsIcon icon={CreditCardIcon} className="w-5 h-5 text-purple-600" />
                                Pilih Metode Pembayaran
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                <button className={cn(
                                    'p-3 flex flex-col items-center justify-center border rounded-xl',
                                    selectedPaymentMethod === 'card' ? 'bg-purple-50 border-purple-300' : 'hover:border-purple-300 hover:bg-purple-50 transition-all'
                                )} onClick={() => handlePaymentMethodChange('card')}>
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                        <CreditCard className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span className="text-sm font-medium">Kartu</span>
                                </button>

                                <button className={cn(
                                    'p-3 flex flex-col items-center justify-center border rounded-xl',
                                    selectedPaymentMethod === 'transfer' ? 'bg-green-50 border-green-300' : 'hover:border-green-300 hover:bg-green-50 transition-all'
                                )} onClick={() => handlePaymentMethodChange('transfer')}>
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                        <Wallet className="w-5 h-5 text-green-600" />
                                    </div>
                                    <span className="text-sm font-medium">Transfer</span>
                                </button>

                                <button className={cn(
                                    'p-3 flex flex-col items-center justify-center border rounded-xl',
                                    selectedPaymentMethod === 'cash' ? 'bg-blue-50 border-blue-200' : 'hover:border-blue-300 hover:bg-blue-50 transition-all'
                                )} onClick={() => handlePaymentMethodChange('cash')}>
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                        <Banknote className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span className="text-sm font-medium">Tunai</span>
                                </button>
                            </div>

                            {selectedPaymentMethod === "card" && (
                                <div className="mt-6 space-y-4 w-full">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-purple-600" />
                                        Pembayaran Kartu
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="card-number" className="text-gray-700 font-medium">
                                                    Nomor Kartu
                                                </Label>
                                                <Input
                                                    id="card-number"
                                                    type="text"
                                                    placeholder="1234 5678 9012 3456"
                                                    className="w-full py-2 px-4 text-gray-800 rounded-xl bg-gray-50 border border-gray-200 
                focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="card-name" className="text-gray-700 font-medium">
                                                    Nama di Kartu
                                                </Label>
                                                <Input
                                                    id="card-name"
                                                    type="text"
                                                    placeholder="John Doe"
                                                    className="w-full py-2 px-4 text-gray-800 rounded-xl bg-gray-50 border border-gray-200 
                focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="expiry-date" className="text-gray-700 font-medium">
                                                    Masa Berlaku
                                                </Label>
                                                <Input
                                                    id="expiry-date"
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    className="w-full py-2 px-4 text-gray-800 rounded-xl bg-gray-50 border border-gray-200 
                focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="cvv" className="text-gray-700 font-medium">
                                                    CVV
                                                </Label>
                                                <Input
                                                    id="cvv"
                                                    type="text"
                                                    placeholder="123"
                                                    className="w-full py-2 px-4 text-gray-800 rounded-xl bg-gray-50 border border-gray-200 
                focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

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

                                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-white p-2 rounded-lg border border-green-100">
                                                    <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                                                        <Wallet className="w-5 h-5 text-green-600" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-700">Bank Central Asia</p>
                                                    <p className="text-sm text-gray-500">123-456-7890 (a.n. Toko Kita)</p>
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

                                        <div className="space-y-2">
                                            <Label htmlFor="transfer-proof" className="text-gray-700 font-medium">
                                                Unggah Bukti Transfer
                                            </Label>
                                            <div className="flex items-center justify-center w-full">
                                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-green-50 hover:border-green-200 transition-all">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                                                        <p className="text-sm text-gray-500">
                                                            <span className="font-semibold text-green-600">Klik untuk upload</span> atau drag & drop
                                                        </p>
                                                    </div>
                                                    <input id="transfer-proof" type="file" className="hidden" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

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

                                    {/* Change Calculation */}
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
                        </div>
                    </div>

                    <SheetFooter className="p-6 pt-0">
                        <Button
                            onClick={handleCheckout}
                            disabled={isSubmitting || processing}
                            className={`w-full cursor-pointer h-14 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold 
                            hover:from-purple-700 hover:to-indigo-700 rounded-xl transition-all shadow-lg hover:shadow-xl
                            flex items-center justify-center active:scale-[0.98]
                            ${(isSubmitting || processing) ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {(isSubmitting || processing) ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Memproses...</span>
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    <span>Bayar Sekarang</span>
                                </>
                            )}
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </div>

            <AlertDialog open={openModal}
                onOpenChange={(isOpen) => {
                    setOpenModal(isOpen);
                    setAmountPaid(0);
                    if (onSuccess) onSuccess();
                }}>
                <AlertDialogContent className="max-w-md rounded-3xl border-0 p-0 overflow-hidden shadow-xl">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center text-white relative">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm mb-4 animate-pulse">
                            <CheckCircle className="h-10 w-10 text-white" strokeWidth={2} />
                        </div>
                        <AlertDialogHeader className="space-y-1 mb-2">
                            <AlertDialogTitle className="text-2xl font-bold text-center">
                                Transaksi Berhasil!
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-white/90 text-center -mt-2">
                                Pembayaran telah berhasil diproses
                            </AlertDialogDescription>
                        </AlertDialogHeader>


                        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-6 py-2 shadow-lg">
                            <span className="font-bold text-purple-600 whitespace-nowrap">
                                {/* {Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(grandTotal)} */}
                                <span className="font-bold text-purple-600 whitespace-nowrap">
                                    {grandTotal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                </span>
                            </span>
                        </div>
                    </div>


                    <div className="p-6 pt-8">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border border-green-100 relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-green-200/20"></div>
                            <div className="absolute -left-2 -bottom-2 w-16 h-16 rounded-full bg-emerald-200/20"></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-green-800 font-medium">Uang Diterima</p>
                                        <p className="text-lg font-bold text-green-600">
                                            {Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR'
                                            }).format(amountPaid)}
                                        </p>
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-green-600 mx-2" />
                                    <div>
                                        <p className="text-sm text-red-500 font-medium">Kembalian</p>
                                        <p className="text-2xl font-bold text-red-500">
                                            {Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(
                                                (amountPaid - grandTotal) > 0 ? (amountPaid - grandTotal) : 0
                                            )}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Hash className="h-4 w-4" />
                                    <span>No. Transaksi</span>
                                </div>
                                <span className="font-medium text-gray-900">TRX-{Date.now().toString().slice(-6)}</span>
                            </div>

                            <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Calendar className="h-4 w-4" />
                                    <span>Tanggal</span>
                                </div>
                                <span className="font-medium text-gray-900">
                                    {new Date().toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>

                            <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <CreditCard className="h-4 w-4" />
                                    <span>Metode</span>
                                </div>
                                <span className="font-medium text-gray-900">Tunai</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <AlertDialogCancel className="w-full bg-white border-gray-200 hover:bg-gray-100 text-gray-700 h-12 rounded-xl transition-all hover:shadow-sm">
                                Tutup
                            </AlertDialogCancel>
                            <button
                                onClick={reactToPrintFn}
                                className="w-full h-12 cursor-pointer flex items-center justify-center rounded-xl bg-gradient-to-r text-white from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-sm gap-2 transition-all hover:shadow-md"
                            >
                                <Printer className="h-5 w-5" />
                                Cetak Struk
                            </button>
                        </div>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

            <div ref={contentRef} className="hidden print:block" >
                <Invoice
                    invoiceNumber={"INV-" + Date.now()}
                    customerInfo="Umum (Cash)"
                    invoiceDate={new Date().toLocaleDateString("id-ID")}
                    dueDate={new Date().toLocaleDateString("id-ID")}
                    items={cartItems.map(item => ({
                        name: item.name ,
                        price: item.price,
                        qty: item.quantity,
                    }))}
                    notes="Terima kasih telah berbelanja di toko kami."
                    subtotal={cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                    discount={0}
                    tax={0}
                    grandTotal={grandTotal}
                    paymentType="Cash"
                />
            </div>
        </div>
    )
}