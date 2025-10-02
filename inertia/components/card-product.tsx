import { Plus } from "lucide-react";
import { ProductProps } from "../types";

export default function ProductCard({ product, onAddToCart }: { product: ProductProps; onAddToCart: (product: ProductProps) => void }) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price);
    };

    return (
        <div
            key={product.id}
            className="flex flex-row md:flex-col rounded-lg overflow-hidden shadow-none border border-gray-200 bg-white py-0 px-2 lg:px-0  lg:p-0"
        >
            <img
                src={`/storage/products/${product.image}`}
                alt={product.name}
                className="h-[100px] w-[130px] md:w-full md:h-45 object-cover flex-shrink-0 rounded-lg lg:rounded-tr-lg mt-3 md:mt-0 lg:mt-0"
            />
            <div className="p-3 md:p-4 flex flex-col justify-between flex-grow">
                <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
                    <button
                        className="w-8 h-8 rounded-full shadow-md cursor-pointer bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center transition-colors"
                        onClick={() => onAddToCart(product)}
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
