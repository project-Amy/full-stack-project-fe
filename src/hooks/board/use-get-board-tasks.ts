import { Endpoints, EndpointsKey } from "../../api/endpoints";
import { useQuery, queryConfig } from "../../api/query";
import { BASE_URL } from "../../constant/data";
import type { BoardTasksResponse } from "../../types/board";
import useAuthenticatedFetch from "../useAuthenticatedFetch";

interface GetBoardTasksResponse {
  success: boolean;
  message: string;
  data: BoardTasksResponse;
}

export const useGetBoardTasks = (boardId: string) => {
  const { authenticatedFetch } = useAuthenticatedFetch();

  async function getBoardTasks(): Promise<GetBoardTasksResponse> {
    const endpoint = Endpoints.GET_BOARD_TASKS.replace(":boardId", boardId);
    const response = await authenticatedFetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error("Errore nel recupero dei task della board");
    }

    const data: GetBoardTasksResponse = await response.json();
    return data;
  }

  return useQuery({
    queryKey: [EndpointsKey.GET_BOARD_TASKS, boardId],
    queryFn: getBoardTasks,
    select: (data) => data.data,
    ...queryConfig.daily,
    enabled: !!boardId,
    onError: (error) => {
      console.error("Errore durante il recupero dei task della board:", error);
    },
  });
};
