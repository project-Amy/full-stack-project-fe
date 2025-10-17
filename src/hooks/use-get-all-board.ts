import { Endpoints } from "../api/endpoints";
import { useQuery, queryConfig } from "../api/query";
import { BASE_URL } from "../constant/data";
import type { Board } from "../types/board";
import useAuthenticatedFetch from "./useAuthenticatedFetch";

interface ResponseGetAllBoards {
  success: boolean;
  message: string;
  data: Board[];
}

export const useGetAllBoard = () => {
  const { authenticatedFetch } = useAuthenticatedFetch();

  async function getAllBoards(): Promise<ResponseGetAllBoards> {
    const response = await authenticatedFetch(`${BASE_URL}/${Endpoints.GET_ALL_BOARD}`);

    if (!response.ok) {
      throw new Error("Errore nel recupero delle board");
    }

    const data: ResponseGetAllBoards = await response.json();
    return data;
  }

  return useQuery({
    queryKey: [Endpoints.GET_ALL_BOARD],
    queryFn: getAllBoards,
    select: (data) => data.data,
    ...queryConfig.frequent,
    onError: (error) => {
      console.error("Errore durante il recupero delle board:", error);
    },
  });
};
