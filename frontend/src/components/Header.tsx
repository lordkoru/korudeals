/**
 * Header principal de KoruDeals.
 * Incluye el logo, la barra de navegación y los botones de sesión.
 */
import { Link } from "react-router-dom";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import { ShoppingBag } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-koru-100 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-koru-500 to-koru-700 p-2 rounded-lg group-hover:scale-105 transition-transform">
            <ShoppingBag className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-bold text-2xl text-koru-700">
            Koru<span className="text-koru-500">Deals</span>
          </span>
        </Link>

        {/* Navegación de escritorio */}
        <div className="hidden md:block">
          <MainNav />
        </div>

        {/* Navegación móvil */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
