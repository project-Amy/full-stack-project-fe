import { Endpoints, EndpointsKey } from "../../api/endpoints";
import { useQuery, queryConfig } from "../../api/query";
import { BASE_URL } from "../../constant/data";
import type { Invitation } from "../../types/invitation";
import useAuthenticatedFetch from "../useAuthenticatedFetch";

interface GetBoardInvitationsResponse {
  success: boolean;
  message: string;
  data: Invitation[];
}

export const useGetBoardInvitations = (boardId: string) => {
  const { authenticatedFetch } = useAuthenticatedFetch();

  async function getBoardInvitations(): Promise<GetBoardInvitationsResponse> {
    const endpoint = Endpoints.GET_BOARD_INVITATIONS.replace(":boardId", boardId);
    const response = await authenticatedFetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error("Errore nel recupero degli inviti della board");
    }

    const data: GetBoardInvitationsResponse = await response.json();
    return data;
  }

  return useQuery({
    queryKey: [EndpointsKey.GET_BOARD_BY_ID, boardId],
    queryFn: getBoardInvitations,
    select: (data) => data.data,
    ...queryConfig.daily,
    enabled: !!boardId,
    onError: (error) => {
      console.error("Errore durante il recupero degli inviti della board:", error);
    },
  });
};
