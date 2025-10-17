import { message } from "antd";
import { Endpoints } from "../../api/endpoints";
import { invalidateQuery, useMutation } from "../../api/query";
import { BASE_URL } from "../../constant/data";
import type { RespondToInvitationData } from "../../types";
import useAuthenticatedFetch from "../useAuthenticatedFetch";

export const useRespondToInvitation = () => {
  const { authenticatedFetch } = useAuthenticatedFetch();

  async function respondToInvitation(data: RespondToInvitationData): Promise<RespondToInvitationData> {
    const endpoint = Endpoints.RESPOND_TO_INVITATION.replace(":id", data.invitationId);
    const response = await authenticatedFetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      body: JSON.stringify({ response: data.response }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Error responding to invitation");
    }

    return data;
  }

  return useMutation({
    mutationFn: respondToInvitation,
    onSuccess: (data) => {
      invalidateQuery([Endpoints.GET_USER_INVITATIONS]);
      invalidateQuery([Endpoints.GET_ALL_BOARD]);
      if (data.response === "ACCEPTED") {
        message.success("Invitation accepted!");
      } else {
        message.success("Invitation rejected!");
      }
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      message.error(errorMessage);
    },
  });
};
