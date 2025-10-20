import { Endpoints, EndpointsKey } from "../../api/endpoints";
import { invalidateQuery, useMutation } from "../../api/query";
import { BASE_URL } from "../../constant/data";
import type { CreateTaskDTO } from "../../types/task";
import useAuthenticatedFetch from "../useAuthenticatedFetch";

export const useCreateTask = () => {
  const { authenticatedFetch } = useAuthenticatedFetch();

  async function createTask(data: CreateTaskDTO): Promise<void> {
    const response = await authenticatedFetch(`${BASE_URL}/${Endpoints.CREATE_TASK}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error creating task");
    }
  }

  return useMutation({
    mutationFn: createTask,
    onSuccess: (_, variables) => {
      invalidateQuery([EndpointsKey.GET_BOARD_BY_ID, variables.boardId]);
      invalidateQuery([EndpointsKey.GET_ALL_BOARD]);
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });
};
