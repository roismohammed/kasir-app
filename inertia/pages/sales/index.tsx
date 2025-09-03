import {
    Utensils,
    GlassWater,
    Minus,
    Trash,
    PlusIcon,
    BoxIcon,
} from "lucide-react";
import AppLayout from "~/layouts/app-layout";
import sajiku from '../../assets/image/makanan.jpeg'
import { Head, router, usePage } from '@inertiajs/react';
import { CategoriesProps, ProductProps, SalesProps } from "~/types";
import { useEffect, useState } from "react";
import {
    Sheet,
    SheetTrigger,
} from "@/components/ui/sheet"

import ProductCard from "~/components/card-product";
import SheetTransaction from "~/components/sheet-transaction";
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
    const { products, categories } = usePage<{
        sales: SalesProps,
        products: ProductProps[],
        categories: CategoriesProps[]
    }>().props
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [cartItems, setCartItems] = useState<ProductProps[]>([])
    const [openSheet, setOpenSheet] = useState(false)
    const handleTransactionSuccess = () => {
        // Reset cart atau lakukan action lain
        setCartItems([]);
        // Refresh data jika perlu
        // window.location.reload();
    };

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
    const grandTotal = subTotal;
    console.log("GrandTotal:", grandTotal)

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Penjualan" />
            <div className="flex flex-col md:flex-row gap-4 ">
                {/* Main Content */}
                <div className="flex-1 overflow-y-auto">
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
                <div className="w-full md:hidden lg:block lg:w-96 hidden ">
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

                            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                                <SheetTrigger asChild>
                                    <button className="w-full cursor-pointer h-14 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold hover:from-purple-700 hover:to-indigo-700 rounded-xl transition-all  hover:shadow-xl active:scale-[0.98]">
                                        Bayar {formatPrice(grandTotal)}
                                    </button>
                                </SheetTrigger>

                                <SheetTransaction
                                    cartItems={cartItems}
                                    grandTotal={grandTotal}
                                    onSuccess={handleTransactionSuccess}
                                    setOpenSheet={setOpenSheet}
                                />
                            </Sheet>
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 md:block lg:hidden bg-white border-t shadow-lg p-4">
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

          
        </AppLayout>
    );
}