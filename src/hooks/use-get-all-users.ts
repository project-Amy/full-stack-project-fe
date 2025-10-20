import { Endpoints, EndpointsKey } from "../api/endpoints";
import { useQuery, queryConfig } from "../api/query";
import { BASE_URL } from "../constant/data";
import type { User } from "../types";
import useAuthenticatedFetch from "./useAuthenticatedFetch";

interface ResponseGetAllUsers {
  success: boolean;
  message: string;
  data: User[];
}

export const useGetAllUsers = () => {
  const { authenticatedFetch } = useAuthenticatedFetch();

  async function getAllUsers(): Promise<ResponseGetAllUsers> {
    const response = await authenticatedFetch(`${BASE_URL}/${Endpoints.GET_ALL_USERS}`);
    if (!response.ok) {
      throw new Error("Errore nel recupero degli utenti");
    }
    const data: ResponseGetAllUsers = await response.json();
    return data;
  }

  return useQuery({
    queryKey: [EndpointsKey.GET_ALL_USERS],
    queryFn: getAllUsers,
    select: (data) => data.data,
    ...queryConfig.daily,
    onError: (error) => {
      console.error("Errore durante il recupero degli utenti:", error);
    },
  });
};
