import { Modal, Button, Select, Tag, List, Avatar, Input } from "antd";
import { useState, useEffect } from "react";
import { useGetBoardById } from "../../hooks/board/use-get-board-by-id";
import { useInviteUser } from "../../hooks/invitation/use-invite-user";
import { useUpdateBoard } from "../../hooks/board/use-update-board";
import { useGetAllUsers } from "../../hooks/use-get-all-users";
import { useGetBoardInvitations } from "../../hooks/invitation/use-get-board-invitations";
import { useAuthStore } from "../../store/useAuthStore";

interface BoardSettingsModalProps {
  setOpenModal: (v: boolean) => void;
  openModal: boolean;
  id: string;
}

export default function BoardSettingsModal({ setOpenModal, openModal, id }: BoardSettingsModalProps) {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");

  const { userId } = useAuthStore();
  const { data: board, isLoading } = useGetBoardById(id);
  const { data: users, isLoading: isLoadingUsers } = useGetAllUsers();
  const { data: invitations } = useGetBoardInvitations(id);
  const { mutate: inviteUser, isPending: isInviting } = useInviteUser();
  const { mutate: updateBoard, isPending: isUpdating } = useUpdateBoard();

  const isOwner = board?.owner.id === userId;

  useEffect(() => {
    if (board) {
      setBoardName(board.name);
      setBoardDescription(board.description || "");
    }
  }, [board]);

  const currentMemberIds = new Set(board?.members?.map((member) => member.id) || []);
  const pendingInvitationUserIds = new Set(
    (invitations || []).filter((inv) => inv.status === "PENDING").map((inv) => inv.userId),
  );
  const availableUsers = users?.filter((user) => !currentMemberIds.has(user.id) && user.id !== board?.owner.id) || [];

  function handleSave() {
    if (isOwner) {
      updateBoard({
        boardId: id,
        name: boardName,
        description: boardDescription,
      });
    }
    if (selectedUserIds.length > 0) {
      selectedUserIds.forEach((userId) => {
        inviteUser({
          boardId: id,
          invitedUserId: userId,
        });
      });
      setSelectedUserIds([]);
    }
  }

  return (
    <Modal
      onCancel={() => setOpenModal(false)}
      open={openModal}
      title="Board Settings"
      footer={[
        <Button key="cancel" onClick={() => setOpenModal(false)}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave} loading={isInviting || isUpdating}>
          Save
        </Button>,
      ]}
    >
      <section className="mb-4">
        <div>
          <label className="block font-medium mb-2">Board Name:</label>
          {isOwner ? (
            <Input
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              placeholder="Enter board name"
              className="mb-4"
            />
          ) : (
            <h3 className="font-semibold mb-2">{board?.name}</h3>
          )}

          <label className="block font-medium mb-2">Description:</label>
          {isOwner ? (
            <Input.TextArea
              value={boardDescription}
              onChange={(e) => setBoardDescription(e.target.value)}
              placeholder="Enter board description"
              rows={3}
              className="mb-4"
            />
          ) : (
            <p className="text-gray-600 mb-4">{board?.description || "No description"}</p>
          )}

          <div className="mt-4">
            <h4 className="font-medium mb-2">Members ({board?.members?.length || 0}):</h4>
            <List
              loading={isLoadingUsers || isLoading}
              dataSource={board?.members || []}
              locale={{ emptyText: "No members yet" }}
              renderItem={(member) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar>{member.name?.charAt(0).toUpperCase()}</Avatar>}
                    title={member.name || "Unknown"}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </section>
      <section>
        <label className="block font-medium mb-2">Select users to invite:</label>
        <Select
          mode="multiple"
          placeholder="Search and select users"
          style={{ width: "100%" }}
          loading={isLoadingUsers || isInviting}
          value={selectedUserIds}
          onChange={setSelectedUserIds}
          options={availableUsers.map((user) => {
            const hasPendingInvitation = pendingInvitationUserIds.has(user.id);
            return {
              label: user.email,
              value: user.id,
              disabled: hasPendingInvitation,
            };
          })}
          optionRender={(option) => {
            const hasPendingInvitation = option.value ? pendingInvitationUserIds.has(option.value as string) : false;
            return (
              <div className="flex justify-between place-content-center">
                <span>{option.label}</span>
                {hasPendingInvitation && <Tag color="orange">Pending</Tag>}
              </div>
            );
          }}
          filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
        />
      </section>
    </Modal>
  );
}
