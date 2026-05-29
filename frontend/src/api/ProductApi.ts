/**
 * ═══════════════════════════════════════════════════════════════════
 *  API de Productos - KoruDeals Frontend
 * ═══════════════════════════════════════════════════════════════════
 *  Hooks de React Query para consumir los endpoints de productos
 *  desde el backend. Manejan caché, estados de carga y errores.
 * ═══════════════════════════════════════════════════════════════════
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Product, ProductsResponse } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

/**
 * Hook para obtener el catálogo de productos con filtros opcionales.
 *
 * @param filters - Filtros opcionales: brand, size, color, minPrice, maxPrice, category, search, page
 * @returns React Query result con los productos paginados
 */
export const useGetProducts = (filters?: Record<string, any>) => {
  // Filtrar valores undefined/null/"" antes de construir el query string
  const cleanFilters = Object.fromEntries(
    Object.entries(filters || {}).filter(
      ([_, v]) => v !== undefined && v !== null && v !== ""
    )
  );
  const queryString = new URLSearchParams(cleanFilters).toString();

  const fetchProducts = async (): Promise<ProductsResponse> => {
    const url = `${API_BASE_URL}/api/products${queryString ? "?" + queryString : ""}`;
    const { data } = await axios.get<ProductsResponse>(url);
    return data;
  };

  return useQuery({
    queryKey: ["products", cleanFilters],
    queryFn: fetchProducts
  });
};

/**
 * Hook para obtener un producto específico por su id.
 *
 * @param id - _id del producto en MongoDB
 * @returns React Query result con el producto
 */
export const useGetProductById = (id?: string) => {
  const fetchProduct = async (): Promise<Product> => {
    const { data } = await axios.get<Product>(`${API_BASE_URL}/api/products/${id}`);
    return data;
  };

  return useQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
    enabled: !!id
  });
};

/**
 * Hook para crear un producto. Solo administradores.
 *
 * @returns Mutación con .mutate(productData)
 */
export const useCreateProduct = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const createProduct = async (productData: Partial<Product>): Promise<Product> => {
    const accessToken = await getAccessTokenSilently();
    const { data } = await axios.post<Product>(
      `${API_BASE_URL}/api/products`,
      productData,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  };

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
};

/**
 * Hook para actualizar un producto. Solo administradores.
 */
export const useUpdateProduct = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateProduct = async (params: { id: string; data: Partial<Product> }) => {
    const accessToken = await getAccessTokenSilently();
    const { data } = await axios.put<Product>(
      `${API_BASE_URL}/api/products/${params.id}`,
      params.data,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  };

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
};

/**
 * Hook para eliminar (desactivar) un producto. Solo administradores.
 */
export const useDeleteProduct = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const deleteProduct = async (id: string) => {
    const accessToken = await getAccessTokenSilently();
    await axios.delete(`${API_BASE_URL}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
  };

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
};
