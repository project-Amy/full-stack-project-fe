import type { Owner } from "./user";
import type { BoardMember } from "./member";
import type { Task, TaskStatus, TaskPriority } from "./task";

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
  tasks?: Task[];
  defaultView: BoardViewType;
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

export interface UserInfo {
  id: string;
  name: string;
}

export interface BoardDetailResponse {
  id: string;
  name: string;
  description: string | null;
  defaultView: BoardViewType;
  owner: UserInfo;
  members: UserInfo[];
}

export interface BoardTasksResponse {
  id: string;
  name: string;
  tasks: BoardTaskItem[];
}

export interface BoardTaskItem {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  position: number;
  boardId: string;
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
  dueDate: string | null;
  assignee?: {
    id: string;
    name: string;
  };
}
