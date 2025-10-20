import type { BoardInvitationInfo } from "./board";
import type { User } from "./user";

export type InvitationStatus = "PENDING" | "ACCEPTED" | "REJECTED";
export interface Invitation {
  id: string;
  boardId: string;
  userId: string;
  status: InvitationStatus;
  invitedAt: string;
  respondedAt: string | null;
  board: BoardInvitationInfo;
  user?: User;
}
export interface InviteUserData {
  boardId: string;
  invitedUserId: string;
}

export interface RespondToInvitationData {
  invitationId: string;
  response: "ACCEPTED" | "REJECTED";
}

export interface ResponeInvitationUser {
  id: string;
  board: {
    id: string;
    name: string;
    ownerName: string;
  };
  status: InvitationStatus;
  userId: string;
}
