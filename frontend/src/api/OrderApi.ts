/**
 * ═══════════════════════════════════════════════════════════════════
 *  API de Pedidos - KoruDeals Frontend
 * ═══════════════════════════════════════════════════════════════════
 *  Hooks para crear y consultar pedidos desde el frontend.
 * ═══════════════════════════════════════════════════════════════════
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

/**
 * Hook para crear un nuevo pedido a partir del carrito.
 */
export const useCreateOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const createOrder = async (orderData: any): Promise<Order> => {
    const accessToken = await getAccessTokenSilently();
    const { data } = await axios.post<Order>(
      `${API_BASE_URL}/api/orders`,
      orderData,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  };

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    }
  });
};

/**
 * Hook para obtener los pedidos del usuario autenticado.
 */
export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchOrders = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const { data } = await axios.get<Order[]>(
      `${API_BASE_URL}/api/orders/my-orders`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  };

  return useQuery({
    queryKey: ["my-orders"],
    queryFn: fetchOrders
  });
};

/**
 * Hook para que el administrador obtenga TODOS los pedidos del sistema.
 */
export const useGetAllOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchAllOrders = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const { data } = await axios.get<Order[]>(
      `${API_BASE_URL}/api/orders`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  };

  return useQuery({
    queryKey: ["all-orders"],
    queryFn: fetchAllOrders
  });
};

/**
 * Hook para que el administrador actualice el estado de un pedido.
 */
export const useUpdateOrderStatus = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateStatus = async (params: { id: string; status: string }) => {
    const accessToken = await getAccessTokenSilently();
    const { data } = await axios.put<Order>(
      `${API_BASE_URL}/api/orders/${params.id}/status`,
      { status: params.status },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  };

  return useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-orders"] });
    }
  });
};
