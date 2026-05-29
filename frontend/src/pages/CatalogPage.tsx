/**
 * Página de catálogo de productos con filtros laterales y búsqueda.
 */
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { useGetProducts } from "@/api/ProductApi";
import { Search, SlidersHorizontal, X } from "lucide-react";

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const filters = {
    search: searchParams.get("search") || undefined,
    brand: searchParams.get("brand") || undefined,
    category: searchParams.get("category") || undefined,
    size: searchParams.get("size") || undefined,
    color: searchParams.get("color") || undefined,
    minPrice: searchParams.get("minPrice") || undefined,
    maxPrice: searchParams.get("maxPrice") || undefined,
    page: searchParams.get("page") || "1"
  };

  const { data, isLoading } = useGetProducts(filters);

  /** Actualiza un filtro en la URL. */
  const updateFilter = (key: string, value: string) => {
    if (value) searchParams.set(key, value);
    else searchParams.delete(key);
    searchParams.delete("page"); // resetear página al cambiar filtros
    setSearchParams(searchParams);
  };

  /** Limpia todos los filtros. */
  const clearFilters = () => setSearchParams({});

  const brands = ["Nike", "Adidas", "Puma", "Vans", "Converse", "New Balance"];
  const sizes = [24, 25, 26, 27, 28, 29];
  const colors = ["Negro", "Blanco", "Gris", "Rojo", "Azul"];
  const categories = ["casual", "deportivo", "urbano", "running", "skate"];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-koru-900">Catálogo</h1>
        <p className="text-gray-600">Encuentra los tenis perfectos para ti</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar tenis por nombre..."
            value={filters.search || ""}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn-secondary md:hidden flex items-center gap-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
        </button>
      </div>

      <div className="grid md:grid-cols-[260px_1fr] gap-8">
        {/* Filtros laterales */}
        <aside className={`${showFilters ? "block" : "hidden"} md:block space-y-6`}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-koru-800">Filtros</h3>
            <button onClick={clearFilters} className="text-sm text-koru-600 hover:underline">
              Limpiar
            </button>
          </div>

          {/* Categoría */}
          <div className="card p-4">
            <h4 className="font-medium mb-3 text-gray-900">Categoría</h4>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === cat}
                    onChange={() => updateFilter("category", cat)}
                    className="text-koru-600"
                  />
                  <span className="capitalize">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Marca */}
          <div className="card p-4">
            <h4 className="font-medium mb-3 text-gray-900">Marca</h4>
            <div className="space-y-2">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="brand"
                    checked={filters.brand === brand}
                    onChange={() => updateFilter("brand", brand)}
                    className="text-koru-600"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Talla */}
          <div className="card p-4">
            <h4 className="font-medium mb-3 text-gray-900">Talla</h4>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => updateFilter("size", String(size))}
                  className={`py-2 rounded-lg border text-sm transition ${
                    filters.size === String(size)
                      ? "bg-koru-600 text-white border-koru-600"
                      : "border-koru-200 text-gray-700 hover:border-koru-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="card p-4">
            <h4 className="font-medium mb-3 text-gray-900">Color</h4>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => updateFilter("color", color)}
                  className={`px-3 py-1 rounded-full border text-xs transition ${
                    filters.color === color
                      ? "bg-koru-600 text-white border-koru-600"
                      : "border-koru-200 hover:border-koru-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Precio */}
          <div className="card p-4">
            <h4 className="font-medium mb-3 text-gray-900">Precio</h4>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Mín"
                value={filters.minPrice || ""}
                onChange={(e) => updateFilter("minPrice", e.target.value)}
                className="input-field text-sm"
              />
              <input
                type="number"
                placeholder="Máx"
                value={filters.maxPrice || ""}
                onChange={(e) => updateFilter("maxPrice", e.target.value)}
                className="input-field text-sm"
              />
            </div>
          </div>
        </aside>

        {/* Resultados */}
        <div>
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square bg-koru-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : data && data.data.length > 0 ? (
            <>
              <p className="text-sm text-gray-600 mb-4">
                Mostrando <strong>{data.data.length}</strong> de <strong>{data.pagination.total}</strong> productos
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {data.data.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>

              {/* Paginación */}
              {data.pagination.pages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  {[...Array(data.pagination.pages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => updateFilter("page", String(i + 1))}
                      className={`w-10 h-10 rounded-lg font-medium ${
                        Number(filters.page) === i + 1
                          ? "bg-koru-600 text-white"
                          : "bg-white border border-koru-200 hover:bg-koru-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <X className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-lg font-medium text-gray-700">No se encontraron productos</p>
              <p className="text-sm text-gray-500">Intenta ajustar los filtros</p>
              <button onClick={clearFilters} className="btn-primary mt-4">
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
