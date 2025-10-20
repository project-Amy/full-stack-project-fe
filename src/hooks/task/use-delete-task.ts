import { Endpoints, EndpointsKey } from "../../api/endpoints";
import { invalidateQuery, useMutation } from "../../api/query";
import { BASE_URL } from "../../constant/data";
import useAuthenticatedFetch from "../useAuthenticatedFetch";

interface DeleteTaskParams {
  taskId: string;
  boardId: string;
}

export const useDeleteTask = () => {
  const { authenticatedFetch } = useAuthenticatedFetch();

  async function deleteTask({ taskId }: DeleteTaskParams): Promise<void> {
    const endpoint = Endpoints.DELETE_TASK.replace(":id", taskId);
    const response = await authenticatedFetch(`${BASE_URL}/${endpoint}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting task");
    }
  }

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (_, variables) => {
      invalidateQuery([EndpointsKey.GET_BOARD_TASKS, variables.boardId]);
      invalidateQuery([EndpointsKey.GET_ALL_BOARD]);
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
    },
  });
};
