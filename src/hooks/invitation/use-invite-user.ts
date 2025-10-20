import { message } from "antd";
import { Endpoints, EndpointsKey } from "../../api/endpoints";
import { invalidateQuery, useMutation } from "../../api/query";
import { BASE_URL } from "../../constant/data";
import type { InviteUserData } from "../../types";
import useAuthenticatedFetch from "../useAuthenticatedFetch";


export const useInviteUser = () => {
  const { authenticatedFetch } = useAuthenticatedFetch();

  async function inviteUser(data: InviteUserData): Promise<void> {
    const response = await authenticatedFetch(`${BASE_URL}/${Endpoints.INVITE_USER}`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Errore nell'invito dell'utente");
    }
  }

  return useMutation({
    mutationFn: inviteUser,
    onSuccess: (_, variables) => {
      invalidateQuery([EndpointsKey.GET_BOARD_BY_ID, variables.boardId]);
      invalidateQuery([EndpointsKey.GET_BOARD_INVITATIONS]);
      message.success("User invited successfully!");
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      message.error(errorMessage);
    },
  });
};
