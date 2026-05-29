/**
 * ═══════════════════════════════════════════════════════════════════
 *  API de Reseñas - KoruDeals Frontend
 * ═══════════════════════════════════════════════════════════════════
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Review } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

/**
 * Hook que obtiene todas las reseñas de un producto.
 */
export const useGetProductReviews = (productId?: string) => {
  const fetchReviews = async (): Promise<Review[]> => {
    const { data } = await axios.get<Review[]>(
      `${API_BASE_URL}/api/reviews/product/${productId}`
    );
    return data;
  };

  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: fetchReviews,
    enabled: !!productId
  });
};

/**
 * Hook que permite al usuario crear una reseña sobre un producto.
 */
export const useCreateReview = (productId: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const createReview = async (data: { rating: number; comment: string }) => {
    const accessToken = await getAccessTokenSilently();
    await axios.post(
      `${API_BASE_URL}/api/reviews/product/${productId}`,
      data,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  };

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    }
  });
};
