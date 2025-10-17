import { Modal, Button, message, Select, Tag, List, Avatar } from "antd";
import { useState } from "react";
import { useGetBoardById } from "../../hooks/board/use-get-board-by-id";
import { useInviteUser } from "../../hooks/invitation/use-invite-user";
import { useGetAllUsers } from "../../hooks/use-get-all-users";
import { useGetBoardInvitations } from "../../hooks/invitation/use-get-board-invitations";

interface ModalInviteUsersProps {
  setOpenModal: (v: boolean) => void;
  openModal: boolean;
  id: string;
}

export default function ModalInviteUsers({ setOpenModal, openModal, id }: ModalInviteUsersProps) {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const { data: board, isLoading } = useGetBoardById(id);
  const { data: users, isLoading: isLoadingUsers } = useGetAllUsers();
  const { data: invitations } = useGetBoardInvitations(id);
  const { mutate: inviteUser, isPending } = useInviteUser();

  function handleInvite() {
    if (selectedUserIds.length === 0) {
      message.warning("Please select at least one user to invite");
      return;
    }
    selectedUserIds.forEach((userId) => {
      inviteUser({
        boardId: id,
        invitedUserId: userId,
      });
    });
    setSelectedUserIds([]);
  }

  const currentMemberIds = new Set(board?.members?.map((member) => member.user.id) || []);
  const pendingInvitationUserIds = new Set(
    invitations?.filter((inv) => inv.status === "PENDING").map((inv) => inv.userId) || [],
  );
  const availableUsers = users?.filter((user) => !currentMemberIds.has(user.id)) || [];

  return (
    <Modal
      onCancel={() => setOpenModal(false)}
      open={openModal}
      title="Manage board members"
      footer={[
        <Button key="cancel" onClick={() => setOpenModal(false)}>
          Cancel
        </Button>,
        <Button
          key="invite"
          type="primary"
          onClick={handleInvite}
          loading={isPending}
          disabled={selectedUserIds.length === 0}
        >
          Invite members
        </Button>,
      ]}
    >
      <section className="mb-4">
        <div>
          <h3 className="font-semibold mb-2">{board?.name}</h3>
          <p className="text-gray-600 mb-4">{board?.description || "No description"}</p>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Members ({board?.members?.length || 0}):</h4>
            <List
            loading={isLoadingUsers || isLoading}
              dataSource={board?.members || []}
              locale={{ emptyText: "No members yet" }}
              renderItem={(member) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar>
                        {member.user.name?.charAt(0).toUpperCase() || member.user.email.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    title={member.user.name || "Unknown"}
                    description={member.user.email}
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
          loading={isLoadingUsers}
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
