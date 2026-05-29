/**
 * Tarjeta de producto que se muestra en el catálogo.
 */
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="card overflow-hidden group block"
    >
      {/* Imagen */}
      <div className="aspect-square bg-koru-100 overflow-hidden relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://placehold.co/400x400/d97338/fff?text=${encodeURIComponent(product.brand)}`;
          }}
        />
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            ¡Últimos {product.stock}!
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 right-3 bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded-full">
            Agotado
          </span>
        )}
      </div>

      {/* Información */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-koru-600 font-semibold uppercase tracking-wide">
          {product.brand}
        </p>
        <h3 className="font-semibold text-gray-900 line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        {product.reviewCount > 0 && (
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-medium">{product.averageRating.toFixed(1)}</span>
            <span className="text-gray-500">({product.reviewCount})</span>
          </div>
        )}

        {/* Tallas y colores */}
        <div className="flex flex-wrap gap-1 text-xs text-gray-600">
          <span>Tallas: {product.sizes.slice(0, 4).join(", ")}{product.sizes.length > 4 ? "..." : ""}</span>
        </div>

        {/* Precio */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-koru-700">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
