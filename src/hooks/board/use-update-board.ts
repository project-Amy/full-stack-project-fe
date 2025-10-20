import { message } from "antd";
import { Endpoints, EndpointsKey } from "../../api/endpoints";
import { invalidateQuery, useMutation } from "../../api/query";
import { BASE_URL } from "../../constant/data";
import useAuthenticatedFetch from "../useAuthenticatedFetch";

interface UpdateBoardPayload {
  boardId: string;
  name: string;
  description?: string;
}

export const useUpdateBoard = () => {
  const { authenticatedFetch } = useAuthenticatedFetch();

  async function updateBoard({ boardId, name, description }: UpdateBoardPayload): Promise<void> {
    const endpoint = Endpoints.UPDATE_BOARD.replace(":id", boardId);
    const response = await authenticatedFetch(`${BASE_URL}/${endpoint}`, {
      method: "PATCH",
      body: JSON.stringify({ name, description }),
    });

    if (!response.ok) {
      throw new Error("Failed to update board");
    }
  }

  return useMutation({
    mutationFn: updateBoard,
    onSuccess: (_, variables) => {
      message.success("Board updated successfully");
      invalidateQuery([EndpointsKey.GET_BOARD_BY_ID, variables.boardId]);
      invalidateQuery([EndpointsKey.GET_ALL_BOARD]);
    },
    onError: () => {
      message.error("Failed to update board");
    },
  });
};
