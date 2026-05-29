/**
 * Página de detalle de un producto.
 * Muestra imagen, descripción, selector de talla/color y botón "agregar al carrito".
 * También lista las reseñas del producto.
 */
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetProductById } from "@/api/ProductApi";
import { useGetProductReviews, useCreateReview } from "@/api/ReviewApi";
import { formatPrice, formatDate } from "@/lib/utils";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductById(id);
  const { data: reviews } = useGetProductReviews(id);
  const { isAuthenticated } = useAuth0();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const createReview = useCreateReview(id || "");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  if (isLoading || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-pulse">Cargando...</div>
      </div>
    );
  }

  /** Maneja el botón de agregar al carrito */
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Selecciona una talla y un color");
      return;
    }

    addToCart({
      productId: product._id,
      name: product.name,
      imageUrl: product.imageUrl,
      unitPrice: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor
    });

    toast.success("¡Agregado al carrito!");
  };

  /** Envía la reseña al backend */
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    createReview.mutate(
      { rating: reviewRating, comment: reviewComment },
      {
        onSuccess: () => {
          toast.success("Reseña publicada");
          setReviewComment("");
          setReviewRating(5);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Error al publicar reseña");
        }
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/catalog" className="inline-flex items-center gap-1 text-koru-600 hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" /> Volver al catálogo
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Imagen */}
        <div className="aspect-square bg-koru-100 rounded-2xl overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://placehold.co/600x600/d97338/fff?text=${encodeURIComponent(product.brand)}`;
            }}
          />
        </div>

        {/* Detalles */}
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-koru-600 uppercase tracking-wide">{product.brand}</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-koru-900 mt-1">
              {product.name}
            </h1>
            {product.reviewCount > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-5 h-5 ${
                        s <= product.averageRating
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.averageRating.toFixed(1)} · {product.reviewCount} reseñas
                </span>
              </div>
            )}
          </div>

          <p className="text-3xl font-bold text-koru-700">{formatPrice(product.price)}</p>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {/* Selector de talla */}
          <div>
            <label className="font-semibold text-gray-900 mb-2 block">Talla:</label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`min-w-[3rem] py-2 px-3 rounded-lg border-2 font-medium transition ${
                    selectedSize === s
                      ? "border-koru-600 bg-koru-100 text-koru-700"
                      : "border-koru-200 hover:border-koru-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Selector de color */}
          <div>
            <label className="font-semibold text-gray-900 mb-2 block">Color:</label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-4 py-2 rounded-lg border-2 transition ${
                    selectedColor === c
                      ? "border-koru-600 bg-koru-100 text-koru-700"
                      : "border-koru-200 hover:border-koru-400"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Cantidad */}
          <div>
            <label className="font-semibold text-gray-900 mb-2 block">Cantidad:</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border border-koru-200 hover:bg-koru-50"
              >
                −
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 rounded-lg border border-koru-200 hover:bg-koru-50"
              >
                +
              </button>
              <span className="text-sm text-gray-500">{product.stock} disponibles</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn-primary w-full md:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-5 h-5" />
            {product.stock === 0 ? "Agotado" : "Agregar al carrito"}
          </button>
        </div>
      </div>

      {/* Reseñas */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold text-koru-900 mb-6">Reseñas y calificaciones</h2>

        {/* Formulario para crear reseña */}
        {isAuthenticated ? (
          <form onSubmit={handleSubmitReview} className="card p-6 mb-8">
            <h3 className="font-semibold mb-3">Escribe tu reseña</h3>
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setReviewRating(s)}
                >
                  <Star
                    className={`w-7 h-7 ${
                      s <= reviewRating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Comparte tu experiencia con este producto..."
              required
              rows={3}
              className="input-field"
              maxLength={500}
            />
            <button
              type="submit"
              disabled={createReview.isPending}
              className="btn-primary mt-3"
            >
              {createReview.isPending ? "Publicando..." : "Publicar reseña"}
            </button>
          </form>
        ) : (
          <div className="card p-6 mb-8 text-center text-gray-600">
            <p>Inicia sesión para dejar una reseña</p>
          </div>
        )}

        {/* Lista de reseñas */}
        {reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r._id} className="card p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-koru-800">{r.userName}</p>
                    <p className="text-xs text-gray-500">{formatDate(r.createdAt)}</p>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= r.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{r.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-500">Sé el primero en dejar una reseña.</p>
        )}
      </section>
    </div>
  );
};

export default ProductDetailPage;
