import { Endpoints, EndpointsKey } from "../../api/endpoints";
import { queryClient, useMutation } from "../../api/query";
import { BASE_URL } from "../../constant/data";
import type { UpdateTaskDTO } from "../../types/task";
import useAuthenticatedFetch from "../useAuthenticatedFetch";

interface UpdateTaskParams {
  taskId: string;
  data: UpdateTaskDTO;
}

export const useUpdateTask = () => {
  const { authenticatedFetch } = useAuthenticatedFetch();

  async function updateTask({ taskId, data }: UpdateTaskParams): Promise<void> {
    const endpoint = Endpoints.UPDATE_TASK.replace(":id", taskId);
    const response = await authenticatedFetch(`${BASE_URL}/${endpoint}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error updating task");
    }
  }

  return useMutation({
    mutationFn: updateTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [EndpointsKey.GET_BOARD_TASKS],
        refetchType: 'active'
      });
    },
    onError: (error) => {
      console.error("Error updating task:", error);
    },
  });
};
