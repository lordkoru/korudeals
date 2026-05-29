/**
 * Página de inicio (Landing) de KoruDeals.
 * Muestra el Hero, productos destacados y categorías populares.
 */
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { useGetProducts } from "@/api/ProductApi";
import { Link } from "react-router-dom";
import { Truck, ShieldCheck, RefreshCw, ArrowRight } from "lucide-react";

const HomePage = () => {
  const { data, isLoading } = useGetProducts({ limit: 4 });

  return (
    <>
      <Hero />

      {/* Beneficios */}
      <section className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
        <div className="card p-6 flex items-center gap-4">
          <div className="bg-koru-100 p-3 rounded-full">
            <Truck className="w-6 h-6 text-koru-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Envío Gratis</h3>
            <p className="text-sm text-gray-600">En compras mayores a $1,500</p>
          </div>
        </div>
        <div className="card p-6 flex items-center gap-4">
          <div className="bg-koru-100 p-3 rounded-full">
            <ShieldCheck className="w-6 h-6 text-koru-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Pago Seguro</h3>
            <p className="text-sm text-gray-600">Transacciones cifradas</p>
          </div>
        </div>
        <div className="card p-6 flex items-center gap-4">
          <div className="bg-koru-100 p-3 rounded-full">
            <RefreshCw className="w-6 h-6 text-koru-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">30 días</h3>
            <p className="text-sm text-gray-600">Para devoluciones</p>
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-koru-900">Productos Destacados</h2>
            <p className="text-gray-600 mt-1">Los favoritos de nuestros clientes</p>
          </div>
          <Link to="/catalog" className="hidden md:inline-flex items-center gap-1 text-koru-600 hover:text-koru-800 font-medium">
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-koru-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : data && data.data.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.data.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Pronto tendremos productos disponibles.</p>
            <Link to="/catalog" className="btn-primary inline-block mt-4">
              Explorar Catálogo
            </Link>
          </div>
        )}
      </section>

      {/* Categorías */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-display text-3xl font-bold text-koru-900 mb-8">Explora por Estilo</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: "casual", name: "Casual", emoji: "👟", desc: "Para el día a día" },
            { id: "deportivo", name: "Deportivo", emoji: "🏃", desc: "Para entrenar" },
            { id: "urbano", name: "Urbano", emoji: "🌆", desc: "Estilo street" },
            { id: "running", name: "Running", emoji: "💨", desc: "Para correr" }
          ].map((cat) => (
            <Link
              key={cat.id}
              to={`/catalog?category=${cat.id}`}
              className="card p-6 text-center hover:scale-105 transition-transform"
            >
              <div className="text-5xl mb-3">{cat.emoji}</div>
              <h3 className="font-semibold text-koru-800">{cat.name}</h3>
              <p className="text-xs text-gray-600">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
