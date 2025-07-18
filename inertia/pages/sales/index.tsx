import {
    Utensils,
    BookOpen,
    Plus,
    Sandwich,
    Soup,
    Coffee,
    GlassWater,
    Beef,
    Carrot,
    CreditCard,
    Wallet,
    Cake,
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
        categories: CategoriesProps
    }>().props
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [cartItems, setCartItems] = useState<ProductProps[]>([])
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
            setCartItems(cartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
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
                                    router.visit(`/sales?category_id=${categories.id}`,{
                                        preserveState: true,
                                        preserveScroll: true,
                                    })
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
                                                    ${item.price}
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
                    <div className="flex flex-col sticky top-4 border rounded-lg shadow-lg bg-white">
                        <div className="p-6 flex-1 flex flex-col overflow-hidden">
                            <h2 className="text-xl font-semibold mb-6 text-gray-800">Invoice</h2>
                            <div className="flex-1 pr-2 max-h-[280px] overflow-y-scroll">
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
                                                ${(product.price * (product.quantity || 1)).toFixed(2)}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="h-full flex items-center justify-center">
                                        <div className="text-gray-400 text-sm text-center">Belum ada item di keranjang</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment Summary */}
                        <div className="p-6 border-t">
                            <h3 className="font-semibold text-lg mb-4 text-gray-800">Payment Summary</h3>
                            <div className="space-y-2 text-sm text-gray-700">
                                <div className="flex justify-between">
                                    <span>Sub Total</span>
                                    <span>$131.2</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>$5.2</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg text-gray-900 mt-4">
                                    <span>Total Payment</span>
                                    <span>$136.4</span>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="grid grid-cols-3 gap-2 mt-6 mb-4">
                                <button className="h-14 flex flex-col items-center justify-center text-blue-600 border-blue-600 bg-blue-50 border rounded-lg hover:bg-blue-100 transition-colors">
                                    <CreditCard size={20} />
                                    <span className="text-xs mt-1">Credit Card</span>
                                </button>
                                <button className="h-14 flex flex-col items-center justify-center text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <Wallet size={20} />
                                    <span className="text-xs mt-1">Cashier</span>
                                </button>
                                <button className="h-14 flex flex-col items-center justify-center text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <BookOpen size={20} />
                                    <span className="text-xs mt-1">Cash Pay Out</span>
                                </button>
                            </div>

                            <button className="w-full h-12 bg-purple-600 text-white text-lg font-semibold hover:bg-purple-700 rounded-lg transition-colors">
                                Place An Order
                            </button>
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
        </AppLayout>
    );
}
