import { Plus } from "lucide-react";
import { ProductProps } from "../types";

export default function ProductCard({ product, onAddToCart }: { product: ProductProps; onAddToCart: (product: ProductProps) => void }) {
    const formatPrice = (price: number) =>
        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price);

    return (
        <div
            className="group relative flex-col rounded-xl overflow-hidden bg-white border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer active:scale-[0.98]"
            onClick={() => onAddToCart(product)}
        >
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50">
                <img
                    src={`/storage/products/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
            </div>
            <div className="p-3">
                <h3 className="font-medium text-gray-800 text-sm line-clamp-2 mb-1 leading-snug">
                    {product.name}
                </h3>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-600 text-sm">
                        {formatPrice(product.price)}
                    </span>
                    <button
                        onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                        className="w-7 h-7 rounded-full bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center transition-colors shadow-sm"
                    >
                        <Plus size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
