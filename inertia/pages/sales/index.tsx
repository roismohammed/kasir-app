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
} from "lucide-react";
import AppLayout from "~/layouts/app-layout";
import sajiku from '../../assets/image/makanan.jpeg'
import { Head } from "@inertiajs/react";
// Data untuk kategori menu
const menuCategories = [
    { name: "Breakfast", icon: <Coffee size={20} />, stock: 12, active: false },
    { name: "Lunch", icon: <Sandwich size={20} />, stock: 12, active: true },
    { name: "Dinner", icon: <Utensils size={20} />, stock: 12, active: false },
    { name: "Soup", icon: <Soup size={20} />, stock: 12, active: false },
    { name: "Desserts", icon: <Cake size={20} />, stock: 12, active: false },
    { name: "Side Dish", icon: <Carrot size={20} />, stock: 12, active: false },
    { name: "Appetizer", icon: <Beef size={20} />, stock: 12, active: false },
    { name: "Beverages", icon: <GlassWater size={20} />, stock: 12, active: false },
];

const menuItems = [
    {
        id: 1,
        name: "Pasta Bolognese",
        image: sajiku,
        price: 50.5,
        description: "Delicious beef lasagna with double chili Delicious beef",
    },
    {
        id: 2,
        name: "Spicy Fried Chicken",
        image: sajiku,
        price: 45.7,
        description: "Delicious beef lasagna with double chili Delicious beef",
    },
    {
        id: 3,
        name: "Grilled Steak",
        image: sajiku,
        price: 80.0,
        description: "Delicious beef lasagna with double chili Delicious beef",
    },
    {
        id: 4,
        name: "Fish And Chips",
        image: sajiku,
        price: 90.4,
        description: "Delicious beef lasagna with double chili Delicious beef",
    },
    {
        id: 5,
        name: "Beef Bourguignon",
        image: sajiku,
        price: 75.5,
        description: "Delicious beef lasagna with double chili Delicious beef",
    },
    {
        id: 6,
        name: "Spaghetti Carbonara",
        image: sajiku,
        price: 35.3,
        description: "Delicious beef lasagna with double chili Delicious beef",
    },
    {
        id: 7,
        name: "Ratatouille",
        image: sajiku,
        price: 26.7,
        description: "Delicious beef lasagna with double chili Delicious beef",
    },
    {
        id: 8,
        name: "Kimchi Jjigae",
        image: sajiku,
        price: 45.7,
        description: "Delicious beef lasagna with double chili Delicious beef",
    },
    {
        id: 9,
        name: "Tofu Scramble",
        image: sajiku,
        price: 85.6,
        description: "Delicious beef lasagna with double chili Delicious beef",
    },
];

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
    return (
        <AppLayout breadcrumbs={breadcrumbs}> 
        <Head title="Penjualan" />
            <div className="flex gap-4">
                <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {menuCategories.map((category) => (
                            <button
                                key={category.name}
                                className={`flex items-center w-full px-4 py-3 rounded-lg shadow-sm transition-colors text-left ${category.active
                                    ? "bg-purple-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                                    }`}
                            >
                                {/* Icon */}
                                <div className={`mr-3 ${category.active ? "bg-white text-purple-700" : "bg-purple-700 text-white"} rounded-md p-2`}>
                                    {category.icon}
                                </div>

                                {/* Text */}
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{category.name}</span>
                                    <span
                                        className={`text-xs ${category.active ? "text-purple-100" : "text-gray-500"
                                            }`}
                                    >
                                        {category.stock} Menu In Stock
                                    </span>
                                </div>
                            </button>

                        ))}
                    </div>

                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Lunch Menu
                    </h2>

                    {/* Menu Items Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        {menuItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col rounded-lg overflow-hidden shadow-md bg-white"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h- object-cover"
                                />
                                <div className="p-4 flex flex-col justify-between flex-grow">
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
                                            className="w-8 h-8 rounded-full bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-96 ">
                    <div className=" flex flex-col sticky top-4 border rounded-lg shadow-lg bg-white">
                        <div className="p-6 flex-1 flex flex-col overflow-hidden">
                            <h2 className="text-xl font-semibold mb-6 text-gray-800">Invoice</h2>

                            {/* Scrollable Invoice Items */}
                            <div className="flex-1 overflow-y-auto pr-2">
                                {/* Invoice Items */}
                                <div className="flex items-start space-x-3 mb-4 p-2 rounded-lg border border-purple-600/50">
                                    <img
                                        src={sajiku}
                                        alt="Spicy Fried Chicken"
                                        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                                    />
                                    <div className="flex-grow">
                                        <h3 className="font-medium text-gray-800">Spicy Fried Chicken</h3>
                                        <p className="text-xs text-gray-500">2x</p>
                                        <p className="text-xs text-gray-500">Dont Add Vegetables</p>
                                    </div>
                                    <span className="font-semibold text-gray-900">$45.7</span>
                                </div>

                                <div className="flex items-start space-x-3 mb-4 p-2 rounded-lg border border-purple-600/50">
                                    <img
                                        src={sajiku}
                                        alt="Spicy Fried Chicken"
                                        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                                    />
                                    <div className="flex-grow">
                                        <h3 className="font-medium text-gray-800">Spicy Fried Chicken</h3>
                                        <p className="text-xs text-gray-500">2x</p>
                                        <p className="text-xs text-gray-500">Dont Add Vegetables</p>
                                    </div>
                                    <span className="font-semibold text-gray-900">$45.7</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Summary */}
                        <div className="p-6 border-t ">
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

                            <button className="w-full h-12 bg-purple-600 text-white text-lg font-semibold hover:bg-purple-700 rounded-lg transition-colors ">
                                Place An Order
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}