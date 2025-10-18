import { Endpoints } from "../../api/endpoints";
import { useQuery, queryConfig } from "../../api/query";
import { BASE_URL } from "../../constant/data";
import type { Invitation } from "../../types";
import useAuthenticatedFetch from "../useAuthenticatedFetch";

interface GetUserInvitationsResponse {
  success: boolean;
  message: string;
  data: Invitation[];
}

export const useGetUserInvitations = () => {
  const { authenticatedFetch } = useAuthenticatedFetch();

  async function getUserInvitations(): Promise<GetUserInvitationsResponse> {
    const response = await authenticatedFetch(`${BASE_URL}/${Endpoints.GET_USER_INVITATIONS}`);
    if (!response.ok) {
      throw new Error("Errore nel recupero degli inviti");
    }
    const data: GetUserInvitationsResponse = await response.json();
    return data;
  }

  return useQuery({
    queryKey: [Endpoints.GET_USER_INVITATIONS],
    queryFn: getUserInvitations,
    select: (data) => data.data,
    ...queryConfig.daily,
    onError: (error) => {
      console.error("Errore durante il recupero degli inviti:", error);
    },
  });
};
