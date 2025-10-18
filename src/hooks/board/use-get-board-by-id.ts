import { Endpoints } from "../../api/endpoints";
import { useQuery, queryConfig } from "../../api/query";
import { BASE_URL } from "../../constant/data";
import type { BoardWithDetails } from "../../types";
import useAuthenticatedFetch from "../useAuthenticatedFetch";

interface GetBoardByIdResponse {
  success: boolean;
  message: string;
  data: BoardWithDetails;
}

export const useGetBoardById = (boardId: string) => {
  const { authenticatedFetch } = useAuthenticatedFetch();

  async function getBoardById(): Promise<GetBoardByIdResponse> {
    const endpoint = Endpoints.GET_BOARD_BY_ID.replace(":id", boardId);
    const response = await authenticatedFetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error("Errore nel recupero della board");
    }

    const data: GetBoardByIdResponse = await response.json();
    return data;
  }

  return useQuery({
    queryKey: [Endpoints.GET_BOARD_BY_ID, boardId],
    queryFn: getBoardById,
    select: (data) => data.data,
    ...queryConfig.daily,
    enabled: !!boardId,
    onError: (error) => {
      console.error("Errore durante il recupero della board:", error);
    },
  });
};
