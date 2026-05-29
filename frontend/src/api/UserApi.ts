/**
 * ═══════════════════════════════════════════════════════════════════
 *  API de Usuario - KoruDeals Frontend
 * ═══════════════════════════════════════════════════════════════════
 *  Hooks para crear, consultar y actualizar el perfil del usuario.
 * ═══════════════════════════════════════════════════════════════════
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

/**
 * Hook que crea el usuario en la base de datos en el primer login.
 */
export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUser = async (user: { auth0Id: string; email: string }) => {
    const accessToken = await getAccessTokenSilently();
    await axios.post(`${API_BASE_URL}/api/my/user`, user, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
  };

  return useMutation({ mutationFn: createMyUser });
};

/**
 * Hook para obtener los datos del perfil del usuario autenticado.
 */
export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchUser = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const { data } = await axios.get<User>(`${API_BASE_URL}/api/my/user`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return data;
  };

  return useQuery({ queryKey: ["my-user"], queryFn: fetchUser });
};

/**
 * Hook para actualizar el perfil del usuario.
 */
export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateMyUser = async (formData: Partial<User>) => {
    const accessToken = await getAccessTokenSilently();
    const { data } = await axios.put<User>(
      `${API_BASE_URL}/api/my/user`,
      formData,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return data;
  };

  return useMutation({
    mutationFn: updateMyUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-user"] });
    }
  });
};
