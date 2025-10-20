import type { User } from "./user";
export type BoardMemberRole = "OWNER" | "MEMBER";


export interface BoardMember {
  id: string;
  boardId: string;
  userId: string;
  role: string;
  joinedAt: string;
  user: User;
}
