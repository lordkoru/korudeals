/**
 * Pie de página global de KoruDeals.
 */
import { ShoppingBag, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-koru-900 text-koru-100 mt-16">
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        {/* Logo y descripción */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-koru-300" />
            <span className="font-display font-bold text-xl">KoruDeals</span>
          </div>
          <p className="text-sm text-koru-200">
            Tu tienda en línea de tenis casuales con las mejores marcas y modelos.
          </p>
        </div>

        {/* Compañía */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Compañía</h4>
          <ul className="space-y-2 text-sm text-koru-200">
            <li><a href="#" className="hover:text-white transition-colors">Sobre nosotros</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Política de privacidad</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Términos y condiciones</a></li>
          </ul>
        </div>

        {/* Ayuda */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Atención al cliente</h4>
          <ul className="space-y-2 text-sm text-koru-200">
            <li><a href="#" className="hover:text-white transition-colors">Centro de ayuda</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Envíos y devoluciones</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Guía de tallas</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Métodos de pago</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Contáctanos</h4>
          <ul className="space-y-3 text-sm text-koru-200">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> contacto@korudeals.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +52 492 202 2405
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Zacatecas, México
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-koru-800 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-koru-300">
          © 2026 KoruDeals · Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
