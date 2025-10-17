import { Endpoints } from "../api/endpoints";
import { invalidateQuery, useMutation } from "../api/query";
import { BASE_URL } from "../constant/data";
import type { CreateBoardForm } from "../types/board";
import useAuthenticatedFetch from "./useAuthenticatedFetch";

export const useCreateBoard = () => {
  const { authenticatedFetch } = useAuthenticatedFetch();

  async function createBoard(data: CreateBoardForm): Promise<void> {
    const response = await authenticatedFetch(`${BASE_URL}/${Endpoints.CREATE_BOARD}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Errore nella creazione della board");
    }
  }

  return useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      invalidateQuery([Endpoints.GET_ALL_BOARD]);
    },
    onError: (error) => {
      console.error("Errore durante la creazione della board:", error);
    },
  });
};
