import { Plus } from "lucide-react";
import { ProductProps } from "../types";

export default function ProductCard({ product, onAddToCart }: { product: ProductProps; onAddToCart: (product: ProductProps) => void }) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price);
    };

    return (
        <div
            key={product.id}
            className="group relative flex flex-row md:flex-col rounded-xl overflow-hidden bg-white border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-100"
        >
            {/* Product Image Container */}
            <div className="relative h-[100px] w-[130px] md:w-full md:h-80  flex-shrink-0 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                    src={`/storage/products/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
            </div>

            {/* Product Info */}
            <div className="p-3 md:p-4 flex flex-col justify-between flex-grow">
                <h3 className="font-semibold text-gray-800 mb-1 md:mb-2 line-clamp-2 text-sm md:text-base leading-tight">
                    {product.name}
                </h3>
                
                <div className="flex items-center justify-between mt-auto pt-2 md:pt-3 border-t border-gray-100">
                    <span className="font-bold text-gray-900 text-base md:text-lg">
                        {formatPrice(product.price)}
                    </span>
                    
                    <button
                        className="relative w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer bg-gradient-to-br from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
                        onClick={() => onAddToCart(product)}
                    >
                        <Plus size={16} className="md:size-5" />
                        {/* Ripple effect */}
                        <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                </div>
            </div>
            
            {/* Hover indicator */}
            <div className="absolute top-2 right-2 md:top-3 md:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            </div>
        </div>
    );
}