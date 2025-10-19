import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BoardViewType } from "../types/board";

interface BoardViewState {
  boardViews: Record<string, BoardViewType>;
  setBoardView: (boardId: string, view: BoardViewType) => void;
}

export const useBoardViewStore = create<BoardViewState>()(
  persist(
    (set) => ({
      boardViews: {},
      setBoardView: (boardId, view) =>
        set((state) => ({
          boardViews: { ...state.boardViews, [boardId]: view },
        })),
    }),
    { name: "board-views" }
  )
);
