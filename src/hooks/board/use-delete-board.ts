import { Endpoints, EndpointsKey } from "../../api/endpoints";
import { invalidateQuery, useMutation } from "../../api/query";
import { BASE_URL } from "../../constant/data";
import useAuthenticatedFetch from "../useAuthenticatedFetch";

interface DeleteBoardParams {
  boardId: string;
}

export const useDeleteBoard = () => {
  const { authenticatedFetch } = useAuthenticatedFetch();

  async function deleteBoard({ boardId }: DeleteBoardParams): Promise<void> {
    const endpoint = Endpoints.DELETE_BOARD.replace(":id", boardId);
    const response = await authenticatedFetch(`${BASE_URL}/${endpoint}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting board");
    }
  }

  return useMutation({
    mutationFn: deleteBoard,
    onSuccess: () => {
      invalidateQuery([EndpointsKey.GET_ALL_BOARD]);
    },
    onError: (error) => {
      console.error("Error deleting board:", error);
    },
  });
};
