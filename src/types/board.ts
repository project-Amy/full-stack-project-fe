import type { Owner } from "./user";
import type { BoardMember } from "./member";

export interface Board {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
}
export interface BoardWithDetails extends Board {
  owner: Owner;
  members?: BoardMember[];
}

export type BoardViewType = "LIST" | "TABLE" | "KANBAN";

export interface CreateBoardForm {
  name: string;
  description?: string;
  defaultView: BoardViewType;
}

export interface BoardInvitationInfo {
  id: string;
  name: string;
  description: string | null;
  owner: Owner;
}
