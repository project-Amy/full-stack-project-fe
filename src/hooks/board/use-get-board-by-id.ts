import { message } from "antd";
import { Endpoints, EndpointsKey } from "../../api/endpoints";
import { useQuery, queryConfig } from "../../api/query";
import { BASE_URL } from "../../constant/data";
import type { BoardDetailResponse } from "../../types/board";
import useAuthenticatedFetch from "../useAuthenticatedFetch";

interface GetBoardByIdResponse {
  success: boolean;
  message: string;
  data: BoardDetailResponse;
}

export const useGetBoardById = (boardId: string) => {
  const { authenticatedFetch } = useAuthenticatedFetch();

  async function getBoardById(): Promise<GetBoardByIdResponse> {
    const endpoint = Endpoints.GET_BOARD_BY_ID.replace(":id", boardId);
    const response = await authenticatedFetch(`${BASE_URL}/${endpoint}`);

    const data: GetBoardByIdResponse = await response.json();

    if (!response.ok) {
      if (data.message === "You don't have access to this board") {
        message.error("You don't have access to this board");
        window.location.href = "/";
        throw new Error(data.message);
      }
      throw new Error(data.message || "Errore nel recupero della board");
    }

    return data;
  }

  return useQuery({
    queryKey: [EndpointsKey.GET_BOARD_BY_ID, boardId],
    queryFn: getBoardById,
    select: (data) => data.data,
    ...queryConfig.daily,
    enabled: !!boardId,
  });
};
