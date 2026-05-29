import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-koru-100 via-koru-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="inline-block bg-koru-200 text-koru-800 text-sm font-semibold px-4 py-1 rounded-full">
            🎉 Nueva temporada disponible
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-koru-900 leading-tight">
            Encuentra tu par <span className="text-koru-600">ideal</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-md">
            Tenis casuales de las mejores marcas para acompañarte en cada paso del día.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/catalog" className="btn-primary inline-flex items-center gap-2">
              Ver Catálogo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/catalog?category=urbano" className="btn-secondary">
              Estilo Urbano
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-3xl shadow-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
              alt="Tenis casuales KoruDeals"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 animate-bounce">
            <p className="text-xs text-gray-500">Envío gratis</p>
            <p className="font-bold text-koru-700">+ $1,500</p>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4">
            <p className="text-xs text-gray-500">Hasta</p>
            <p className="font-bold text-koru-700">30% OFF</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;